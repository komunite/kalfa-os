#!/bin/bash
# PreToolUse completeness gate for Write|Edit tools.
# Uses structured JSON output: exit 0 + JSON stdout for both allow and deny.
#
# Validates content completeness for critical system files before allowing writes.
# Each file path gets path-specific validation rules. Non-critical files pass through.
#
# Philosophy: Only gate files where an incomplete write causes persistent damage.
# Daily notes, scratchpad, logs, templates = ungated (iterative by nature).
# Knowledge-base, settings, memory = gated (errors persist/cascade).

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
LOG_DIR="$CLAUDE_PROJECT_DIR/.claude/logs"
INCIDENT_LOG="$LOG_DIR/incident-log.md"

mkdir -p "$LOG_DIR"

# Skip if no file path
[ -z "$FILE_PATH" ] && exit 0

# Get content based on tool type
if [ "$TOOL" = "Write" ]; then
  CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // empty')
elif [ "$TOOL" = "Edit" ] || [ "$TOOL" = "MultiEdit" ]; then
  CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // empty')
else
  exit 0
fi

# Skip if no content to validate
[ -z "$CONTENT" ] && exit 0

# Get relative path for matching
RELATIVE_PATH="${FILE_PATH#$CLAUDE_PROJECT_DIR/}"

log_incident() {
  local SEVERITY="$1"
  local MSG="$2"
  echo "- \`$TIMESTAMP\` | COMPLETENESS | $SEVERITY | $MSG" >> "$INCIDENT_LOG"
}

block() {
  local FILE="$1"
  local MSG="$2"
  local SUGGESTION="${3:-İçeriği düzelt, sonra yazmayı tekrar dene.}"
  log_incident "MEDIUM" "BLOCKED: $MSG → $FILE"
  jq -n \
    --arg reason "$MSG" \
    --arg file "$FILE" \
    --arg suggestion "$SUGGESTION" \
    '{
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: ("TAMLIK KAPISI: " + $reason + " | Dosya: " + $file),
        additionalContext: ("Yazma işlemi tamlık kapısı tarafından engellendi. Sorun: " + $reason + ". Öneri: " + $suggestion)
      }
    }'
  exit 0
}

block_high() {
  local FILE="$1"
  local MSG="$2"
  local SUGGESTION="${3:-İçeriği düzelt, sonra yazmayı tekrar dene.}"
  log_incident "HIGH" "BLOCKED: $MSG → $FILE"
  jq -n \
    --arg reason "$MSG" \
    --arg file "$FILE" \
    --arg suggestion "$SUGGESTION" \
    '{
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: ("TAMLIK KAPISI [YÜKSEK]: " + $reason + " | Dosya: " + $file),
        additionalContext: ("Yazma işlemi tamlık kapısı tarafından engellendi (YÜKSEK önem). Sorun: " + $reason + ". Öneri: " + $suggestion)
      }
    }'
  exit 0
}

# ═══════════════════════════════════════════════════════
# SECRET EXPOSURE CHECK (runs on ALL files)
# Blocks writes containing API keys/tokens/secrets to
# non-.env files. Catches accidental credential leaks.
# ═══════════════════════════════════════════════════════

