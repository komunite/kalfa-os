---
description: Veri veya bulgulardan profesyonel rapor oluştur - hedef kitleye uygun
argument-hint: "[konu ve hedef kitle]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Agent
  - Glob
  - Grep
  - Bash(date:*)
---

Ham veriyi, bulguları veya araştırmayı cilalı bir anlatı raporuna dönüştür. Hedef kitleye göre ton ve derinliği uyarlar.

## Adımlar

### Adım 1: Girdileri netleştir

Belirle:
- **Konu:** Bu rapor ne hakkında?
- **Veri kaynakları:** Hangi dosyalar, bulgular veya veriler beslemeli?
- **Hedef kitle:** Bunu kim okuyacak? (yönetici, teknik ekip, müşteri, yönetim kurulu, genel)
- **Format tercihi:** Kısa (1-2 sayfa), standart (3-5 sayfa) veya kapsamlı (5+ sayfa)

Kullanıcı hedef kitle belirtmediyse, varsayılan olarak "profesyonel — açık, doğrudan, jargonsuz."

### Adım 2: Kaynak materyali topla

Tüm ilgili dosya ve verileri oku. Şunları tara:
- Temel bulgular ve metrikler
- Kalıplar ve trendler
- Karşılaştırmalar (öncesi/sonrası, kıyaslama ile, rakip ile)
- Anomaliler veya endişeler
- Veriden ortaya çıkan öneriler

### Adım 3: Hedef kitleye göre yapılandır

**Yönetici hedef kitle:**
- Alt satırla başla (öneri veya temel bulgu)
- Paragraflar yerine madde işaretleri kullan
- Yalnızca karar sürücü metrikleri dahil et
- 2 sayfanın altında tut
- Net sonraki adımlarla bitir

**Teknik hedef kitle:**
- Metodoloji ile başla
- Detaylı veri ve analiz dahil et
- Çalışmanı göster (sonuçlara nasıl ulaştığını)
- Uyarılar ve sınırlamalar dahil et
- Kaynak dosyalara referans ver

**Müşteri hedef kitle:**
- Onlar için önemli olanla başla (sonuçlar, yatırım getirisi, etki)
- Senin değil onların dilini kullan
- Rakamları bağlama oturt ("+%15 vs sektör ortalaması +%3")
- Görsel formatlama kullan (tablolar, kalın anahtar rakamlar)
- Sırada ne olduğuyla bitir

### Adım 4: Raporu yaz

```markdown
# [Rapor Başlığı]

**Tarih:** [tarih]
**Hazırlanan:** [hedef kitle]

---

## Özet

[2-3 cümle: temel bulgu, çekirdek öneri, alt satır]

## Temel Bulgular

### [Bulgu 1]
[Veri, bağlam, önem]

### [Bulgu 2]
[Veri, bağlam, önem]

### [Bulgu 3]
[Veri, bağlam, önem]

## Analiz

[Daha derin yorumlama — bulguların ne anlama geldiği, kalıplar, karşılaştırmalar]

## Öneriler

1. **[Eylem]** — [gerekçe ve beklenen etki]
2. **[Eylem]** — [gerekçe ve beklenen etki]
3. **[Eylem]** — [gerekçe ve beklenen etki]

## Sonraki Adımlar

- [ ] [Sorumlu/zaman çizelgesi ile belirli eylem]

---
Kaynaklar: [kullanılan veri kaynaklarını listele]
```

### Adım 5: Kalite kontrolü

Teslim etmeden önce doğrula:
- [ ] Her iddianın destekleyici verisi var
- [ ] Hedef kitlenin anlamayacağı jargon yok
- [ ] Öneriler eyleme dönüştürülebilir (belirsiz değil)
- [ ] Rakamlar rapor boyunca tutarlı
- [ ] Rapor "ee ne olmuş?" sorusunu yanıtlıyor — sadece "ne" değil

`reports/[konu]-report.md` dosyasına kaydet ve bir özet çıktıla.
