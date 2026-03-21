---
description: Tam ürün lansman hattı - fikirden pazara giriş planına
argument-hint: "[lansmanı yapılacak ürün veya özellik]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Agent
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - Bash(date:*)
---

Tam lansman hattı. Bir ürün veya özellik fikrini rekabet araştırması, konumlandırma, fiyatlandırma analizi ve pazara giriş planlamasından geçirir.

## Adımlar

### Adım 1: Lansman özetini yakala

Kullanıcı neyi lanse edeceğini anlattıysa onu kullan. Aksi halde şunları sor:
- Ürün/özellik nedir?
- Hedef müşteri kim?
- Zaman çizelgesi nedir?

Bir paragraf lansman özeti yaz.

### Adım 2: Rekabet taraması (paralel agent'lar)

Paralel araştırma için agent'lar başlat:

**Agent 1 — Rakip ortamı:**
- Doğrudan rakipleri ara (aynı sorunu çözen ürünler)
- Fiyatlandırma, özellikler, konumlandırma, güçlü yönler, zayıf yönleri çıkar
- Pazardaki boşlukları belirle

**Agent 2 — Pazar sinyalleri:**
- Bu alandaki son trendleri ara
- Talep sinyallerini ara (Reddit konuları, HN tartışmaları, Twitter konuşmaları)
- Zamanlama etkileyen düzenleyici veya platform değişikliklerini not et

### Adım 3: Konumlandırma

Rekabet bulgularına dayanarak tanımla:
- **Kategori:** Bu hangi pazar kategorisine ait?
- **Farklılaştırma:** Rakiplerin yapmadığı neyi yapıyorsunuz?
- **Değer önerisi:** Müşterinin "buna ihtiyacım var" demesini sağlayan bir cümle
- **Konumlandırma ifadesi:** [hedef] için [ürün], [temel fayda] sağlayan [kategori]dir; [alternatif]in aksine çünkü [neden]

### Adım 4: Fiyatlandırma analizi

Rakip fiyatlandırma verileri kullanılarak:
- Rakip fiyat noktalarını haritalandır (ücretsiz katman, giriş, pro, kurumsal)
- Pazarınızın beklediği fiyat aralığını belirle
- Gerekçesiyle bir fiyatlandırma stratejisi öner
- Fiyatlandırma modeli dahil et (tek seferlik, abonelik, kullanım bazlı, freemium)

### Adım 5: Açılış sayfası özeti

Yapılandırılmış bir açılış sayfası taslağı oluştur:
1. **Kahraman:** Başlık, alt başlık, birincil CTA
2. **Sorun noktaları:** Hedef müşterinizin sahip olduğu 3-4 problem
3. **Çözüm:** Ürününüz bunları nasıl çözüyor
4. **Özellikler:** Faydalarıyla birlikte ilk 5-6 özellik (sadece açıklama değil)
5. **Sosyal kanıt:** Ne tür kanıt işe yarar (referanslar, istatistikler, logolar)
6. **Fiyatlandırma:** Adım 4 analizine dayalı
7. **SSS:** Hedef müşterinizin soracağı 5-6 soru
8. **Son CTA:** Kapanış itkisi

### Adım 6: Pazara giriş kontrol listesi

Aşamalı lansman kontrol listesi oluştur:

**Lansman öncesi (2-4 hafta önce):**
- [ ] Açılış sayfası yayında
- [ ] E-posta toplama / bekleme listesi kuruldu
- [ ] Lansman duyurusu taslağı hazırlandı
- [ ] Dağıtım kanalları belirlendi (topluluklar, bültenler, sosyal medya)
- [ ] Erken erişim / beta kullanıcıları sıralandı

**Lansman günü:**
- [ ] Birincil kanallarda duyur
- [ ] Product Hunt / HN / ilgili topluluklarda paylaş
- [ ] Bekleme listesine e-posta gönder
- [ ] Sorunları izle
- [ ] Erken geri bildirimlere yanıt ver

**Lansman sonrası (1-2 hafta sonra):**
- [ ] Geri bildirimleri topla ve ele al
- [ ] Vaka çalışmaları / sonuçlar yayınla
- [ ] Dönüşüm verilerine göre optimize et
- [ ] Erken kullanıcılarla iletişime geç

### Adım 7: Lansman planını yaz

Her şeyi `launch-plan-[urun-adi].md` dosyasına kaydet:

```markdown
# Lansman Planı — [Ürün Adı]

## Özet
[bir paragraf]

## Rekabet Ortamı
[fiyatlandırma/özellikler/konumlandırma ile rakip tablosu]

## Konumlandırma
[konumlandırma ifadesi ve farklılaştırma]

## Fiyatlandırma Stratejisi
[gerekçesiyle önerilen fiyatlandırma]

## Açılış Sayfası Özeti
[Adım 5'ten yapılandırılmış taslak]

## Pazara Giriş Kontrol Listesi
[Adım 6'dan aşamalı kontrol listesi]

## Zaman Çizelgesi
[kilit tarihler ve kilometre taşları]

## Riskler
[ilk 3 risk ve azaltma önlemleri]

---
Oluşturulma: [tarih]
```

Planın özetini çıktıla ve kullanıcıya ilk neyin uygulanacağını sor.
