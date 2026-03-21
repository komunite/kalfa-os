---
description: Güne başla - hafızayı yükle, görev panosunu aç, çalışmaya hazır
argument-hint: ""
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(date:*)
---

Bir çalışma oturumu başlat. Bağlamı yükle, bugünün günlük notunu oluştur, görevleri incele.

## Adımlar

### Adım 1: Bugünün tarihini al

```bash
date +"%m%d%y %H:%M %A"
```

### Adım 2: Hafızayı yükle (paralel okumalar)

Eşzamanlı oku:
- `.claude/memory.md`
- `.claude/knowledge-base.md`

Bunlar çalışma bağlamındır. Bilgi Tabanı girdileri zorunlu kısıtlamalardır.

### Adım 3: Günlük not oluştur

`Daily Notes/MMDDYY.md` oluştur (yoksa):

```markdown
# MMDDYY - Günlük Çalışma Kaydı

## Kararlar
-

## Toplantılar ve Görüşmeler
-

## Notlar
-

## Gün Sonu Özeti
-
```

### Adım 4: Görev panosunu aç

`Task Board.md` oku. Şunları tara:
- Geciken kalemler (önceki günlerden hâlâ açık olan)
- Bugünün öncelikleri
- Engellenen kalemler

### Adım 5: Görev incelemesi

Bugün'deki her görev için:
1. Hâlâ geçerli mi?
2. Başlamak için ihtiyacım olan her şey var mı?
3. Bağımlılıklar var mı?

Eski görevleri Bekleyen İşler'e taşı. Engellenen kalemleri işaretle.

### Adım 6: Çalışmaya hazır

Kısa bir oryantasyon çıktıla:
- Hangi gün olduğu
- Bugün için ilk 1-3 öncelik
- memory.md'den engelller veya açık konular
- "Çalışmaya hazırım. İlk ne yapalım?"

Kısa tut. Kullanıcı çalışmaya başlamak istiyor, rapor okumak değil.