# Allow .env files and backups to contain secrets (that's where they belong)
IS_ENV_FILE=false
case "$RELATIVE_PATH" in
  *.env*|.claude/backups/*) IS_ENV_FILE=true ;;
esac

if [ "$IS_ENV_FILE" = "false" ]; then
  # Check for common secret patterns in content being written
  if echo "$CONTENT" | grep -qE '(sk[-_](live|test|ant|proj)[_-][A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{36}|ghs_[A-Za-z0-9]{36}|eyJhbGci[A-Za-z0-9+/=]{50,}|AKIA[0-9A-Z]{16}|xox[bpsar]-[A-Za-z0-9-]{20,})'; then
    block_high "$RELATIVE_PATH" "GÜVENLİK: İçerik bir API anahtarı, token veya gizli bilgi içeriyor gibi görünüyor. Kimlik bilgileri .env dışındaki dosyalara ASLA yazılmamalıdır." "Kimlik bilgisini içerikten kaldır. Gizli bilgiyi değeri yerine değişken adıyla referans ver (ör. STRIPE_SECRET_KEY). Gizli bilgiler yalnızca .env dosyalarında bulunmalıdır."
  fi
fi

# ═══════════════════════════════════════════════════════
# INCOMPLETE MARKER CHECK
# Shared logic for TBD/TODO/FIXME/PLACEHOLDER detection
# ═══════════════════════════════════════════════════════
check_incomplete_markers() {
  local content="$1"
  local file="$2"

  # TBD, TODO, FIXME, PLACEHOLDER markers
  if echo "$content" | grep -qiE '\bTBD\b|\bTODO\b|\bFIXME\b|\[PLACEHOLDER\]|\[INSERT '; then
    block "$file" "TBD/TODO/FIXME/PLACEHOLDER işaretçileri içeriyor. İçerik araştırma-tamamlanmış olmalıdır." "Tüm yer tutucu işaretçileri gerçek değerlerle değiştir. İçeriğinde TBD, TODO, FIXME, [PLACEHOLDER] ve [INSERT ifadelerini ara."
  fi

  # Deferred decisions / open questions
  if echo "$content" | grep -qiE 'assess whether|decide later|need to determine|open question|to be decided|deferred decision'; then
    block "$file" "Ertelenmiş kararlar veya açık sorular içeriyor. Yazmadan önce tüm kararları çözümle." "'assess whether', 'decide later', 'need to determine', 'open question' gibi ifadeleri kaldır. Bunun yerine kesin ifadeler kullan."
  fi
}

# ═══════════════════════════════════════════════════════
# PATH-SPECIFIC GATES
# ═══════════════════════════════════════════════════════

case "$RELATIVE_PATH" in

  # ─── KNOWLEDGE BASE ─────────────────────────────────
  # Institutional memory. Errors here persist forever.
  # Rules: provenance required, max 200 lines, no TBD.
  ".claude/knowledge-base.md")
    check_incomplete_markers "$CONTENT" "$RELATIVE_PATH"

    if [ "$TOOL" = "Write" ]; then
      # Every bold entry line (- **...**) must have a [Source: ...] tag
      ENTRY_COUNT=$(echo "$CONTENT" | grep -cE '^\s*-\s+\*\*' || true)
      SOURCE_COUNT=$(echo "$CONTENT" | grep -cE '\[Source:' || true)

      if [ "$ENTRY_COUNT" -gt 0 ] && [ "$SOURCE_COUNT" -lt "$ENTRY_COUNT" ]; then
        MISSING=$((ENTRY_COUNT - SOURCE_COUNT))
        block_high "$RELATIVE_PATH" "Bilgi tabanında $MISSING girişin [Source: ...] kaynak bilgisi eksik. Her giriş kaynağını BELİRTMEK ZORUNDADIR." "Her giriş satırına (- **...**:) [Source: user override MMDDYY] veya [Source: empirical — açıklama] veya [Source: agent inference — açıklama] ekle."
      fi

      # Max 200 lines
      LINE_COUNT=$(echo "$CONTENT" | wc -l | tr -d ' ')
      if [ "$LINE_COUNT" -gt 200 ]; then
        block_high "$RELATIVE_PATH" "Bilgi tabanı $LINE_COUNT satır (maks 200). Düzenle: yeni eklemeden önce eski girişleri kaldır." "Mevcut bilgi tabanını oku, 90 günden eski veya yeni girişlerle geçersiz kılınmış olanları tespit et, kaldır, sonra tekrar dene."
      fi
    fi
    ;;

  # ─── MEMORY ─────────────────────────────────────────
  # Active context. Must stay compact.
  # Rules: max 100 lines (Write only).
  ".claude/memory.md")
    if [ "$TOOL" = "Write" ]; then
      LINE_COUNT=$(echo "$CONTENT" | wc -l | tr -d ' ')
      if [ "$LINE_COUNT" -gt 100 ]; then
        block "$RELATIVE_PATH" "memory.md $LINE_COUNT satır (maks 100). Yazmadan önce eski öğeleri temizle." "Şimdi bölümünden tamamlanan öğeleri, Açık Konular'dan çözülmüş öğeleri ve Son Kararlar'dan güncelliğini yitirmiş girişleri kaldır."
      fi
    fi
    ;;

  # ─── SETTINGS.JSON ─────────────────────────────────
  # Hook configuration. Broken JSON = all hooks break.
  # Rules: must be valid JSON.
  ".claude/settings.json")
    if [ "$TOOL" = "Write" ]; then
      if ! echo "$CONTENT" | jq empty 2>/dev/null; then
        block_high "$RELATIVE_PATH" "settings.json geçersiz JSON olacak. Sözdizimi hatası TÜM hook'ları bozar." "JSON sözdizimini doğrula: sondaki virgülleri, eksik tırnakları, eşleşmeyen parantezleri kontrol et. Hedefli değişiklikler için Write yerine Edit kullan."
      fi
    fi
    ;;

  # ─── AGENT DEFINITIONS ──────────────────────────────
  # Agent instructions. Must be definitive, not speculative.
  # Rules: no TBD/TODO.
  .claude/agents/*.md)
    check_incomplete_markers "$CONTENT" "$RELATIVE_PATH"
    ;;

  # ─── ALL OTHER FILES: PASS THROUGH ─────────────────
  *)
    exit 0
    ;;

esac

exit 0
