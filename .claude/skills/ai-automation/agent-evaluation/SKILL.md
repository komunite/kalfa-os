---
description: Yapılandırılmış süreç, kalite kontrolleri ve sistem entegrasyonu ile bir ajan değerlendirmesi analiz edin ve üretin
---

# Agent Evaluation

## Amaç

Eyleme dönüştürülebilir, ölçülebilir sonuçlar sunan kapsamlı bir ajan değerlendirmesi analiz edin ve üretin. Bu beceri, her seferinde profesyonel düzeyde çıktı sağlayan, kalite doğrulamalı yapılandırılmış bir süreç sunar.

**Kategori**: Yapay Zeka ve Otomasyon

## Girdiler

### Zorunlu
- **Hedef**: Bu çıktı ile neyi başarmak istiyorsunuz
- **Bağlam**: İlgili arka plan bilgileri

### İsteğe Bağlı
- **Kısıtlamalar**: Dikkate alınması gereken sınırlamalar veya gereksinimler
- **Mevcut Çalışma**: Üzerine inşa edilecek önceki belgeler veya veriler

## Sistem Bağlamı

Başlamadan önce:
- Mevcut proje bağlamı ve öncelikleri için `memory.md`'yi oku
- İlgili öğrenilmiş kurallar veya kısıtlamalar için `knowledge-base.md`'yi kontrol et
- Projedeki mevcut ilgili belgeleri gözden geçir
- Bu çıktı ile ilgili `.claude/workspace/TaskBoard.md`'deki aktif görevleri not et

## Süreç

### Adım 1: Bağlam ve Araştırma
- Projedeki mevcut ajan değerlendirmesi belgelerini gözden geçir
- İlgili öğrenilmiş kurallar veya kısıtlamalar için `knowledge-base.md`'yi kontrol et
- Mevcut proje bağlamı ve öncelikleri için `memory.md`'yi kontrol et
- Kilit paydaşları ve gereksinimlerini belirle
- En uygun çerçeveyi seç: AI Readiness Assessment, Automation ROI Calculator, Human-in-the-Loop Design

### Adım 2: Analiz ve Çerçeve Uygulaması
- Ajan değerlendirmesini yapılandırmak için seçilen çerçeveyi uygula
- Boşlukları, fırsatları ve riskleri belirle
- Başarı metriklerini tanımla: Time Saved Per Task, Automation Rate, Error Reduction %, Cost Per AI Operation
- Varsayımları ve bağımlılıkları belgele
- Yaklaşımı sektör en iyi uygulamalarına göre doğrula

### Adım 3: Çıktıyı Oluştur
- Ajan değerlendirmesini aşağıdaki çıktı formatını kullanarak yapılandır
- Genel tavsiyeler değil, spesifik ve eyleme dönüştürülebilir öneriler ekle
- Uygulanabilir yerlerde somut rakamlar, zaman çizelgeleri ve kıyaslamalar ekle
- Tutarlılık için mevcut proje belgeleriyle çapraz referans yap
- Her bölümün değer kattığından emin ol — dolgu içeriği kaldır

### Adım 4: Kalite Doğrulama
- [ ] Tüm zorunlu girdiler ele alındı
- [ ] Öneriler spesifik ve eyleme dönüştürülebilir (belirsiz değil)
- [ ] Rakamlar ve kıyaslamalar gerçekçi ve kaynaklı
- [ ] Çıktı formatı aşağıdaki spesifikasyona uyuyor
- [ ] knowledge-base kurallarıyla çelişki yok
- [ ] En iyi uygulamayı takip ediyor: Yüksek hacimli, düşük riskli görevlerle başla

## Çıktı Formatı

```markdown
# Agent Evaluation

## Yönetici Özeti
[Çıktının ve temel önerilerin 2-3 cümlelik özeti]

## Bağlam ve Hedefler
- **Hedef**: [Bunun neyi başardığı]
- **Hedef Kitle**: [Bunun kime yönelik olduğu]
- **Zaman Çizelgesi**: [Bunun ne zaman geçerli olduğu]

## Analiz
[Seçilen çerçeve kullanılarak yapılandırılmış analiz]

## Öneriler
1. [Beklenen etkisiyle birlikte spesifik, eyleme dönüştürülebilir öneri]
2. [Beklenen etkisiyle birlikte spesifik, eyleme dönüştürülebilir öneri]
3. [Beklenen etkisiyle birlikte spesifik, eyleme dönüştürülebilir öneri]

## Uygulama
| Eylem | Sorumlu | Zaman Çizelgesi | Öncelik |
|-------|---------|-----------------|---------|
| [Eylem maddesi] | [Kim] | [Ne zaman] | [Yüksek/Orta/Düşük] |

## Başarı Metrikleri
| Metrik | Mevcut | Hedef | Ölçüm Yöntemi |
|--------|--------|-------|---------------|
| [KPI] | [Başlangıç] | [Hedef] | [Nasıl ölçülecek] |

## Riskler ve Azaltmalar
| Risk | Olasılık | Etki | Azaltma |
|------|----------|------|---------|
| [Risk] | [Y/O/D] | [Y/O/D] | [Eylem] |

## Sonraki Adımlar
- [ ] [Acil sonraki eylem]
- [ ] [Takip eylemi]
- [ ] [Gözden geçirme tarihi]
```

## Uygulanabilir Çerçeveler
- AI Readiness Assessment
- Automation ROI Calculator
- Human-in-the-Loop Design
- RAG Architecture
- Agent Orchestration Patterns
- Responsible AI Framework

## Temel Metrikler
- Time Saved Per Task
- Automation Rate
- Error Reduction %
- Cost Per AI Operation
- User Adoption Rate
- Output Quality Score

## En İyi Pratikler
- Yüksek hacimli, düşük riskli görevlerle başla
- Kritik çıktılar için her zaman insan incelemesi yap
- Sadece doğruluğu değil, kazanılan zamanı ölç
- Promptları kod gibi sürüm kontrol et
- Sapma ve bozulma için aylık izleme yap

## Tamamlandıktan Sonra

- Bu çıktı proje bağlamını veya önceliklerini değiştiriyorsa `memory.md`'yi güncelle
- Yeniden kullanılabilir öğrenimleri `knowledge-nominations.md`'ye ekle
- Takip eylemleri belirlendiyse, bunları `.claude/workspace/TaskBoard.md`'ye ekle
- Ek çalışma gerekiyorsa ilgili becerileri öner
