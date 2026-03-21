#!/bin/bash
# SessionStart(compact) hook — restores context after auto-compaction.
# Reads the marker left by pre-compact-handoff.sh, resets counters,
# and injects resumption instructions for Claude.

LOG_DIR="$CLAUDE_PROJECT_DIR/.claude/logs"
MARKER="$LOG_DIR/.compaction-occurred"

# Only run if compaction actually occurred
if [ ! -f "$MARKER" ]; then
  exit 0
fi

# Reset session counters
rm -f "$LOG_DIR/.tool-call-count" "$LOG_DIR/.quality-gate-active" 2>/dev/null

# Read compaction timestamp
COMPACT_TIME=$(cat "$MARKER" 2>/dev/null || echo "unknown")

# Clean up marker
rm -f "$MARKER"

# Output resumption context for Claude
echo "SIKIŞTIRMA SONRASI DEVAM: Bağlam $COMPACT_TIME zamanında otomatik sıkıştırıldı. Oturum durumu memory.md ve günlük notta korundu. Bağlamı yeniden yüklemek için .claude/memory.md ve en son Günlük Notu oku (en son Oturum Devir Teslimi'ni ara), sonra devam eden görev üzerinde çalışmaya devam et. Kullanıcıya ne yapacağını sorma — sorunsuz şekilde devam et."

exit 0
