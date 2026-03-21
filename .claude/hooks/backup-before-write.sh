#!/bin/bash
# PreToolUse async hook — creates timestamped backups before Write|Edit.
# Runs asynchronously so it doesn't block the write operation.
# Keeps 7 days of backups, auto-prunes older ones.

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Skip if no file path or file doesn't exist yet
[ -z "$FILE_PATH" ] && exit 0
[ ! -f "$FILE_PATH" ] && exit 0

# Skip if file is in logs or backups (no backup recursion)
case "$FILE_PATH" in
  */.claude/logs/*|*/.claude/backups/*) exit 0 ;;
esac

BACKUP_DIR="$CLAUDE_PROJECT_DIR/.claude/backups/$(date +%Y-%m-%d)"
mkdir -p "$BACKUP_DIR"

# Create backup with timestamp suffix
BASENAME=$(basename "$FILE_PATH")
TIMESTAMP=$(date +"%H%M%S")
cp "$FILE_PATH" "$BACKUP_DIR/${BASENAME}.${TIMESTAMP}.bak" 2>/dev/null

# Prune backups older than 7 days
find "$CLAUDE_PROJECT_DIR/.claude/backups" -maxdepth 1 -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null

exit 0
