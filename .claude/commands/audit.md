---
description: Denetçi agent'ını son çalışmalar veya belirli bir dosya/görev üzerinde çalıştır
argument-hint: "[kapsam]"
allowed-tools:
  - Read
  - Agent
  - Write
  - Edit
---

Kalite incelemesini Denetçi agent'ına devret.

## Adımlar

### Adım 1: Kapsamı belirle

Kullanıcı belirli bir kapsam belirttiyse (dosya, görev veya alan):
- Bunu denetim hedefi olarak kullan

Kapsam belirtilmediyse:
- Varsayılan olarak "bugünün çalışması" — bağlam için günlük notu oku

### Adım 2: Denetim seviyesini seç

| Seviye | Ne zaman | Derinlik |
|--------|----------|----------|
| T1 | Günlük kapanış, hızlı kontrol | Belirgin sorunları tara, 2-3 dk |
| T2 | Bir özellik veya çok adımlı görev tamamlandığında | Bütünlük, tutarlılık, yan etkileri kontrol et |
| T3 | Haftalık inceleme, büyük değişikliklerden sonra | Tam regresyon kontrolü, Bilgi Tabanı taraması |
| T4 | Aylık veya sistem değişikliklerinden sonra | Derin altyapı denetimi, dosyalar arası tutarlılık |

Açık `/audit` çağrıları için varsayılan T2'dir.

### Adım 3: Denetçi'ye devret

Denetçi agent'ını uygun seviye ve kapsamla başlat:

```
Agent(auditor): [Seviye] denetimi [kapsam].

Bağlam:
- [Yapılanın kısa açıklaması]
- [İlgili temel dosyalar]

Kontrol et:
1. Bütünlük — tüm gereksinimler karşılandı mı?
2. Tutarlılık — değişiklikler mevcut kalıplarla uyumlu mu?
3. Yan etkiler — değişiklikler alt süreçleri bozdu mu?
4. Bilgi — terfi ettirilecek veya aday gösterilecek öğrenimler var mı?

Bulguları belirli dosya:satır referanslarıyla PASS/WARN/FAIL olarak raporla.
```

### Adım 4: Sonuçları işle

- **PASS**: Başarıyı kaydet, varsa önerileri not et
- **WARN**: Uyarıları kaydet, günlük nota ekle
- **FAIL**: Başarısızlıkları kaydet, olay günlüğüne ekle, Görev Panosu'nda düzeltici görevler oluştur

### Adım 5: Günlükleri güncelle

Denetim sonuçlarını günlük nota yeni bir bölüm olarak ekle:
```markdown
## Denetim — SS:DD (T[seviye])
- Sonuç: [PASS/WARN/FAIL]
- Bulgular: [maddeler]
- Eylemler: [oluşturulan düzeltici görevler]
```
