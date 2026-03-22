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
echo "Bu görevi şimdi üstlen. TaskBoard.md'de In Progress kolonuna taşındı."
echo "İlk somut adımı belirle ve çalışmaya başla."
echo ""

exit 0
