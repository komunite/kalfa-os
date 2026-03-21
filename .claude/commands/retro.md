---
description: Sprint retrospektifi - neyin işe yaradığını, neyin yaramadığını incele, süreci iyileştir
argument-hint: "[zaman dilimi]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Agent
  - Bash(date:*)
---

Retrospektif analiz. Bir zaman dilimini incele, kalıpları çıkar, sistemi iyileştir.

## Adımlar

### Adım 1: Kapsamı belirle

Kullanıcı bir zaman dilimi belirttiyse onu kullan. Aksi halde varsayılan "bu hafta."

### Adım 2: Verileri topla (paralel okumalar)

Eşzamanlı oku:
- Son günlük notlar (son 5-7 gün)
- `.claude/logs/verdicts.jsonl` (oturum kalite trendleri)
- `.claude/logs/incident-log.md` (sorunlar ve engeller)
- `.claude/logs/failure-log.md` (araç başarısızlıkları)
- `.claude/knowledge-nominations.md` (bekleyen öğrenimler)
- `Task Board.md` (tamamlanma oranı)

### Adım 3: Kalıpları analiz et

**Ne iyi gitti?**
- Zamanında tamamlanan görevler
- Sorunsuz iş akışları (engel yok)
- Başarıyla yakalanan öğrenimler
- Pozitif yönde seyreden kalite değerlendirmeleri

**Ne iyi gitmedi?**
- Tekrarlayan başarısızlıklar (aynı hata türü)
- İzin verilmesi gereken engellenen komutlar
- Beklenenden çok daha uzun süren görevler
- Sık ihtiyaç duyulan bağlam temizleme (/clear)
- Kalite değerlendirme engelleri

**Ne değişmeli?**
- Süreç darboğazları var mı?
- Hook'lar çok mu sıkı yoksa çok mu gevşek?
- Agent'larda eksik yetenekler var mı?
- Eksik veya az kullanılan komutlar var mı?

### Adım 4: İyileştirmeleri çıkar

Belirlenen her iyileştirme için:
1. **Bilgi Tabanı kuralı** mı? → Doğrudan terfi ettir
2. **Süreç değişikliği** mi? → Kullanıcı incelemesi için Not Defteri'ne ekle
3. **Araç/config değişikliği** mi? → Görev Panosu'nda görev oluştur
4. **İzlenecek kalıp** mı? → Bilgi Adaylıkları'na aday göster

### Adım 5: Retrospektif raporunu yaz

Günlük nota ekle:

```markdown
## Retrospektif — [dönem]

### İyi Giden
- [maddeler]

### İyi Gitmeyen
- [maddeler]

### Eylem Kalemleri
- [ ] [sorumlusuyla belirli iyileştirme]

### Metrikler
- Tamamlanan görevler: [X]
- Kalite değerlendirme geçiş oranı: [X]%
- Olaylar: [X] (CRITICAL: [X], HIGH: [X])
- Bağlam temizlemeleri: [X]
```

### Adım 6: Eylem kalemlerini oluştur

Eyleme dönüştürülebilir iyileştirmeleri `Task Board.md` → Bu Hafta'ya ekle.
