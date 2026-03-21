---
description: Derinlemesine rekabet analizi - araştır, karşılaştır, strateji belirle
argument-hint: "[ürününüz veya pazarınız]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Agent
  - Glob
  - WebSearch
  - WebFetch
  - Bash(date:*)
---

Derinlemesine rekabet istihbaratı. Rakipleri araştır, konumlandırma ve fiyatlandırmayı çıkar, stratejik karşılaştırma ve öneriler üret.

## Adımlar

### Adım 1: Rekabet çerçevesini tanımla

Netleştir:
- **Ürününüz/hizmetiniz:** Neyle rekabet ediyorsunuz?
- **Pazar kategorisi:** Hangi alandasınız?
- **Bilinen rakipler:** Kullanıcının zaten bildiği var mı?

### Adım 2: Rakipleri araştır (paralel agent'lar)

Paralel araştırma için 2-3 agent başlat:

**Agent 1 — Doğrudan rakipler:**
- Aynı kategorideki ürün/hizmetleri ara
- Her biri için: isim, URL, fiyatlandırma, temel özellikler, hedef müşteri, fonlama/büyüklük
- Açılış sayfalarına, fiyatlandırma sayfalarına, özellik sayfalarına bak

**Agent 2 — Yakın rakipler:**
- Aynı probleme alternatif yaklaşımları ara
- Bu alana genişleyebilecek bitişik kategorilerdeki ürünler
- Açık kaynak alternatifler

**Agent 3 — Pazar bağlamı:**
- Bu alandaki son haberler, lansmanlar, kapanışlar
- Analist raporları veya pazar büyüklüğü verileri
- Müşteri duyarlılığı (yorumlar, Reddit, Twitter)

### Adım 3: Karşılaştırma matrisini oluştur

Yapılandırılmış bir karşılaştırma oluştur:

| Boyut | Ürününüz | Rakip A | Rakip B | Rakip C |
|-------|----------|---------|---------|---------|
| **Fiyat** | | | | |
| **Hedef müşteri** | | | | |
| **Temel farklılaştırıcı** | | | | |
| **Güçlü yönler** | | | | |
| **Zayıf yönler** | | | | |
| **Özellik 1** | | | | |
| **Özellik 2** | | | | |

### Adım 4: Stratejik içgörüleri belirle

Karşılaştırmayı şunlar için analiz et:

**Kullanabileceğiniz boşluklar:**
- Rakiplerin eksik olduğu, müşterilerin istediği özellikler
- Kimsenin hizmet vermediği fiyat noktaları
- Göz ardı edilen müşteri segmentleri
- Kimsenin sahiplenmediği konumlandırma açıları

**İzlenmesi gereken tehditler:**
- Hamle yapan iyi fonlanmış rakipler
- Özellik yakınsaması (herkes aynı şeyi inşa ediyor)
- Platform riski (rakip olabilecek bir platforma bağımlılık)

**Eşsiz avantajlarınız:**
- Taklit edilmesi zor neye sahipsiniz?
- Hız, uzmanlık, ağ, veri, konumlandırma?

### Adım 5: Stratejik öneriler

Analize dayanarak:
1. **Konumlandırma önerisi:** Rakiplere karşı nasıl konumlanmalı
2. **Fiyatlandırma önerisi:** Nerede fiyatlandırmalı ve neden
3. **Özellik önceliği:** Rekabet boşluklarına göre ne inşa etmeli (ve etmemeli)
4. **Mesajlaşma:** Sizi farklılaştıran temel iddialar
5. **İzleme listesi:** Yakından izlenecek rakipler ve eylem tetikleyicileri

### Adım 6: İstihbarat raporunu yaz

`competitive-intel-[pazar].md` dosyasına kaydet:

```markdown
# Rekabet İstihbaratı — [Pazar/Ürün]

**Tarih:** [tarih]

## Pazar Genel Görünümü
[Rekabet ortamı hakkında 2-3 cümle]

## Rakip Profilleri

### [Rakip 1]
- **URL:** [url]
- **Fiyatlandırma:** [fiyatlandırma modeli ve aralığı]
- **Hedef:** [kime hizmet ettikleri]
- **Güçlü yönler:** [maddeler]
- **Zayıf yönler:** [maddeler]

[Her rakip için tekrarla]

## Karşılaştırma Matrisi
[Adım 3'teki tablo]

## Stratejik İçgörüler

### Kullanılabilecek Boşluklar
[maddeler]

### İzlenmesi Gereken Tehditler
[maddeler]

### Avantajlarınız
[maddeler]

## Öneriler
1. [Belirli, eyleme dönüştürülebilir öneri]
2. [Belirli, eyleme dönüştürülebilir öneri]
3. [Belirli, eyleme dönüştürülebilir öneri]

---
Kaynaklar: [kullanılan tüm URL'leri ve kaynakları listele]
```

Temel bulguların bir özetini ve en önemli öneriyi çıktıla.
