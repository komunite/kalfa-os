#!/bin/bash
# SessionStart (user) hook — Kanban board'dan bekleyen görevleri Claude'a enjekte eder.
# Kanban'dan "Claude'da Başlat" seçildiğinde .claude/kanban-inbox.md oluşur.
# Bu hook o dosyayı okur, içeriği Claude'un bağlamına yazar ve dosyayı temizler.

INBOX="${CLAUDE_PROJECT_DIR}/.claude/kanban-inbox.md"

[ -f "$INBOX" ] || exit 0

CONTENT=$(cat "$INBOX")
rm -f "$INBOX"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📬  KANBAN BOARD'DAN YENİ GÖREV GELDİ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "$CONTENT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exit 0
