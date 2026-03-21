#!/bin/bash
# Stop hook — logs the quality verdict from the haiku review prompt.
# Writes structured JSONL for trend analysis across sessions.
# Tracks session blocks and activates quality gate at >=2 blocks.

LOG_DIR="$CLAUDE_PROJECT_DIR/.claude/logs"
VERDICT_LOG="$LOG_DIR/verdicts.jsonl"
INCIDENT_LOG="$LOG_DIR/incident-log.md"
NOMINATIONS="$CLAUDE_PROJECT_DIR/.claude/knowledge-nominations.md"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
SESSION_DATE=$(date +"%m%d-%H")
BLOCK_FILE="$LOG_DIR/.session-blocks-$SESSION_DATE"

mkdir -p "$LOG_DIR"

# Read the verdict from stdin (piped from the Stop prompt)
RAW_VERDICT=$(cat)

# Strip markdown code fences and prose that Haiku sometimes adds
VERDICT=$(echo "$RAW_VERDICT" | sed -n '/^{/,/^}/p' | head -1)
# Fallback: try the raw input if sed extraction failed
if [ -z "$VERDICT" ]; then
  VERDICT="$RAW_VERDICT"
fi

# Try to parse as JSON
DECISION=$(echo "$VERDICT" | jq -r '.decision // empty' 2>/dev/null)
LEARNING=$(echo "$VERDICT" | jq -r '.learning // empty' 2>/dev/null)
TASK_TYPE=$(echo "$VERDICT" | jq -r '.task_type // "other"' 2>/dev/null)
REASON=$(echo "$VERDICT" | jq -r '.reason // empty' 2>/dev/null)

# Default if not parseable
if [ -z "$DECISION" ]; then
  DECISION="unknown"
  TASK_TYPE="other"
fi

# Write JSONL verdict
jq -n \
  --arg ts "$TIMESTAMP" \
  --arg decision "$DECISION" \
  --arg learning "$LEARNING" \
  --arg task_type "$TASK_TYPE" \
  --arg reason "$REASON" \
  '{timestamp: $ts, decision: $decision, learning: $learning, task_type: $task_type, reason: $reason}' \
  >> "$VERDICT_LOG"

# Track blocks
if [ "$DECISION" = "block" ]; then
  BLOCK_COUNT=1
  if [ -f "$BLOCK_FILE" ]; then
    BLOCK_COUNT=$(( $(cat "$BLOCK_FILE") + 1 ))
  fi
  echo "$BLOCK_COUNT" > "$BLOCK_FILE"

  echo "- \`$TIMESTAMP\` | VERDICT | BLOCK | $REASON" >> "$INCIDENT_LOG"

  # Activate quality gate at >=2 blocks in same session
  if [ "$BLOCK_COUNT" -ge 2 ]; then
    touch "$LOG_DIR/.quality-gate-active"
    echo "- \`$TIMESTAMP\` | VERDICT | WARN | Kalite kapısı etkinleştirildi — bu oturumda $BLOCK_COUNT engelleme" >> "$INCIDENT_LOG"
  fi
fi

# Nominate learning if present
if [ -n "$LEARNING" ] && [ "$LEARNING" != "null" ]; then
  NOMINATION_DATE=$(date +"%m%d%y")
  echo "- [$NOMINATION_DATE] stop-hook: $LEARNING | Evidence: session verdict ($TASK_TYPE)" >> "$NOMINATIONS"
fi

exit 0
