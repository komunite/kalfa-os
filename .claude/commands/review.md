---
description: Derinlemesine kod incelemesi - güvenlik, performans, mimari ve eyleme dönüştürülebilir düzeltmeler
argument-hint: "[dosya, dizin veya PR]"
allowed-tools:
  - Read
  - Agent
  - Glob
  - Grep
  - Bash(git diff:*, git log:*, git show:*)
---

Kapsamlı kod incelemesi. Stilin ötesine geçer — güvenlik, performans, mimari kontrol eder ve eyleme dönüştürülebilir iyileştirme önerileri üretir.

## Adımlar

### Adım 1: Kapsamı belirle

Neyin inceleneceğini belirle:
- Kullanıcı bir dosya veya dizin belirttiyse → onu incele
- Kullanıcı bir PR veya branch belirttiyse → `git diff main...HEAD` (veya uygun base)
- Hiçbir şey belirtilmediyse → aşamalı değişiklikleri (`git diff --cached`) veya son commit'leri incele

### Adım 2: Kodu oku

Kapsamdaki tüm dosyaları oku. Büyük diff'ler için şunlara odaklan:
- Yeni dosyalar (en yüksek risk — önceki inceleme yok)
- En çok değişiklik yapılan dosyalar
- Test dosyaları (veya eksiklikleri)

### Adım 3: Çok boyutlu inceleme (paralel agent'lar)

Paralel inceleme agent'ları başlat:

**Agent 1 — Güvenlik incelemesi:**
- Girdi doğrulama (SQL injection, XSS, komut enjeksiyonu)
- Kimlik doğrulama / yetkilendirme boşlukları
- Kodda gizli anahtarlar veya kimlik bilgileri
- Güvensiz bağımlılıklar
- OWASP İlk 10 kontrol listesi

**Agent 2 — Performans incelemesi:**
- N+1 sorguları veya gereksiz veritabanı çağrıları
- Eksik indeksler (şema görünüyorsa)
- Sınırsız döngüler veya özyineleme
- Büyük bellek tahsisleri
- Eksik önbellekleme fırsatları
- Gereksiz yeniden render'lar (React) veya yeniden hesaplamalar

**Agent 3 — Mimari inceleme:**
- Bu, kod tabanındaki mevcut kalıpları takip ediyor mu?
- Sorumluluk açıkça ayrılmış mı?
- Döngüsel bağımlılıklar var mı?
- Soyutlama seviyesi uygun mu? (aşırı mühendislik veya yetersiz soyutlama)
- Test etmek, debug etmek ve bakımını yapmak kolay olacak mı?

### Adım 4: Bulguları derle

Her bulguyu kategorize et:

| Önem | Anlam |
|------|-------|
| **CRITICAL** | Merge öncesi düzeltilmeli — güvenlik açığı, veri kaybı riski, kırıcı hata |
| **HIGH** | Düzeltilmeli — performans sorunu, mimari endişe, bakım zorluğu |
| **MEDIUM** | Düzeltmeyi değerlendir — kod kokusu, küçük verimsizlik, okunabilirlik iyileştirmesi |
| **LOW** | Detay — stil tercihi, isimlendirme önerisi, yorum iyileştirmesi |

### Adım 5: İncelemeyi oluştur

Yapılandırılmış bir inceleme çıktıla:

```markdown
## Kod İncelemesi — [kapsam]

### Özet
[1-2 cümle: genel değerlendirme ve en önemli endişe]

### Kritik Sorunlar
- **[Dosya:satır]** — [sorun ve neden önemli]
  **Düzeltme:** [belirli kod önerisi]

### Yüksek Öncelik
- **[Dosya:satır]** — [sorun]
  **Düzeltme:** [öneri]

### Orta Öncelik
- [maddeler]

### İyi Olan
- [iyi yapılan belirli şeyler — her zaman olumlu şeyler dahil et]

### Karar
[ONAYLA / DEĞİŞİKLİKLE ONAYLA / DEĞİŞİKLİK İSTE]
[Bir cümle gerekçe]
```

### Adım 6: Düzeltmeyi öner

Kullanıcıya sor: "Kritik ve yüksek öncelikli sorunları şimdi düzeltmemi ister misiniz?"

Evet ise, düzeltmeleri doğrudan uygula. Hayır ise, inceleme belgeleme olarak kalır.
