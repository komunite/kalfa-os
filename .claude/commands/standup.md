---
description: Hızlı günlük toplantı - dün, bugün, engeller - git ve görevlerden
argument-hint: ""
allowed-tools:
  - Read
  - Edit
  - Glob
  - Bash(git log:*, date:*)
---

Otomatik günlük toplantı. Git geçmişinden ve görev panosundan dün/bugün/engeller formatını 30 saniyede oluşturur.

## Adımlar

### Adım 1: Tarih bağlamını al

```bash
date +"%m%d%y %A"
```

Dünü belirle (bugün Pazartesi ise hafta sonlarını atla → Cuma'yı kullan).

### Adım 2: Verileri topla (paralel)

**Git etkinliği (dün):**
```bash
git log --after="yesterday 00:00" --before="today 00:00" --oneline --no-merges
```

Dün commit yoksa, son 2 günü dene.

**Görev Panosu:**
`Task Board.md` oku:
- Son zamanlarda tamamlanan olarak işaretlenen kalemler
- Şu anda devam eden kalemler
- Engellenen olarak işaretlenen kalemler

**Günlük not (dün):**
Varsa dünün günlük notunu oku — kararları, notları ve gün sonu özetini tara.

**Hafıza:**
`.claude/memory.md` → Şimdi bölümünü oku, mevcut odak için.

### Adım 3: Günlük toplantıyı oluştur

Format:

```markdown
## Günlük Toplantı — [Gün, Tarih]

### Dün
- [Yapılanlar — git commit'leri ve görev panosundan]
- [Her kalem bir madde, ilişkili commit'ler birleştirilmiş]

### Bugün
- [Görev panosu ve hafızadan öncelikli görevler]
- [Önem sırasına göre]

### Engeller
- [Engellenen veya beklemede olarak işaretlenen her şey]
- [Veya yoksa "Yok"]
```

### Adım 4: Günlük nota ekle

Günlük toplantıyı bugünün günlük notuna `## Günlük Toplantı` bölümü olarak ekle.

Bugün için günlük not yoksa, önce bir tane oluştur (`/start` formatını takip et).

### Adım 5: Çıktı

Günlük toplantıyı kısa ve öz yazdır. 10 satırın altında tut — günlük toplantılar hızlı olmalı.

Engeller varsa vurgula. Her şey yolundaysa bunu belirt.
