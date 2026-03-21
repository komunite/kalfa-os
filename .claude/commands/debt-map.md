---
description: Kod tabanınızdaki teknik borcu haritalandır ve önceliklendir
argument-hint: "[dizin veya proje]"
allowed-tools:
  - Read
  - Agent
  - Glob
  - Grep
  - Bash(git log:*, wc:*, find:*)
---

Bir kod tabanını teknik borç için tara. Dosyaları karmaşıklık, test kapsamı, yaş ve bilinen sorunlara göre puanla. Önceliklendirilmiş borç ödeme planı çıkar.

## Adımlar

### Adım 1: Kapsamı tanımla

Kullanıcı bir dizin belirttiyse onu kullan. Aksi halde tüm projeyi tara (node_modules, .git, vendor, build dizinleri hariç).

### Adım 2: Otomatik taramalar (paralel agent'lar)

**Agent 1 — TODO/FIXME/HACK taraması:**
- TODO, FIXME, HACK, XXX, TEMP, WORKAROUND yorumlarını ara
- Her biri için: dosya, satır, içerik, yaş (git blame)
- Kategorize et: teknik borç, eksik özellik, bilinen hata, temizlik gerekli

**Agent 2 — Karmaşıklık noktaları:**
- En büyük dosyaları bul (satır sayısına göre)
- En derin iç içe geçmeye sahip dosyaları bul (karmaşıklık göstergesi)
- En çok fonksiyon/metoda sahip dosyaları bul
- En sık değiştirilen dosyaları belirle (`git log --format='' --name-only | sort | uniq -c | sort -rn | head -20`)
- Çapraz referans: HEM karmaşık HEM sık değiştirilen dosyalar en yüksek önceliktir

**Agent 3 — Kod sağlığı sinyalleri:**
- Kullanımdan kaldırılmış API kullanımını kontrol et (@deprecated, console.warn deprecation kalıpları için grep)
- Kullanılmayan dışa aktarımları veya ölü kod kalıplarını bul
- Bağımlılık sağlığını kontrol et (package.json / requirements.txt'deki güncel olmayan paketler)
- Tekrarlanan kod kalıplarını ara (benzer fonksiyon imzaları, kopyala-yapıştır göstergeleri)

### Adım 3: Her borç kalemini puanla

İki boyutta puanla:

**Etki (ne kadar zarar veriyor):**
- 3 = Kullanıcıları etkiliyor, hatalara neden oluyor, özellikleri engelliyor
- 2 = Geliştirmeyi yavaşlatıyor, değişiklikleri riskli yapıyor
- 1 = Kod kokusu, okunabilirlik sorunu, stil endişesi

**Çaba (düzeltmek ne kadar zor):**
- 3 = Büyük yeniden yapılandırma, birden fazla dosya, kırıcı değişiklikler
- 2 = Orta düzey iş, tek alanla sınırlı
- 1 = Hızlı düzeltme, bir saatin altında

**Öncelik = Etki / Çaba** — yüksek etki + düşük çaba = önce düzelt.

### Adım 4: Borç haritasını oluştur

```markdown
# Teknik Borç Haritası — [Proje]

**Tarih:** [tarih]
**Taranan dosyalar:** [sayı]
**Bulunan borç kalemleri:** [sayı]

## Özet
- **Kritik (şimdi düzelt):** [sayı]
- **Yüksek (bu sprint'te düzelt):** [sayı]
- **Orta (planla):** [sayı]
- **Düşük (uygun olduğunda):** [sayı]

## Sıcak Noktalar
En yoğun borca sahip dosyalar:

| Dosya | Borç Kalemleri | Karmaşıklık | Değişiklik Sıklığı | Öncelik |
|-------|---------------|-------------|--------------------|---------|
| [dosya] | [sayı] | [yüksek/orta/düşük] | [commit/ay] | Kritik |

## Borç Envanteri

### Kritik Öncelik
1. **[dosya:satır]** — [açıklama]
   - Etki: [3] / Çaba: [1]
   - Öneri: [belirli eylem]

### Yüksek Öncelik
[kalemler]

### Orta Öncelik
[kalemler]

### Düşük Öncelik
[kalemler]

## Ödeme Planı

### Bu Hafta
- [ ] [dosya referanslı belirli düzeltme]
- [ ] [belirli düzeltme]

### Bu Ay
- [ ] [daha büyük yeniden yapılandırma]
- [ ] [bağımlılık güncellemeleri]

### Bekleyen İşler
- [ ] [daha sonra planlanacak kalemler]

## İzlenecek Metrikler
- Toplam TODO/FIXME sayısı (şu anda: [X])
- Ortalama dosya karmaşıklık puanı
- Güncel olmayan bağımlılık sayısı (şu anda: [X])

---
İlerlemeyi takip etmek için bu komutu aylık çalıştırın.
```

Özeti ve önce düzeltilecek ilk 3 kalemi çıktıla.
