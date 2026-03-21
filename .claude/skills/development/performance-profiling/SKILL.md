---
description: Analyze and produce a performance profiling with structured process, quality checks, and system integration
---

# Performance Profiling

## Amaç

Eyleme dönüştürülebilir, ölçülebilir sonuçlar sunan kapsamlı bir performance profiling analiz edin ve üretin. Bu beceri, her seferinde profesyonel düzeyde çıktı sağlayan, kalite doğrulamalı yapılandırılmış bir süreç sunar.

**Kategori**: Yazılım Geliştirme

## Girdiler

### Zorunlu
- **Hedef**: Bu çıktı ile neyi başarmak istiyorsunuz
- **Codebase Bağlamı**: Dil, framework ve mimari

### İsteğe Bağlı
- **Kısıtlamalar**: Performans gereksinimleri, uyumluluk ihtiyaçları
- **Takım Standartları**: Mevcut kodlama kuralları veya stil rehberleri

## Sistem Bağlamı

Başlamadan önce:
- Mevcut proje bağlamı ve öncelikleri için `memory.md`'yi oku
- İlgili öğrenilmiş kurallar veya kısıtlamalar için `knowledge-base.md`'yi kontrol et
- Projedeki mevcut ilgili belgeleri gözden geçir
- Bu çıktı ile ilgili `Task Board.md`'deki aktif görevleri not et

## Süreç

### Adım 1: Bağlam ve Araştırma
- Projedeki mevcut performance profiling belgelerini gözden geçir
- İlgili öğrenilmiş kurallar veya kısıtlamalar için `knowledge-base.md`'yi kontrol et
- Mevcut proje bağlamı ve öncelikleri için `memory.md`'yi kontrol et
- Kilit paydaşları ve gereksinimlerini belirle
- En uygun çerçeveyi seç: Clean Architecture, SOLID Principles, TDD/BDD

### Adım 2: Analiz ve Çerçeve Uygulaması
- performance profiling yapılandırmak için seçilen çerçeveyi uygula
- Boşlukları, fırsatları ve riskleri belirle
- Başarı metriklerini tanımla: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Mean Time to Recovery (MTTR)
- Varsayımları ve bağımlılıkları belgele
- Yaklaşımı sektör en iyi uygulamalarına göre doğrula

### Adım 3: Çıktıyı Oluştur
- performance profiling aşağıdaki çıktı formatını kullanarak yapılandır
- Genel tavsiyeler değil, spesifik ve eyleme dönüştürülebilir öneriler ekle
- Uygulanabilir yerlerde somut rakamlar, zaman çizelgeleri ve kıyaslamalar ekle
- Tutarlılık için mevcut proje belgeleriyle çapraz referans yap
- Her bölümün değer kattığından emin ol — dolgu içeriği çıkar

### Adım 4: Kalite Doğrulama
- [ ] Tüm zorunlu girdiler ele alındı
- [ ] Öneriler spesifik ve eyleme dönüştürülebilir (belirsiz değil)
- [ ] Rakamlar ve kıyaslamalar gerçekçi ve kaynaklı
- [ ] Çıktı formatı aşağıdaki spesifikasyona uyuyor
- [ ] Bilgi tabanı kurallarıyla çelişki yok
- [ ] En iyi pratiği izliyor: Code reviews within 24 hours

## Çıktı Formatı

```markdown
# Performance Profiling

## Yönetici Özeti
[Çıktının ve temel önerilerin 2-3 cümlelik özeti]

## Bağlam ve Hedefler
- **Hedef**: [Bunun neyi başardığı]
- **Hedef Kitle**: [Bunun kimin için olduğu]
- **Zaman Çizelgesi**: [Bunun ne zaman geçerli olduğu]

## Analiz
[Seçilen çerçeve kullanılarak yapılandırılmış analiz]

## Öneriler
1. [Beklenen etkisiyle spesifik, eyleme dönüştürülebilir öneri]
2. [Beklenen etkisiyle spesifik, eyleme dönüştürülebilir öneri]
3. [Beklenen etkisiyle spesifik, eyleme dönüştürülebilir öneri]

## Uygulama
| Eylem | Sorumlu | Zaman Çizelgesi | Öncelik |
|--------|-------|----------|----------|
| [Eylem maddesi] | [Kim] | [Ne zaman] | [Yüksek/Orta/Düşük] |

## Başarı Metrikleri
| Metrik | Mevcut | Hedef | Ölçüm Yöntemi |
|--------|---------|--------|-------------------|
| [KPI] | [Başlangıç] | [Hedef] | [Nasıl ölçülür] |

## Riskler ve Azaltmalar
| Risk | Olasılık | Etki | Azaltma |
|------|-----------|--------|------------|
| [Risk] | [Y/O/D] | [Y/O/D] | [Eylem] |

## Sonraki Adımlar
- [ ] [Hemen yapılacak eylem]
- [ ] [Takip eylemi]
- [ ] [Gözden geçirme tarihi]
```

## Uygulanabilir Çerçeveler
- Clean Architecture
- SOLID Principles
- TDD/BDD
- 12-Factor App
- GitFlow/Trunk-Based Development
- Microservices vs Monolith decision tree
- OWASP Top 10

## Temel Metrikler
- Deployment Frequency
- Lead Time for Changes
- Change Failure Rate
- Mean Time to Recovery (MTTR)
- Code Coverage
- Cyclomatic Complexity
- Technical Debt Ratio

## En İyi Pratikler
- Code reviews within 24 hours
- Every PR should be reviewable in under 30 minutes
- Write tests before fixing bugs
- Automate everything that runs more than twice
- Document decisions, not just code

## Tamamlandıktan Sonra

- Bu çıktı proje bağlamını veya önceliklerini değiştiriyorsa `memory.md`'yi güncelle
- Yeniden kullanılabilir öğrenmeleri `knowledge-nominations.md`'ye ekle
- Takip eylemleri belirlendiyse bunları `Task Board.md`'ye ekle
- Ek çalışma gerekiyorsa ilgili skill'leri öner
