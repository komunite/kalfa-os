#!/bin/bash
# PreCompact hook — saves a marker before auto-compaction.
# The post-compact-resume.sh hook reads this marker to restore context.

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
LOG_DIR="$CLAUDE_PROJECT_DIR/.claude/logs"
INCIDENT_LOG="$LOG_DIR/incident-log.md"

mkdir -p "$LOG_DIR"

echo "$TIMESTAMP" > "$LOG_DIR/.compaction-occurred"
echo "- \`$TIMESTAMP\` | COMPACTION | INFO | Otomatik sıkıştırma tetiklendi — durum kaydedildi" >> "$INCIDENT_LOG"

exit 0
