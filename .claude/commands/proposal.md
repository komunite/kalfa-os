---
description: Proje özetinden müşteri teklifi oluştur
argument-hint: "[proje veya müşteri adı]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Agent
  - Glob
  - Bash(date:*)
---

Ham bir özeti kapsam, zaman çizelgesi, teslimatlar ve fiyatlandırma içeren yapılandırılmış bir müşteri teklifine dönüştür.

## Adımlar

### Adım 1: Özeti topla

Kullanıcı proje detayları verdiyse onları kullan. Aksi halde şunları sor:
- Müşteri / proje adı
- Neye ihtiyaçları var? (problem)
- İstenen sonuç nedir?
- Kısıtlamalar var mı (bütçe aralığı, zaman çizelgesi, teknik gereksinimler)?

### Adım 2: Kapsam tanımı

Projeyi aşamalara ve teslimatara böl:

Her aşama için:
- **Aşama adı** ve süresi
- **Teslimatlar** — belirli, somut çıktılar
- **Bağımlılıklar** — bu aşamayı başlatmak için ne gerekli
- **Varsayımlar** — doğru olduğunu varsaydığınız şeyler

Kapsam kaymasına neden olabilecek her şeyi işaretle. Nelerin dahil olduğu ve olmadığı konusunda açık ol.

### Adım 3: Zaman çizelgesi

Gerçekçi bir zaman çizelgesi oluştur:
- Aşamaları takvim haftalarına eşle
- Kilometre taşlarını belirle (karar noktaları, incelemeler, devirler)
- Geri bildirim turları için tampon bırak
- Müşteriye bağlı sabit tarihler veya bağımlılıkları not et

### Adım 4: Fiyatlandırma

Fiyatlandırmayı yapılandır:
- **Seçenek A (Önerilen):** Tanımlandığı şekliyle tam kapsam
- **Seçenek B:** Azaltılmış kapsam (MVP / Yalnızca Aşama 1)
- **Opsiyonel eklentiler:** Çekirdek işi tamamlayan ek hizmetler

Her seçenek için şunları listele: toplam fiyat, ödeme planı, dahil olanlar, dahil olmayanlar.

### Adım 5: Şartlar

Dahil edilecek standart şartlar:
- Ödeme planı ve şartları
- Revizyon politikası (kaç tur revizyon)
- Mülkiyet / fikri mülkiyet devri
- Kabul / onay için zaman çizelgesi
- İptal şartları

### Adım 6: Teklifi yaz

`proposals/[musteri-adi]-proposal.md` dosyasına kaydet:

```markdown
# Teklif — [Proje Adı]

**Hazırlanan:** [Müşteri]
**Hazırlayan:** [İsminiz/şirketiniz]
**Tarih:** [tarih]

---

## Yönetici Özeti

[2-3 cümle: problem, çözümünüz, beklenen sonuç]

## Anlayışımız

[Müşterinin problemini kendi sözlerinizle yeniden ifade edin — dinlediğinizi kanıtlar]

## Yaklaşım

### Aşama 1: [İsim] — [süre]
**Teslimatlar:**
- [belirli çıktı]
- [belirli çıktı]

### Aşama 2: [İsim] — [süre]
**Teslimatlar:**
- [belirli çıktı]
- [belirli çıktı]

[Her aşama için devam et]

## Zaman Çizelgesi

| Aşama | Süre | Kilometre Taşı |
|-------|------|----------------|
| [Aşama 1] | [hafta] | [kilit teslimat] |

## Yatırım

### Seçenek A: Tam Kapsam (Önerilen)
[fiyat, ödeme planı, dahil olanlar]

### Seçenek B: Yalnızca Aşama 1
[fiyat, ödeme planı, dahil olanlar]

### Opsiyonel Eklentiler
- [eklenti]: [fiyat]

## Şartlar

- [Ödeme şartları]
- [Revizyon politikası]
- [Mülkiyet]

## Sonraki Adımlar

1. Bu teklifi inceleyin
2. [Devam etmek için belirli eylem]
3. Detayları hizalamak için başlangıç toplantısı

---
Yukarıdaki tarihten itibaren 30 gün geçerlidir.
```

Bir özet çıktıla ve kullanıcıya dosyanın nereye kaydedildiğini söyle.
