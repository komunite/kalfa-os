#!/bin/bash
# PostToolUse async hook — TaskBoard.md yazıldığında Kanban board'a sinyal gönderir.
# Sadece TaskBoard.md değişikliklerinde .kanban-dirty flag dosyasını günceller.

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

case "$FILE_PATH" in
  */TaskBoard.md) ;;
  *) exit 0 ;;
esac

LOG_DIR="${CLAUDE_PROJECT_DIR}/.claude/logs"
mkdir -p "$LOG_DIR"
touch "$LOG_DIR/.kanban-dirty"

exit 0
