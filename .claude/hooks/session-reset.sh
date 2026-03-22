#!/bin/bash
# SessionStart(user) hook — resets stale state on fresh session start.
# Cleans up gate files, validates agent definitions, checks permissions.

LOG_DIR="$CLAUDE_PROJECT_DIR/.claude/logs"
AGENTS_DIR="$CLAUDE_PROJECT_DIR/.claude/agents"
HOOKS_DIR="$CLAUDE_PROJECT_DIR/.claude/hooks"

mkdir -p "$LOG_DIR"

# ═══════════════════════════════════════════════════════
# 1. Reset stale gate files (prevents cross-session deadlocks)
# ═══════════════════════════════════════════════════════
rm -f "$LOG_DIR/.quality-gate-active" \
      "$LOG_DIR/.tool-call-count" \
      "$LOG_DIR/.compaction-occurred" 2>/dev/null

# Clean up stale session-blocks files (older than current hour)
find "$LOG_DIR" -name ".session-blocks-*" -mmin +120 -delete 2>/dev/null

# ═══════════════════════════════════════════════════════
# 2. Validate hook scripts are executable
# ═══════════════════════════════════════════════════════
if [ -d "$HOOKS_DIR" ]; then
  HOOK_ISSUES=0
  for hook in "$HOOKS_DIR"/*.sh; do
    [ ! -f "$hook" ] && continue
    if [ ! -x "$hook" ]; then
      chmod +x "$hook" 2>/dev/null
      HOOK_ISSUES=$((HOOK_ISSUES + 1))
    fi
  done
  if [ "$HOOK_ISSUES" -gt 0 ]; then
    echo "- \`$(date +"%Y-%m-%d %H:%M:%S")\` | SESSION | INFO | $HOOK_ISSUES hook betiğinin izinleri düzeltildi" >> "$LOG_DIR/incident-log.md"
  fi
fi

# ═══════════════════════════════════════════════════════
# 3. Validate agent definitions exist and have frontmatter
# ═══════════════════════════════════════════════════════
if [ -d "$AGENTS_DIR" ]; then
  AGENT_ISSUES=""
  for agent in "$AGENTS_DIR"/*.md; do
    [ ! -f "$agent" ] && continue
    AGENT_NAME=$(basename "$agent" .md)

    # Check for frontmatter (starts with ---)
    if ! head -1 "$agent" | grep -q '^---'; then
      AGENT_ISSUES="$AGENT_ISSUES $AGENT_NAME(no-frontmatter)"
    fi
  done

  if [ -n "$AGENT_ISSUES" ]; then
    echo "- \`$(date +"%Y-%m-%d %H:%M:%S")\` | SESSION | WARN | Ajan sorunları:$AGENT_ISSUES" >> "$LOG_DIR/incident-log.md"
  fi
fi

# ═══════════════════════════════════════════════════════
# 4. Ensure required directories exist
# ═══════════════════════════════════════════════════════
mkdir -p "$CLAUDE_PROJECT_DIR/.claude/agent-memory" \
         "$CLAUDE_PROJECT_DIR/.claude/backups" \
         "$CLAUDE_PROJECT_DIR/.claude/skills" \
         "$CLAUDE_PROJECT_DIR/.claude/workspace/DailyNotes" 2>/dev/null

# ═══════════════════════════════════════════════════════
# 5. Prune old log files (keep last 30 days)
# ═══════════════════════════════════════════════════════
if [ -f "$LOG_DIR/audit-trail.md" ]; then
  LINE_COUNT=$(wc -l < "$LOG_DIR/audit-trail.md" | tr -d ' ')
  if [ "$LINE_COUNT" -gt 5000 ]; then
    # Keep last 2000 lines
    tail -2000 "$LOG_DIR/audit-trail.md" > "$LOG_DIR/audit-trail.md.tmp"
    mv "$LOG_DIR/audit-trail.md.tmp" "$LOG_DIR/audit-trail.md"
    echo "- \`$(date +"%Y-%m-%d %H:%M:%S")\` | SESSION | INFO | Denetim izi $LINE_COUNT satırdan 2000 satıra budandı" >> "$LOG_DIR/incident-log.md"
  fi
fi

exit 0
