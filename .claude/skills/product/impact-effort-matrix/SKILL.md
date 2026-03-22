---
description: Create a impact effort matrix with structured process, quality checks, and system integration
---

# Impact Effort Matrix

## Amaç

Eyleme dönüştürülebilir, ölçülebilir sonuçlar sunan kapsamlı bir impact effort matrix oluşturun. Bu beceri, her seferinde profesyonel düzeyde çıktı sağlayan, kalite doğrulamalı yapılandırılmış bir süreç sunar.

**Kategori**: Ürün Yönetimi Management

## Girdiler

### Zorunlu
- **Hedef**: Bu çıktı ile neyi başarmak istiyorsunuz
- **Product/Feature**: What product or feature this relates to

### İsteğe Bağlı
- **User Research**: Existing insights or data
- **Constraints**: Technical, timeline, or resource limitations

## Sistem Bağlamı

Başlamadan önce:
- Mevcut proje bağlamı ve öncelikleri için `memory.md`'yi oku
- İlgili öğrenilmiş kurallar veya kısıtlamalar için `knowledge-base.md`'yi kontrol et
- Projedeki mevcut ilgili belgeleri gözden geçir
- Bu çıktı ile ilgili `.claude/workspace/TaskBoard.md`'deki aktif görevleri not et

## Süreç

### Adım 1: Bağlam ve Araştırma
- Projedeki mevcut impact effort matrix belgelerini gözden geçir
- İlgili öğrenilmiş kurallar veya kısıtlamalar için `knowledge-base.md`'yi kontrol et
- Mevcut proje bağlamı ve öncelikleri için `memory.md`'yi kontrol et
- Kilit paydaşları ve gereksinimlerini belirle
- En uygun çerçeveyi seç: Jobs To Be Done, Kano Model, RICE Scoring

### Adım 2: Analiz ve Çerçeve Uygulaması
- impact effort matrix yapılandırmak için seçilen çerçeveyi uygula
- Boşlukları, fırsatları ve riskleri belirle
- Başarı metriklerini tanımla: Activation Rate, Feature Adoption, Daily/Monthly Active Users, Retention (D1/D7/D30)
- Varsayımları ve bağımlılıkları belgele
- Yaklaşımı sektör en iyi uygulamalarına göre doğrula

### Adım 3: Çıktıyı Oluştur
- impact effort matrix aşağıdaki çıktı formatını kullanarak yapılandır
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
- [ ] En iyi pratiği izliyor: Talk to 5 users before building anything

## Çıktı Formatı

```markdown
# Impact Effort Matrix

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
- Jobs To Be Done
- Kano Model
- RICE Scoring
- MoSCoW Prioritization
- Double Diamond
- Build-Measure-Learn
- Product-Led Growth
- AARRR (Pirate Metrics)

## Temel Metrikler
- Activation Rate
- Feature Adoption
- Daily/Monthly Active Users
- Retention (D1/D7/D30)
- Net Revenue Retention
- Time to Value
- Customer Effort Score

## En İyi Pratikler
- Talk to 5 users before building anything
- One metric that matters per quarter
- Ship small and iterate — 2-week max cycles
- Always define success criteria before building
- Kill features that less than 10% of users use

## Tamamlandıktan Sonra

- Bu çıktı proje bağlamını veya önceliklerini değiştiriyorsa `memory.md`'yi güncelle
- Yeniden kullanılabilir öğrenmeleri `knowledge-nominations.md`'ye ekle
- Takip eylemleri belirlendiyse bunları `.claude/workspace/TaskBoard.md`'ye ekle
- Ek çalışma gerekiyorsa ilgili skill'leri öner
