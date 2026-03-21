---
description: Ham bir fikri yapılandırılmış bir proje özetine dönüştür
argument-hint: "[proje fikri]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Agent
  - Glob
  - Bash(date:*)
---

Ham bir fikri gereksinimler, kullanıcı hikayeleri, kabul kriterleri, riskler ve zaman çizelgesi içeren yapılandırılmış bir proje özetine dönüştür.

## Adımlar

### Adım 1: Fikri yakala

Kullanıcının anlattığını al ve şunları belirle:
- **Problem:** Hangi sorunu çözüyor?
- **Çözüm:** Ne inşa ediyoruz?
- **Kullanıcı:** Kim faydalanacak?
- **Sonuç:** Başarı neye benziyor?

Bunlardan herhangi biri girişten net değilse, makul varsayımlar yap ve bunları işaretle.

### Adım 2: Kapsamı tanımla

**Kapsam dahilinde:**
- Bu projenin sunacağı belirli yetenekleri / özellikleri listele
- Somut ol — "filtreleme işlevi" değil "kullanıcı tarihe göre filtreleyebilir"

**Kapsam dışında:**
- Bu projenin yapmayacağı şeyleri açıkça listele
- Bu, kapsam dahili kadar önemlidir — kapsam kaymasını önler

**Varsayımlar:**
- Doğru olduğunu varsaydığımız şeyler neler?
- Teknik varsayımlar (platform, teknoloji yığını, entegrasyonlar)
- İş varsayımları (bütçe, zaman çizelgesi, ekip)

### Adım 3: Kullanıcı hikayeleri

Standart formatta 5-10 kullanıcı hikayesi yaz:

```
Bir [kullanıcı türü] olarak, [fayda] sağlamak için [eylem] yapmak istiyorum.

Kabul kriterleri:
- [ ] [Belirli, test edilebilir kriter]
- [ ] [Belirli, test edilebilir kriter]
- [ ] [Belirli, test edilebilir kriter]
```

MoSCoW ile önceliklendir:
- **Olmazsa olmaz:** Lansman için vazgeçilmez
- **Olmalı:** Önemli ama kritik değil
- **Olabilir:** Zaman kalırsa güzel olur
- **Olmayacak:** Bu sürümden açıkça hariç tutulan

### Adım 4: Teknik değerlendirmeler

İlgiliyse:
- **Teknoloji yığını / platform:** Önerilen teknoloji seçimleri
- **Entegrasyonlar:** Gereken üçüncü taraf hizmetler veya API'ler
- **Veri:** Hangi veriye ihtiyaç var, nereden geliyor, nasıl saklanıyor
- **Kısıtlamalar:** Performans gereksinimleri, güvenlik ihtiyaçları, uyumluluk

### Adım 5: Riskler ve azaltma önlemleri

İlk 3-5 riski belirle:

| Risk | Olasılık | Etki | Azaltma |
|------|----------|------|---------|
| [risk] | Yüksek/Orta/Düşük | Yüksek/Orta/Düşük | [ne yapılacak] |

### Adım 6: Zaman tahmini

Aşamalara böl ve kaba tahminler yap:
- **Aşama 1 — Temel:** [kapsam] — [tahmin]
- **Aşama 2 — Çekirdek özellikler:** [kapsam] — [tahmin]
- **Aşama 3 — İyileştirme ve lansman:** [kapsam] — [tahmin]

Not: Bunlar kaba tahminlerdir, taahhüt değil.

### Adım 7: Özeti yaz

`briefs/[proje-adi]-brief.md` dosyasına kaydet:

```markdown
# Proje Özeti — [İsim]

**Tarih:** [tarih]
**Durum:** Taslak

---

## Problem
[Hangi sorunu çözüyoruz?]

## Çözüm
[Ne inşa ediyoruz?]

## Hedef Kullanıcı
[Kim faydalanacak?]

## Başarı Kriterleri
[Bunun işe yaradığını nasıl anlayacağız?]

## Kapsam

### Kapsam Dahilinde
- [belirli özellik]

### Kapsam Dışında
- [açıkça hariç tutulan]

### Varsayımlar
- [varsayım]

## Kullanıcı Hikayeleri

### Olmazsa Olmaz
[kabul kriterleri ile kullanıcı hikayeleri]

### Olmalı
[kullanıcı hikayeleri]

### Olabilir
[kullanıcı hikayeleri]

## Teknik Değerlendirmeler
[teknoloji yığını, entegrasyonlar, veri, kısıtlamalar]

## Riskler
[risk tablosu]

## Zaman Çizelgesi
[aşamalı tahmin]

## Açık Sorular
- [çalışma başlamadan önce hâlâ çözülmemiş konular]

---
İncelemeye hazır.
```

Bir özet çıkar ve çalışma başlamadan önce yanıt bekleyen açık soruları işaretle.
