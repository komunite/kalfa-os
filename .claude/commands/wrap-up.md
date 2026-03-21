---
description: Gün sonu - hafızayı senkronize et, tamamlanan listeyi temizle, bilgiyi dışsallaştır, yarına hazırlan
argument-hint: ""
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(date:*)
  - Agent
---

Gün sonu ritüeli. Bilgiyi dışsallaştır, temizle, yarına hazırlan.

## Adımlar

### Adım 1: Mevcut durumu oku (paralel)

Eşzamanlı oku:
- `.claude/memory.md`
- `Daily Notes/MMDDYY.md` (bugün)
- `Scratchpad.md`
- `Task Board.md`

### Adım 2: Kalan Not Defteri kalemlerini işle

/sync Adım 2 ile aynı. Her şeyi temizle — Not Defteri gün sonunda boş olmalı.

### Adım 3: Hafızayı senkronize et

`.claude/memory.md` düzenle:
- "Şimdi"yi işlerin durumunu yansıtacak şekilde güncelle
- Tamamlanan Açık Konular'ı çöz
- Eski Son Kararlar'ı buda (1 haftadan eski)
- Çözülen Engeller'i temizle

### Adım 4: Tamamlanan görevleri taşı

`Task Board.md` içinde:
- Tüm tamamlanan görevleri Bugün → Tamamlanan'a taşı
- Cuma ise Tamamlanan listesini temizle
- Tamamlanmayan Bugün kalemlerini nedenini belirten bir notla Bu Hafta veya Bekleyen İşler'e taşı

### Adım 5: Bilgiyi dışsallaştır

Bugünün çalışmasını öğrenimler için incele:
- **Kullanıcı düzeltmeleri**: Kullanıcının açıkça düzelttiği bir şey → `.claude/knowledge-nominations.md`'ye aday göster
- **Ampirik keşifler**: Test yoluyla kanıtlanan şeyler → aday göster
- **Kalıp gözlemleri**: Fark edilen tekrarlayan kalıplar → aday göster
- **Başarısızlık dersleri**: Çözülen herhangi bir başarısızlığın kök nedeni → aday göster

Format: `- [AAGGYY] /wrap-up: [öğrenim] | Kanıt: [kaynak]`

### Adım 6: Zorunlu günlük denetim

Bugünün çalışmasını incelemek için Denetçi agent'ını başlat:

```
Agent(auditor): Daily Notes/MMDDYY.md'deki bugünün çalışmasını incele. Kontrol et:
1. Tüm görevler tamamlandı mı veya düzgün ertelendi mi?
2. Bilgi Tabanı kuralları ihlal edildi mi?
3. İncelenecek bekleyen adaylıklar var mı?
Seviye: T1 (hızlı tarama). Bulguları raporla.
```

### Adım 7: Olay günlüğünü incele

`.claude/logs/incident-log.md` oku. Önemli olayları özetle.

### Adım 8: Yarını ön izle

Görev Panosu ve Açık Konular'a dayanarak, yarın için 1-3 öncelik öner.
Onları Görev Panosu → Bugün'e ekle.

### Adım 9: Günlük notu güncelle

`Daily Notes/MMDDYY.md` → Gün Sonu Özeti'ne ekle:
- Temel başarılar
- Alınan kararlar
- İleriye taşınan açık kalemler
- Yarının öncelikleri

### Adım 10: Çıkış yap

Kısa mesaj: bugün neler başarıldı, yarın sırada ne var.
