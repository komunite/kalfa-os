---
description: Gün ortası senkronizasyonu - günlük notu incele, hafızayı güncelle, notları işle
argument-hint: ""
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(date:*)
---

Gün ortası bağlam yenilemesi. Yakalanan notları işle, hafızayı güncelle, sağlık kontrolü yap.

## Adımlar

### Adım 1: Mevcut durumu oku (paralel)

Eşzamanlı oku:
- `.claude/memory.md`
- `.claude/workspace/DailyNotes/MMDDYY.md` (bugünün tarihi)
- `.claude/workspace/Scratchpad.md`

### Adım 2: Not Defteri'ni işle

Not Defteri'ndeki her kalem için:
- Görev mi? → Görev Panosu'na taşı
- Karar mı? → Günlük Not → Kararlar'a ekle
- Öğrenim mi? → `.claude/knowledge-nominations.md`'ye aday göster
- Not mu? → Günlük Not → Notlar'a ekle
- Eski mi? → Sil

İşlenen kalemleri Not Defteri'nden temizle.

### Adım 3: Görev panosunu tara

`.claude/workspace/TaskBoard.md` oku:
- Tamamlanan görevleri Bugün → Tamamlanan'a taşı
- Engellenen görevleri işaretle
- Öncelikler değişti mi kontrol et

### Adım 4: Bağlam sağlık kontrolü

Öz-değerlendirme:
- Hâlâ doğru probleme mi odaklanıyorum?
- Herhangi bir konuda dönüp duruyor muyum?
- Bağlamım ağırlaşıyor mu? (Evetse, senkronizasyon sonrası `/clear` düşün)

### Adım 5: Oryantasyon kontrolü (Boyd Kuralı)

Kendine sor:
- Bu sabahtan beri ne değişti?
- Yanlış olabilecek hangi varsayımları yapıyorum?
- En basit sonraki eylem ne?

### Adım 6: Hafızayı güncelle

`.claude/memory.md` düzenle:
- "Şimdi"yi mevcut odakla güncelle
- "Açık Konular"a kalem ekle/çöz
- Yeni kararları "Son Kararlar"a kaydet
- Değişen varsa "Engeller"i güncelle

### Adım 7: Olay günlüğünü incele

`.claude/logs/incident-log.md` oku (varsa). Şunları ara:
- Tekrarlayan başarısızlıklar (aynı hata 3+ kez)
- İzin verilmesi gereken engellenen komutlar (veya tam tersi)
- CRITICAL önem derecesindeki olaylar

Dikkat çekici bir şey varsa kullanıcıya bildir.

### Adım 8: Koç içgörüsü (hızlı)

`.claude/agent-memory/coach/MEMORY.md` oku. Eğer koç hafızasında aktif bir öneri varsa ve henüz uygulanmamışsa, durum raporunun sonuna tek satırlık bir hatırlatma ekle:

```
💡 Koç hatırlatması: [önceki öneri özeti]
```

Eğer koç hafızası boşsa veya öneri yoksa bu adımı atla.

### Adım 9: Durum raporu

Kısa özet:
- Bu sabah neler başarıldı
- Mevcut odak
- Engeller veya öncelik değişiklikleri
- Önerilen sonraki eylem
- (varsa) Koç hatırlatması
