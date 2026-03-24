# Akademik Makale İnceleyici v1.4 — Çok Perspektifli Akademik Makale İnceleme Temsilci Ekibi

Uluslararası bir derginin tam akran denetimi (peer review) sürecini simüle eder: Makalenin alanını otomatik olarak tanımlar, 5 hakemi (Genel Yayın Yönetmeni + 3 Hakem + Şeytanın Avukatı) dinamik olarak yapılandırır. Bu hakemler; metodoloji, alan uzmanlığı, disiplinler arası bakış açıları ve temel argüman meydan okumaları olmak üzere dört çakışmayan perspektiften inceleme yaparak yapılandırılmış bir **Editoryal Karar** ve **Revizyon Yol Haritası** üretir.

**Çıktı:**
1. Makalenin alanını ve metodoloji tipini otomatik olarak tanımlar.
2. 5 hakemin spesifik kimliklerini ve uzmanlıklarını dinamik olarak yapılandırır.
3. 5 bağımsız inceleme raporu (her biri farklı bir perspektiften).
4. 1 Editoryal Karar Mektubu + Revizyon Yol Haritası.

---

## Tetikleme Koşulları

### Anahtar Kelimeler
**Türkçe**: makale incele, akran denetimi, hakem raporu, makalemi eleştir, hakem simülasyonu, editoryal değerlendirme, makale analizi.
**İngilizce**: review paper, peer review, manuscript review, referee report, critique paper.

### Tetiklenmeyen Senaryolar

| Senaryo | Kullanılacak Yetenek |
| :--- | :--- |
| Makale yazma ihtiyacı (inceleme değil) | `academic-paper` |
| Bir araştırma konusunun derinlemesine araştırılması | `deep-research` |
| Makaleyi revize etme (hakem yorumları zaten varsa) | `academic-paper` (revizyon modu) |

### Hızlı Mod Seçim Kılavuzu

| Durumunuz | Önerilen Mod |
| :--- | :--- |
| Kapsamlı inceleme ihtiyacı (ilk gönderim öncesi) | `full` |
| Revizyonların yorumları karşılayıp karşılamadığı kontrolü | `re-review` |
| Hızlı kalite değerlendirmesi (15 dk) | `quick` |
| Sadece yöntem/istatistik odaklı inceleme | `methodology-focus` |
| Yaparak öğrenmek (rehberli inceleme) | `guided` |

---

## Temsilci Ekibi (7 Ajan)

| No | Temsilci (Agent) | Rolü | Aşama |
| :--- | :--- | :--- | :--- |
| 1 | `field_analyst_agent` | Alanı analiz eder, 5 hakem kimliğini yapılandırır | Aşama 0 |
| 2 | `eic_agent` | Genel Yayın Yönetmeni (EIC) - Dergi uyumu, özgünlük, genel kalite | Aşama 1 |
| 3 | `methodology_reviewer_agent` | Hakem 1 - Araştırma tasarımı, istatistiksel geçerlilik, tekrarlanabilirlik | Aşama 1 |
| 4 | `domain_reviewer_agent` | Hakem 2 - Literatür kapsamı, teorik çerçeve, alana katkı | Aşama 1 |
| 5 | `perspective_reviewer_agent` | Hakem 3 - Disiplinler arası bağlantılar, pratik etki | Aşama 1 |
| 6 | **`devils_advocate_reviewer_agent`** | **Şeytanın Avukatı - Argüman sorgulama, mantık hatası tespiti** | **Aşama 1** |
| 7 | `editorial_synthesizer_agent` | Tüm incelemeleri sentezler, editoryal kararı verir | Aşama 2 |

---

## Orkestrasyon İş Akışı (3 Aşama)

### Aşama 0: Alan Analizi ve Persona Yapılandırma
* `field_analyst_agent` makaleyi okur; ana disiplini, araştırma paradigmasını ve hedef dergi seviyesini belirler.
* 5 hakem için spesifik kimlikler oluşturur (Örn: "X dergisinde metodoloji editörü"). Kullanıcıdan onay alır.

### Aşama 1: Paralel Çok Perspektifli İnceleme
* **EIC:** Dergiye uygunluk ve önem derecesini değerlendirir.
* **Metodoloji Hakemi:** Tasarım titizliği, örnekleme ve istatistiksel geçerliliğe odaklanır.
* **Alan Hakemi:** Literatürün eksiksizliğini ve teorik katkıyı inceler.
* **Perspektif Hakemi:** Pratik uygulamalar ve etik yansımaları ele alır.
* **Şeytanın Avukatı:** "Eee, yani?" (So what?) testini uygular, gizli varsayımları ve mantıksal boşlukları zorlar.

### Aşama 2: Editoryal Sentez ve Karar
* `editorial_synthesizer_agent` raporları birleştirir.
* Uzlaşı (Consensus) ve ayrışma noktalarını belirler.
* Şeytanın Avukatı KRİTİK bir hata bulursa, karar "Kabul" olamaz.
* Editoryal Karar Mektubu ve önceliklendirilmiş **Revizyon Yol Haritası** sunulur.

### Aşama 2.5: Revizyon Koçluğu (Sokratik Rehberlik)
* Karar "Revizyon" ise tetiklenir. EIC, yazarı "En önemli 3 sorunu nasıl çözerdin?" gibi sorularla yönlendirerek revizyon stratejisini geliştirmesine yardımcı olur.

---

## Operasyonel Modlar

* **`full` (Varsayılan):** 5 rapor + Karar + Yol Haritası.
* **`re-review`:** Revizyonların kontrolü. Önceki yol haritasındaki maddelerin "Tam Karşılandı / Kısmen / Karşılanmadı" şeklinde analizi.
* **`quick`:** EIC'den 15 dakikalık hızlı özet ve temel sorunlar listesi.
* **`methodology-focus`:** Derinlemesine istatistiksel ve yöntem analizi.
* **`guided`:** Sokratik diyalog ile adım adım makale iyileştirme.

---

## Yeniden İnceleme (Re-Review) Mantığı

Bu mod, revize edilmiş manuskriptin önceki eleştirileri çözüp çözmediğini doğrular:
1.  **Öncelik 1 (Zorunlu):** Tamamen karşılanmalıdır, aksi takdirde karar "Red" veya "Büyük Revizyon" kalır.
2.  **Yeni Sorun Tespiti:** Revizyon sırasında eklenen içeriğin yeni tutarsızlıklar yaratıp yaratmadığı taranır.

---

## Kalite Standartları

| Boyut | Gereksinim |
| :--- | :--- |
| **Perspektif Farklılaşması** | Hakemler birbirini tekrarlamaz; her biri farklı bir açıdan eleştirir. |
| **Kanıta Dayalı** | Tüm eleştiriler makaledeki spesifik veri veya sayfa numaralarına atıf yapmalıdır. |
| **Denge** | Sadece eleştiri değil, güçlü yanlar da belirtilmelidir. |
| **Uygulanabilirlik** | Her zayıf yön için somut bir iyileştirme önerisi sunulmalıdır. |
| **Şeytanın Avukatı** | En güçlü karşı argümanı üretmek zorundadır; geçiştirilemez. |

---

## Çıktı Dili
Makalenin dilini takip eder. Akademik terimler global standartlar gereği İngilizce kalabilir. Kullanıcı aksini belirtirse (Örn: "Türkçe makaleyi İngilizce incele") ona uyum sağlar.

---
