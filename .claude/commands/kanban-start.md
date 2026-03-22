---
description: Kanban board'dan gelen görevi teslim al ve hemen çalışmaya başla
argument-hint: ""
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(date:*)
  - Bash(rm:*)
  - Bash(curl:*)
  - Glob
  - Grep
---

Kanban board'dan otomatik tetiklendin. Görevi teslim al ve hemen çalışmaya başla.

## Adımlar

### Adım 1: Bağlamı yükle (paralel)

Eşzamanlı oku:
- `.claude/memory.md`
- `.claude/knowledge-base.md`
- `.claude/kanban-inbox.md`

### Adım 2: Inbox'ı işle

`.claude/kanban-inbox.md` dosyasını oku. İçindeki görevi al:
- Görev adı, öncelik, ilerleme, not, **Skill/Agent** ve kolon bilgisini çıkar
- Dosyayı sil: `rm -f "$CLAUDE_PROJECT_DIR/.claude/kanban-inbox.md"`

### Adım 3: Skill/Agent kontrolü

Inbox'ta `Skill/Agent` satırı varsa:
- `@agent-adı` formatındaysa → o agent'ı kullanarak çalış (Agent tool ile spawn et)
- `/komut-adı` formatındaysa → o komutu çalıştır (`.claude/commands/{komut-adı}.md` oku ve uygula)
- Yoksa → standart akış ile devam et

### Adım 4: Görevi anla

Görev metnini ve notunu okuyarak ne yapılması gerektiğini anla.
Gerekirse TaskBoard.md'yi ve ilgili kod dosyalarını incele.

### Adım 5: Hemen çalışmaya başla

Kullanıcıdan onay bekleme. İlk somut adımı belirle ve uygula.

Başlamadan önce tek satırlık bir bildirim ver:
```
📋 Görev: [görev adı] — [skill varsa: skill ile] Başlıyorum.
```

Sonra doğrudan çalışmaya gir.

### Adım 6: Görev tamamlandığında Done'a taşı

Görev başarıyla tamamlandıktan sonra (tüm adımlar bitti, kod yazıldı veya çıktı üretildi):

1. Kanban server'ın çalışıp çalışmadığını kontrol et:
   ```bash
   curl -s http://localhost:2903/api/board > /dev/null 2>&1 && echo "up" || echo "down"
   ```

2. Server çalışıyorsa görevi Done'a taşı:
   ```bash
   curl -s -X POST http://localhost:2903/api/complete-task \
     -H 'Content-Type: application/json' \
     -d "{\"taskText\":\"[inbox'tan aldığın görev adı]\"}" \
     > /dev/null
   ```

3. Kullanıcıya bildir:
   ```
   ✅ Görev tamamlandı ve kanban board'da Done'a taşındı.
   ```

Not: Server kapalıysa bu adımı sessizce atla, hata verme.
