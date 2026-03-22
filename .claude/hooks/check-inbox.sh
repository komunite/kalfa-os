#!/bin/bash
# SessionStart (user) hook — Kanban board'dan bekleyen görevleri Claude'a enjekte eder.
# Kanban'dan "Claude'da Başlat" seçildiğinde .claude/kanban-inbox-<timestamp>-<id>.md oluşur.
# Bu hook klasördeki tüm inbox dosyalarını işler, içeriği Claude'un bağlamına yazar ve siler.

INBOX_PATTERN="${CLAUDE_PROJECT_DIR}/.claude/kanban-inbox-*.md"

# Eşleşen dosya var mı kontrol et
shopt -s nullglob
INBOX_FILES=($INBOX_PATTERN)
shopt -u nullglob

[ ${#INBOX_FILES[@]} -gt 0 ] || exit 0

for INBOX in "${INBOX_FILES[@]}"; do
	[ -f "$INBOX" ] || continue
	CONTENT=$(cat "$INBOX")
	rm -f "$INBOX"

	echo ""
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	echo "📬  KANBAN BOARD'DAN YENİ GÖREV GELDİ"
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	echo "$CONTENT"
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	echo ""
done

exit 0
