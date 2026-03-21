#!/bin/bash
# PreToolUse hook for Bash commands.
# Uses structured JSON output for blocks (exit 0 + JSON stdout).
# Falls through with plain exit 0 for allowed commands.
#
# Three tiers:
#   HARD BLOCK  — always blocked, no override (permissionDecision: deny)
#   SOFT BLOCK  — blocked with explanation, user can re-request (permissionDecision: deny)
#   LOG WARNING — allowed but logged to incident log (exit 0, no JSON)

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
LOG_DIR="$CLAUDE_PROJECT_DIR/.claude/logs"
INCIDENT_LOG="$LOG_DIR/incident-log.md"

mkdir -p "$LOG_DIR"

log_incident() {
  local SEVERITY="$1"
  local MSG="$2"
  echo "- \`$TIMESTAMP\` | GUARD | $SEVERITY | $MSG" >> "$INCIDENT_LOG"
}

deny() {
  local REASON="$1"
  local CONTEXT="$2"
  jq -n \
    --arg reason "$REASON" \
    --arg context "$CONTEXT" \
    '{
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: $reason,
        additionalContext: $context
      }
    }'
  exit 0
}

# ═══════════════════════════════════════════════════════
# HARD BLOCK — never allowed, no exceptions
# ═══════════════════════════════════════════════════════

# rm -rf / or rm -rf ~ (catastrophic)
if echo "$COMMAND" | grep -qE 'rm\s+(-[a-zA-Z]*f[a-zA-Z]*\s+)?(/|~|\$HOME)\s*$'; then
  log_incident "CRITICAL" "BLOCKED: catastrophic rm → $COMMAND"
  deny "KESİN ENGEL: Bu komut tüm dosya sisteminizi veya ev dizininizi siler." "Komut engellendi: felaket düzeyinde rm tespit edildi. Bu komut hiçbir koşulda izin verilmez."
fi

# git push --force (any branch)
if echo "$COMMAND" | grep -qE 'git\s+push\s+.*--force|git\s+push\s+-f'; then
  log_incident "CRITICAL" "BLOCKED: force push → $COMMAND"
  deny "KESİN ENGEL: Force push paylaşılan geçmişi yeniden yazar." "Komut engellendi: force push tespit edildi. Kasıtlıysa kullanıcıdan belirli dalı onaylamasını iste."
fi

# git reset --hard (destroys uncommitted work)
if echo "$COMMAND" | grep -qE 'git\s+reset\s+--hard'; then
  log_incident "HIGH" "BLOCKED: git reset --hard → $COMMAND"
  deny "KESİN ENGEL: git reset --hard commit edilmemiş değişiklikleri yok eder." "Komut engellendi: git reset --hard. Önce git stash veya git commit kullanmayı öner."
fi

# git clean -f (deletes untracked files permanently)
if echo "$COMMAND" | grep -qE 'git\s+clean\s+(-[a-zA-Z]*f|-f)'; then
  log_incident "HIGH" "BLOCKED: git clean -f → $COMMAND"
  deny "KESİN ENGEL: git clean -f izlenmeyen dosyaları kalıcı olarak siler." "Komut engellendi: git clean -f. Bunun yerine git stash kullanmayı öner."
fi

# chmod 777 (security risk)
if echo "$COMMAND" | grep -qE 'chmod\s+777'; then
  log_incident "HIGH" "BLOCKED: chmod 777 → $COMMAND"
  deny "KESİN ENGEL: chmod 777 tüm kullanıcılara tam erişim verir." "Komut engellendi: chmod 777. 755 veya 644 gibi daha kısıtlayıcı izinler kullan."
fi

# ═══════════════════════════════════════════════════════
# SECRET EXPOSURE — block commands that leak credentials
# ═══════════════════════════════════════════════════════

# Block cat/head/tail/less of .env files (prevents full credential dump)
if echo "$COMMAND" | grep -qE '(cat|head|tail|less|more|bat)\s+.*(\.(env|env\.local|env\.production))'; then
  log_incident "HIGH" "BLOCKED: credential file read → $COMMAND"
  deny "KESİN ENGEL: Kimlik bilgisi dosyalarını (.env) kabuk üzerinden okumak gizli bilgileri çıktıda açığa çıkarır." "Dosyayı okumak yerine ortam değişkeni adlarını kullan (ör. \$DATABASE_URL). Bir değerin var olduğunu doğrulamak istiyorsan şunu kullan: grep -c 'ANAHTAR_ADI' dosya"
fi

