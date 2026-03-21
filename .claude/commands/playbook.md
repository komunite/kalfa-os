---
description: Bir iş akışını kaydet ve otomatik olarak yeniden kullanılabilir bir komut oluştur
argument-hint: "[oyun kitabı adı]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Bash(date:*)
---

Manuel bir iş akışını izle, ardından ondan otomatik olarak yeniden kullanılabilir bir komut oluştur. Adımları sen anlatırsın, bu komut onları tekrarlanabilir, belgelenmiş bir prosedüre dönüştürür.

## Adımlar

### Adım 1: Oyun kitabını adlandır

Argümandan oyun kitabı adını al. Belirtilmediyse, bu iş akışının ne yaptığını bir cümlede sor ve kebab-case bir isim türet.

### Adım 2: İş akışını yakala

Kullanıcıdan iş akışını adım adım anlatmasını iste. Her adım için şunları yakala:
- **Ne:** Yapılan eylem
- **Nerede:** Hangi dosya, araç veya sistem dahil
- **Neden:** Bu adımın amacı
- **Girdiler:** Hangi bilgi gerekli
- **Çıktı:** Bu adım ne üretiyor

Onlara rehberlik et: "Önce ne yapıyorsun?" → "Sonra ne?" → "Sırada ne var?"

Bitti dediklerinde devam et.

### Adım 3: Kalıpları belirle

Yakalanan iş akışını analiz et:
- **Hangi adımlar paralel çalıştırılabilir?** (bağımsız okumalar, aramalar)
- **Hangi adımlar kullanıcı girdisi gerektirir?** (kararlar, onaylar)
- **Hangi adımlar koşullu?** (yalnızca X ise, o zaman Y)
- **Her adım hangi araçlara ihtiyaç duyar?** (Read, Write, Agent, Bash, WebSearch, vb.)
- **Adımlarla eşleşen mevcut skill'ler var mı?** (`.claude/skills/` kontrol et)

### Adım 4: Argümanı belirle

Bu iş akışı her çalıştırıldığında hangi değişken girdiye ihtiyaç duyar?
- Bir proje adı mı? Bir dosya yolu mu? Bir konu mu? Bir müşteri adı mı?
- Mantıklı olan argument-hint'i tanımla

### Adım 5: Komutu oluştur

Komut dosyasını `.claude/commands/[oyun-kitabi-adi].md` konumuna yaz:

```markdown
---
description: [iş akışından türetilen bir satırlık açıklama]
argument-hint: "[belirlenen argüman]"
allowed-tools:
  - [adım analizinden türetilen gerekli araç listesi]
---

[Bu komutun ne yaptığının kısa açıklaması]

## Adımlar

### Adım 1: [İlk eylem]
[Yakalanan iş akışından türetilen talimatlar]

### Adım 2: [İkinci eylem]
[Talimatlar]

[Her adım için devam et, paralel adımlar işaretli]

### Adım [N]: Çıktı
[Son çıktının neye benzediği]
```

### Adım 6: Doğrula ve iyileştir

Oluşturulan komutu kullanıcıya göster:
- "İşte oluşturduğum komut. İş akışınızı doğru yansıtıyor mu?"
- İstedikleri düzeltmeleri yap
- Son sürümü kaydet

### Adım 7: Komutu kaydet

Bir command-index.md varsa, yeni komutu ekle.

Çıktı: "Oyun kitabınız `/[isim]` olarak kaydedildi. Bu iş akışını tekrarlamak için istediğiniz zaman çalıştırın."
