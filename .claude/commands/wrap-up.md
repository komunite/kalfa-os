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
- `.claude/workspace/DailyNotes/MMDDYY.md` (bugün)
- `.claude/workspace/Scratchpad.md`
- `.claude/workspace/TaskBoard.md`

### Adım 2: Kalan Not Defteri kalemlerini işle

/sync Adım 2 ile aynı. Her şeyi temizle — Not Defteri gün sonunda boş olmalı.

### Adım 3: Hafızayı senkronize et

`.claude/memory.md` düzenle:
- "Şimdi"yi işlerin durumunu yansıtacak şekilde güncelle
- Tamamlanan Açık Konular'ı çöz
- Eski Son Kararlar'ı buda (1 haftadan eski)
- Çözülen Engeller'i temizle

### Adım 4: Tamamlanan görevleri taşı

`.claude/workspace/TaskBoard.md` içinde:
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
Agent(auditor): .claude/workspace/DailyNotes/MMDDYY.md'deki bugünün çalışmasını incele. Kontrol et:
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

`.claude/workspace/DailyNotes/MMDDYY.md` → Gün Sonu Özeti'ne ekle:
- Temel başarılar
- Alınan kararlar
- İleriye taşınan açık kalemler
- Yarının öncelikleri

### Adım 10: Haftalık koç analizi (sadece Cuma)

Bugün Cuma ise, Koç agent'ını haftalık analiz için çalıştır:

```
Agent(coach): Bu haftanın günlük notlarını, görev panosunu ve koç hafızasını analiz et.
Dönem: son 7 gün.
4 analiz yap: verimlilik, büyüme, sürdürülebilirlik, kaçırılan fırsatlar.
Koç raporunu sun ve hafızanı güncelle.
```

Cuma değilse bu adımı atla.

### Adım 11: Çıkış yap

Kısa mesaj: bugün neler başarıldı, yarın sırada ne var.
Cuma ise koç raporunu da dahil et.