# Block echo/printf of environment variables containing common secret prefixes
if echo "$COMMAND" | grep -qE '(echo|printf)\s+.*\$(STRIPE_|OPENAI_|ANTHROPIC_|AWS_|DATABASE_|AUTH_SECRET|NEXTAUTH_SECRET|API_KEY|SECRET_KEY|PRIVATE_KEY)'; then
  log_incident "HIGH" "BLOCKED: secret echo → $COMMAND"
  deny "KESİN ENGEL: Gizli ortam değişkenlerini echo ile yazdırmak kimlik bilgilerini açığa çıkarır." "Gizli bilgilere yalnızca değişken adıyla referans ver. Değerlerini asla echo ile yazdırma."
fi

# Block piping credential files to network commands (curl, wget, nc, etc.)
if echo "$COMMAND" | grep -qE '\.env.*\|\s*(curl|wget|nc|ncat)'; then
  log_incident "CRITICAL" "BLOCKED: credential file piped to network → $COMMAND"
  deny "KESİN ENGEL: Kimlik bilgisi dosyalarını ağ komutlarına yönlendirmek gizli bilgileri dışarı sızdırır." ".env dosyalarını asla ağ komutlarına yönlendirme."
fi

# Block git add of credential files
if echo "$COMMAND" | grep -qE 'git\s+add\s+.*(\.(env|env\.local|env\.production))'; then
  log_incident "CRITICAL" "BLOCKED: git add of credential file → $COMMAND"
  deny "KESİN ENGEL: Kimlik bilgisi dosyalarını (.env) git commit için hazırlamak gizli bilgileri herkese açar." "Bu dosyalar .gitignore içinde kalmalıdır. Kimlik bilgilerini asla git'e commit etme."
fi

# ═══════════════════════════════════════════════════════
# SOFT BLOCK — blocked, but user can re-request
# ═══════════════════════════════════════════════════════

# rm with -r or -f flags (recursive/force delete)
if echo "$COMMAND" | grep -qE 'rm\s+(-[a-zA-Z]*[rf][a-zA-Z]*\s+)'; then
  # Allow rm on .claude/backups (rotation) and .claude/logs temp files
  if echo "$COMMAND" | grep -qE '\.claude/(backups|logs/\.(quality-gate-active|session-blocks|tool-call-count|compaction-occurred))'; then
    exit 0
  fi
  log_incident "MEDIUM" "SOFT BLOCKED: recursive/force rm → $COMMAND"
  deny "ESNEK ENGEL: -r veya -f bayraklı rm dosyaları kalıcı olarak siler." "Komut engellendi: özyinelemeli/zorla silme. Kasıtlıysa kullanıcıdan belirli dosya yollarını listeleyerek onaylamasını iste."
fi

# Overwriting system/config files
if echo "$COMMAND" | grep -qE '>\s*(~\/\.|\/etc\/|\.env|\.ssh|\.claude\/settings)'; then
  log_incident "HIGH" "SOFT BLOCKED: config/system file overwrite → $COMMAND"
  deny "ESNEK ENGEL: Hassas yapılandırma/sistem dosyasına yazma." "Komut engellendi: sistem dosyası üzerine yazma tespit edildi. Bunun kasıtlı olduğunu kullanıcıyla doğrula."
fi

# curl piped to shell (arbitrary code execution)
if echo "$COMMAND" | grep -qE 'curl\s.*\|\s*(bash|sh|zsh)'; then
  log_incident "HIGH" "SOFT BLOCKED: curl pipe to shell → $COMMAND"
  deny "ESNEK ENGEL: curl çıktısını kabuğa yönlendirmek rastgele uzak kod çalıştırır." "Komut engellendi: curl kabuğa yönlendirme. Önce dosyayı indir, incele, sonra çalıştır."
fi

# ═══════════════════════════════════════════════════════
# LOG WARNING — allowed but recorded
# ═══════════════════════════════════════════════════════

# Any rm command (non-recursive, non-force)
if echo "$COMMAND" | grep -qE '\brm\b'; then
  log_incident "LOW" "WARNING: rm command allowed → $COMMAND"
fi

# Any mv command (could lose data if target exists)
if echo "$COMMAND" | grep -qE '\bmv\b'; then
  log_incident "LOW" "WARNING: mv command allowed → $COMMAND"
fi

# Any git checkout that discards changes
if echo "$COMMAND" | grep -qE 'git\s+checkout\s+\.'; then
  log_incident "MEDIUM" "WARNING: git checkout . discards changes → $COMMAND"
fi

# Writing to files outside project directory
if echo "$COMMAND" | grep -qE '>\s*/' | grep -qvE ">\s*$CLAUDE_PROJECT_DIR"; then
  log_incident "MEDIUM" "WARNING: write outside project dir → $COMMAND"
fi

exit 0
