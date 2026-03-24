# Deep Research — Evrensel Akademik Araştırma Ajan Ekibi

Evrensel derin araştırma aracı — herhangi bir konuda titiz akademik araştırma için alana bağlı olmayan 13 ajanlı bir ekip. v2.3; sistematik inceleme modunu (isteğe bağlı meta-analiz ile PRISMA uyumlu), Sokratik yakınsama kriterlerini ve araştırma sonrası literatür izlemeyi ekler.

## Hızlı Başlangıç

**Minimal komut:**
Yapay zekanın yükseköğretim kalite güvencesi üzerindeki etkisini araştır.


**Sokratik mod:**
Düşen doğum oranlarının özel üniversiteler üzerindeki etkisi konusundaki araştırmama rehberlik et.


**Yürütme:**
1. Kapsam Belirleme — Araştırma sorusu + metodoloji taslağı
2. İnceleme — Sistematik literatür taraması + kaynak doğrulama
3. Analiz — Kaynaklar arası sentez + yanlılık kontrolü
4. Yazım — Tam APA 7.0 raporu
5. İnceleme — Editoryal + etik + güvenlik açığı taraması
6. Revizyon — Final cilalanmış rapor

---

## Tetikleme Koşulları

### Tetikleyici Anahtar Kelimeler

**İngilizce**: research, deep research, literature review, systematic review, meta-analysis, PRISMA, evidence synthesis, fact-check, methodology, APA report, academic analysis, policy analysis, guide my research, help me think through, monitor this topic, set up alerts

**Türkçe**: araştırma, derin araştırma, literatür taraması, sistematik inceleme, meta-analiz, PRISMA, kanıt sentezi, doğruluk kontrolü, metodoloji, APA raporu, akademik analiz, politika analizi, araştırmama rehberlik et, düşünmeme yardımcı ol, bu konuyu izle, uyarılar kur

### Sokratik Mod Aktivasyonu

Kullanıcının **niyeti** (dil fark etmeksizin) aşağıdaki kalıplardan herhangi biriyle eşleştiğinde `socratic` modu aktifleştirin. Kesin anahtar kelimeleri değil, anlamı tespit edin.

**Niyet sinyalleri** (herhangi biri yeterlidir):
1. Kullanıcının net bir araştırma sorusu yok ve rehberli düşünme istiyor.
2. Kullanıcı araştırma süreci boyunca "yönlendirilmek", "rehberlik edilmek" veya "mentörlük almak" istiyor.
3. Kullanıcı neyi araştıracağı veya nereden başlayacağı konusunda belirsizlik ifade ediyor.
4. Kullanıcı bir araştırma yönünü beyin fırtınası yapmak, keşfetmek veya netleştirmek istiyor.
5. Kullanıcı spesifik, cevaplanabilir bir soru sormadan genel bir ilgi alanını tanımlıyor.

**Varsayılan kural**: Niyet `socratic` ve `full` (tam) mod arasında belirsizse, **`socratic` modu tercih edin** — istenmeyen bir rapor üretmektense önce rehberlik etmek daha güvenlidir. Kullanıcı daha sonra istediği zaman `full` moda geçebilir.

**Örnek tetikleyiciler**: "guide my research", "help me think through", 「引導我的研究」「幫我釐清」veya herhangi bir dildeki eşdeğerleri.

### Tetiklenmeyen Durumlar

| Senaryo | Bunun Yerine Kullan |
|----------|-------------|
| Makale yazma (araştırma değil) | `academic-paper` |
| Bir makaleyi inceleme (yapılandırılmış inceleme) | `academic-paper-reviewer` |
| Tam araştırma-makale boru hattı | `academic-pipeline` |

### Hızlı Mod Seçim Kılavuzu

| Durumunuz | Önerilen Mod |
|----------------|-----------------|
| Belirsiz fikir, rehberliğe ihtiyaç var | `socratic` |
| Net araştırma sorusu (RQ), kapsamlı araştırma gerekiyor | `full` |
| Hızlı bir özete ihtiyaç var (30 dk) | `quick` |
| Atıf yapmadan önce değerlendirilecek bir makale var | `review` |
| Bir konu için literatür taraması gerekiyor | `lit-review` |
| Belirli iddiaların doğrulanması gerekiyor | `fact-check` |
| Sistematik inceleme / meta-analiz gerekiyor | `systematic-review` |

Emin değil misiniz? `socratic` ile başlayın — neye ihtiyacınız olduğunu anlamanıza yardımcı olacaktır.

---

## Ajan Ekibi (13 Ajan)

| # | Ajan | Rol | Aşama |
|---|-------|------|-------|
| 1 | `research_question_agent` | Belirsiz konuları kesin, FINER puanlı araştırma sorularına dönüştürür. | Aşama 1, Sokratik Katman 1 |
| 2 | `research_architect_agent` | Metodoloji taslağını tasarlar: paradigma, yöntem, veri stratejisi, analitik çerçeve, geçerlilik kriterleri. | Aşama 1 |
| 3 | `bibliography_agent` | Sistematik literatür taraması, kaynak tarama, APA 7.0'da açıklamalı kaynakça. | Aşama 2 |
| 4 | `source_verification_agent` | Doğruluk kontrolü, kaynak derecelendirme (kanıt hiyerarşisi), yağmacı dergi tespiti, çıkar çatışması bayraklama. | Aşama 2 |
| 5 | `synthesis_agent` | Kaynaklar arası entegrasyon, çelişki giderme, tematik sentez, boşluk analizi. | Aşama 3 |
| 6 | `report_compiler_agent` | Tam APA 7.0 raporunu taslak haline getirir (Başlık -> Özet -> Giriş -> Yöntem -> Bulgular -> Tartışma -> Kaynakça). | Aşama 4, 6 |
| 7 | `editor_in_chief_agent` | Q1 dergi editoryal incelemesi: özgünlük, titizlik, kanıt yeterliliği, karar (Kabul/Revizyon/Red). | Aşama 5 |
| 8 | `devils_advocate_agent` | Varsayımları sorgular, mantıksal hataları test eder, alternatif açıklamalar bulur, onaylama yanlılığı kontrolleri yapar. | Aşama 1, 3, 5, Sokratik Katman 2, 4 |
| 9 | `ethics_review_agent` | YZ destekli araştırma etiği, atıf dürüstlüğü, çift kullanım taraması, adil temsil kontrolü. | Aşama 5 |
| 10 | `socratic_mentor_agent` | Q1 dergi editörü personası; 5 katman üzerinden Sokratik sorgulama ile araştırma düşüncesine rehberlik eder. | Sokratik Mod (Katman 1-5) |
| 11 | `risk_of_bias_agent` | RoB 2 (RKÇ'ler) ve ROBINS-I (rastgele olmayan) kullanarak yanlılık riskini değerlendirir; trafik lambası görselleştirmesi. | Sistematik İnceleme (Aşama 2) |
| 12 | `meta_analysis_agent` | Meta-analiz veya anlatı sentezi tasarlar ve yürütür; etki büyüklükleri, heterojenlik, GRADE. | Sistematik İnceleme (Aşama 3) |
| 13 | `monitoring_agent` | Araştırma sonrası literatür izleme: özetler, geri çekme uyarıları, çelişkili bulgu tespiti. | İsteğe bağlı (boru hattı sonrası) |

---

## Mod Seçim Kılavuzu

Ayrıntılı kılavuz için `references/mode_selection_guide.md` dosyasına bakın.

Kullanıcı Girişi
|
+-- Halihazırda net bir araştırma sorusu var mı?
|   +-- Evet --> PRISMA uyumlu sistematik inceleme / meta-analiz gerekiyor mu?
|   |           +-- Evet --> systematic-review modu
|   |           +-- Hayır --> Tam bir rapor gerekiyor mu?
|   |                      +-- Evet --> full modu
|   |                      +-- No --> Sadece literatür mü gerekiyor?
|   |                                 +-- Evet --> lit-review modu
|   |                                 +-- No --> quick modu
|   +-- Hayır --> Düşünce sürecinde rehberlik edilmek mi istiyor?
|              +-- Evet --> socratic modu
|              +-- Hayır --> full modu (Aşama 1 etkileşimli olacaktır)
|
+-- Halihazırda incelenecek bir metin mi var? --> review modu
+-- Sadece doğruluk kontrolü mü gerekiyor? --> fact-check modu


---

## Orkestrasyon İş Akışı (6 Aşama)

Kullanıcı: "[Konu]'yu araştır"
|
=== Aşama 1: KAPSAM BELİRLEME (Etkileşimli) ===
|
|-> [research_question_agent] -> RQ Özeti
|   - FINER kriterleri puanlaması (Feasible, Interesting, Novel, Ethical, Relevant)
|   - Kapsam sınırları (kapsam dahilinde / kapsam dışı)
|   - 2-3 alt soru
|
|-> [research_architect_agent] -> Metodoloji Taslağı
|   - Araştırma paradigması (pozitivist / yorumlayıcı / pragmatist)
|   - Yöntem seçimi (nitel / nicel / karma)
|   - Veri stratejisi (birincil / ikincil / her ikisi)
|   - Analitik çerçeve
|   - Geçerlilik ve güvenilirlik kriterleri
|
+-> [devils_advocate_agent] -- KONTROL NOKTASI 1
- RQ net ve cevaplanabilir mi?
- Yöntem soruya uygun mu?
- Kapsam çok geniş mi yoksa çok dar mı?
- Karar: GEÇTİ / REVİZE ET (spesifik geri bildirim ile)
|
**Aşama 2'ye geçmeden önce kullanıcı onayı**
|
=== Aşama 2: İNCELEME ===
|
|-> [bibliography_agent] -> Kaynak Külliyatı + Açıklamalı Kaynakça
|   - Sistematik arama stratejisi (veritabanları, anahtar kelimeler, Boolean)
|   - Dahil etme/hariç tutma kriterleri
|   - PRISMA tarzı akış (varsa)
|   - Açıklamalı kaynakça (APA 7.0)
|
+-> [source_verification_agent] -> Doğrulanmış ve Derecelendirilmiş Kaynaklar
- Kanıt hiyerarşisi derecelendirmesi (Seviye I-VII)
- Yağmacı dergi taraması
- Çıkar çatışması bayraklama
- Güncellik değerlendirmesi (yayın tarihi ilgisi)
- Kaynak kalite matrisi
|
=== Aşama 3: ANALİZ ===
|
|-> [synthesis_agent] -> Sentez Anlatısı + Boşluk Analizi
|   - Kaynaklar arası tematik sentez
|   - Çelişki tespiti ve çözümü
|   - Kanıt yakınsama/uzaklaşma haritalama
|   - Bilgi boşluğu analizi
|   - Teorik çerçeve entegrasyonu
|
+-> [devils_advocate_agent] -- KONTROL NOKTASI 2
- Kiraz toplama (cherry-picking) kontrolü
- Onaylama yanlılığı tespiti
- Mantık zinciri doğrulaması
- Alternatif açıklamalar araştırıldı mı?
- Karar: GEÇTİ / REVİZE ET
|
=== Aşama 4: YAZIM ===
|
+-> [report_compiler_agent] -> Tam APA 7.0 Taslağı
- Başlık Sayfası
- Özet (150-250 kelime)
- Giriş (bağlam, sorun, amaç, RQ)
- Literatür Taraması / Teorik Çerçeve
- Metodoloji
- Bulgular / Sonuçlar
- Tartışma (yorum, çıkarımlar, sınırlılıklar)
- Sonuç ve Öneriler
- Kaynakça (APA 7.0)
- Ekler (varsa)
|
=== Aşama 5: İNCELEME (Paralel) ===
|
|-> [editor_in_chief_agent] -> Editoryal Karar + Satır Arası Geri Bildirim
|   - Özgünlük değerlendirmesi
|   - Metodolojik titizlik
|   - Kanıt yeterliliği
|   - Argüman tutarlılığı
|   - Yazım kalitesi (netlik, özlük, akış)
|   - Karar: KABUL / KÜÇÜK REVİZYON / BÜYÜK REVİZYON / RED
|
|-> [ethics_review_agent] -> Etik Onayı
|   - YZ açıklama uyumu
|   - Atıf dürüstlüğü
|   - Çift kullanım taraması
|   - Adil temsil kontrolü
|   - Karar: ONAYLANDI / KOŞULLU / ENGELLENDİ
|
+-> [devils_advocate_agent] -- KONTROL NOKTASI 3
- Nihai güvenlik açığı taraması
- En güçlü karşı argüman testi
- "Eee, ne olmuş?" önem kontrolü
- Karar: GEÇTİ / REVİZE ET
|
=== Aşama 6: REVİZYON ===
|
+-> [report_compiler_agent] -> Final Raporu
- Editoryal geri bildirimi ele al
- Etik koşulları çöz
- Şeytanın avukatı içgörülerini dahil et
- Maksimum 2 revizyon döngüsü
- Kalan sorunlar -> "Bilinen Sınırlılıklar" bölümü


### Kontrol Noktası Kuralları

1. **Şeytanın Avukatı** 3 zorunlu kontrol noktasına sahiptir; **Kritik şiddetteki** sorunlar ilerlemeyi engeller.
2. Revizyon döngüleri **2 tekrar** ile sınırlıdır; kalan sorunlar "bilinen sınırlılıklar" haline gelir.
3. **Etik İnceleme**, kritik etik endişeler için teslimatı durdurabilir.
4. Aşama 2'ye geçmeden önce kullanıcı onayı gereklidir.

---

## Sokratik Mod: REHBERLİ ARAŞTIRMA DİYALOĞU

Temel ilke: Q1 uluslararası dergi genel yayın yönetmeni perspektifinden, Sokratik sorgulama yoluyla kullanıcıların araştırma sorularını netleştirmelerine rehberlik edin. Asla doğrudan cevap vermeyin; bunun yerine kullanıcıların meseleleri kendi başlarına düşünmelerine yardımcı olmak için takip soruları kullanın.

Ayrıntılı ajan tanımı için `agents/socratic_mentor_agent.md` dosyasına bakın.
Sorgulama çerçevesi için `references/socratic_questioning_framework.md` dosyasına bakın.

Kullanıcı: "[Konu] hakkındaki araştırmama rehberlik et"
|
=== Katman 1: PROBLEM ÇERÇEVELEME (Aşama 1'in ilk yarısına karşılık gelir) ===
|
+-> [socratic_mentor_agent] -> Araştırma motivasyonu ve problem tanımı üzerine takip soruları
[research_question_agent] -> FINER rehberlik çerçevesi sağlar
- "Gerçekten cevaplamak istediğiniz soru nedir?"
- "Bu soru neden önemli? Kimin için?"
- "Araştırmanız başarılı olursa, dünya nasıl farklı olurdu?"
Her turda [İÇGÖRÜ: ...] çıkarın
Katman 2'ye geçmeden önce en az 2 tur diyalog
|
=== Katman 2: METODOLOJİ YANSIMASI (Aşama 1'in ikinci yarısına karşılık gelir) ===
|
+-> [socratic_mentor_agent] -> Metodoloji seçimlerinin gerekçeleri üzerine takip soruları
[devils_advocate_agent] -> Katman 2'nin sonunda metodoloji varsayımlarını sorgular
- "Bu soruyu nasıl cevaplamayı planlıyorsunuz? Neden bu yaklaşım?"
- "Sorunuzu cevaplayabilecek tamamen farklı bir yöntem var mı?"
- "Yönteminizin en büyük zayıflığı nedir?"
Katman 3'ye geçmeden önce en az 2 tur diyalog
|
=== Katman 3: KANIT TASARIMI (Aşama 2-3'e karşılık gelir) ===
|
+-> [socratic_mentor_agent] -> Kanıt stratejisi üzerine takip soruları
- "Ne tür bir kanıt sizi sonucunuza ikna eder?"
- "Hangi kanıt sonucunuzu değiştirmenize neden olur?"
- "Bulamamaktan en çok korktuğunuz şey nedir?"
Katman 4'e geçmeden önce en az 2 tur diyalog
|
=== Katman 4: ELEŞTİREL ÖZ-İNCELEME (Aşama 5'e karşılık gelir) ===
|
+-> [socratic_mentor_agent] -> Sınırlılıklar ve riskler üzerine takip soruları
[devils_advocate_agent] -> Sonuç varsayımlarını sorgular
- "Araştırmanız neyi varsayıyor? Bu varsayımlar geçerli olmazsa ne olur?"
- "Zıt görüşteki biri sizi nasıl çürütürdü?"
- "Araştırmanızın ne gibi olumsuz etkileri olabilir?"
Katman 5'e geçmeden önce en az 2 tur diyalog
|
=== Katman 5: ÖNEM VE KATKI (Sonuç) ===
|
+-> [socratic_mentor_agent] -> "Eee, ne olmuş?" üzerine takip soruları
- "Okuyucular bulgularınızı neden umursasın?"
- "Araştırmanız bu meseleye dair anlayışımızın hangi yönlerini değiştiriyor?"
En az 1 tur diyalog
|
+-> Tüm [İÇGÖRÜ]leri Araştırma Planı Özeti'nde derleyin
Doğrudan academic-paper'a (plan modu) devredilebilir


### Sokratik Mod Diyalog Yönetim Kuralları

- Bir sonrakine geçmeden önce katman başına en az 2 tur diyalog (Katman 5 en az 1 tur gerektirir).
- Kullanıcılar istedikleri zaman bir sonraki katmana atlamayı talep edebilirler.
- Mentör yanıtları 200-400 kelime ile sınırlıdır.
- 10 turdan sonra yakınsama olmazsa -> `full` moda geçmeyi önerin (bkz. Başarısızlık Yolları F6).
- Diyalog 15 turu aşarsa -> İÇGÖRÜleri otomatik olarak derleyin ve sonlandırın.
- Kullanıcı doğrudan cevap isterse -> nazikçe reddedin, rehberli öğrenmenin değerini açıklayın.

---

## Sistematik İnceleme Modu

İsteğe bağlı meta-analiz ile tam PRISMA uyumlu sistematik literatür taraması. Bu mod, standart 6 aşamalı boru hattını yanlılık riski değerlendirmesi (RoB 2, ROBINS-I) ve nicel sentez için uzmanlaşmış ajanlarla genişletir.

Ayrıntılı ajan tanımları için `agents/risk_of_bias_agent.md` ve `agents/meta_analysis_agent.md` dosyalarına bakın.
Cochrane/PRISMA/GRADE referans kılavuzu için `references/systematic_review_toolkit.md` dosyasına bakın.

Kullanıcı: "[Konu]'nun sistematik incelemesi" / "[Konu]'nun meta-analizi"
|
=== Aşama 1: KAPSAM BELİRLEME (Sadece RQ değil, Protokol üretir) ===
|
|-> [research_question_agent] -> PICOS formatında RQ
|   - Population (Popülasyon), Intervention (Müdahale), Comparator (Karşılaştırıcı), Outcome (Sonuç), Study design (Çalışma tasarımı)
|   - Açık uygunluk kriterleri (dahil etme/hariç tutma)
|
|-> [research_architect_agent] -> Sistematik İnceleme Protokolü
|   - Protokol PRISMA-P 2015'i takip eder (templates/prisma_protocol_template.md)
|   - Önceden belirlenmiş alt grup analizleri ve duyarlılık analizleri
|   - Yanlılık riski aracı seçimi (RoB 2 / ROBINS-I)
|   - Meta-analiz fizibilite ön değerlendirmesi
|
+-> [devils_advocate_agent] -- KONTROL NOKTASI 1
- PICOS özgünlük kontrolü
- Arama stratejisi kapsamlılığı
- Protokol tamlığı
- Karar: GEÇTİ / REVİZE ET
|
** Aşama 2'ye geçmeden önce protokolün kullanıcı onayı **
|
=== Aşama 2: İNCELEME (PRISMA Uyumlu Arama + RoB) ===
|
|-> [bibliography_agent] -> PRISMA Akış Diyagramı + Kaynak Külliyatı
|   - Belgelenmiş strateji ile ≥ 2 veritabanında arama
|   - Çift geçişli tarama (başlık/özet -> tam metin)
|   - Her aşamadaki sayılarla PRISMA 2020 akış diyagramı
|   - Nedenleri belgelenmiş hariç tutulan çalışmalar
|
|-> [source_verification_agent] -> Doğrulanmış Kaynaklar
|   - Standart doğrulama + yağmacı dergi taraması
|
+-> [risk_of_bias_agent] -> RoB Değerlendirmesi
- Sinyal soruları ile çalışma başına alan değerlendirmesi
- Tüm çalışmalar için trafik lambası özet tablosu
- Dağılım özeti (% Düşük / Bazı Endişeler / Yüksek)
|
=== Aşama 3: ANALİZ (Meta-Analiz veya Anlatı Sentezi) ===
|
|-> [meta_analysis_agent] -> Nicel veya Anlatı Sentezi
|   - Fizibilite değerlendirmesi (havuzlansın mı?)
|   - Uygunsa: etki büyüklüğü hesaplaması, forest plot verileri,
|     heterojenlik (I², Q, tau²), alt grup/duyarlılık analizleri
|   - Uygun değilse: yapılandırılmış anlatı sentezi (SWiM)
|   - Her sonuç için GRADE kanıt kesinliği
|
|-> [synthesis_agent] -> Nitel Temalar + Boşluk Analizi
|   - Çalışmalar arası tematik sentez
|   - Nicel bulgularla entegrasyon
|
+-> [devils_advocate_agent] -- KONTROL NOKTASI 2
- Kiraz toplama kontrolü
- Heterojenlik açıklama yeterliliği
- GRADE değerlendirme geçerliliği
- Karar: GEÇTİ / REVİZE ET
|
=== Aşama 4: YAZIM ===
|
+-> [report_compiler_agent] -> PRISMA 2020 Raporu
- templates/prisma_report_template.md kullanır
- Tüm 27 PRISMA öğesi bölümlere eşlenmiştir
- Çalışma özellikleri tablosu
- Yanlılık riski özet tablosu
- Forest plot verileri (meta-analiz ise)
- GRADE Bulguların Özeti tablosu
|
=== Aşama 5: İNCELEME (Paralel) ===
|
|-> [editor_in_chief_agent] -> Editoryal Karar
|-> [ethics_review_agent] -> Etik Onayı
+-> [devils_advocate_agent] -- KONTROL NOKTASI 3
|
=== Aşama 6: REVİZYON ===
|
+-> [report_compiler_agent] -> Final PRISMA Raporu


### Sistematik İnceleme Kontrol Noktası Kuralları

1. Tüm standart kontrol noktası kuralları geçerlidir (bkz. Kontrol Noktası Kuralları).
2. Aşama 2'den önce **protokol tescil edilmelidir** (veya tescil önerilmelidir).
3. Aşama 3'ten önce **tüm çalışmalar için yanlılık riski tamamlanmalıdır**.
4. Her havuzlanmış sonuç için **GRADE değerlendirmesi zorunludur**.
5. Aşama 5'te **PRISMA kontrol listesi uyumu** doğrulanır.

---

## Operasyonel Modlar

| Mod | Aktif Ajanlar | Çıktı | Kelime Sayısı |
|------|---------------|--------|------------|
| `full` (varsayılan) | Tüm 9 çekirdek (socratic_mentor, RoB, meta-analiz hariç) | Tam APA 7.0 raporu | 3,000-8,000 |
| `quick` | RQ + Biblio + Verification + Report | Araştırma özeti | 500-1,500 |
| `review` | Editor + Devil's Advocate + Ethics | Sağlanan metin üzerine hakem raporu | N/A |
| `lit-review` | Biblio + Verification + Synthesis | Açıklamalı kaynakça + sentez | 1,500-4,000 |
| `fact-check` | Sadece Source Verification | Doğrulama raporu | 300-800 |
| `socratic` | Socratic Mentor + RQ + Devil's Advocate | Araştırma Planı Özeti (İÇGÖRÜ koleksiyonu) | N/A (iteratif) |
| `systematic-review` | RQ + Architect + Biblio + Verification + RoB + Meta-Analysis + Synthesis + Report + Editor + Ethics + DA | Tam PRISMA 2020 raporu + forest plot verileri + GRADE tablosu | 5,000-15,000 |

---

## Başarısızlık Yolları

Tüm modlardaki tüm başarısızlık senaryoları, tetikleme koşulları ve kurtarma stratejileri için `references/failure_paths.md` dosyasına bakın.

Temel başarısızlık yolu özeti:

| Başarısızlık Senaryosu | Tetikleme Koşulu | Kurtarma Stratejisi |
|---------|---------|---------|
| RQ yakınsayamaz | Aşama 1 / Katman 1 hala belirsizken birden fazla turu aşar | 3 aday RQ sağlayın veya lit-review önerin |
| Yetersiz literatür | bibliography_agent 5'ten az kaynak bulur | Arama stratejisini genişletin, alternatif anahtar kelimeler |
| Metodoloji uyuşmazlığı | RQ türü yöntem yeteneğiyle yanlış hizalanmış | Aşama 1'e dönün, 3 alternatif yöntem önerin |
| Şeytanın Avukatı KRİTİK | Ölümcül mantıksal hata keşfedildi | DURUN, sorunu açıklayın, düzeltme talep edin |
| Etik ENGELLENDİ | Ciddi etik sorun | DURUN, sorunları ve iyileştirme yolunu listeleyin |
| Socratic yakınsamama | Yakınsama olmadan > 10 tur | Full moda geçmeyi önerin |
| Kullanıcı ortada bırakır | Devam etmek istemediğini açıkça belirtir | İlerlemeyi kaydedin, yeniden giriş yolu sağlayın |
| Sadece Çince literatür | İngilizce arama boş döner | Çince akademik veritabanlarına geçin |

---

## Literatür İzleme (İsteğe Bağlı Boru Hattı Sonrası)

Herhangi bir araştırma modu tamamlandıktan sonra, kullanıcılar isteğe bağlı olarak araştırma sonrası literatür izlemeyi kurmak için `monitoring_agent`'ı etkinleştirebilirler. Bu ana boru hattının bir parçası değildir; talep üzerine tetiklenen yardımcı bir yetenektir.

Ayrıntılı ajan tanımı için `agents/monitoring_agent.md` dosyasına bakın.
Platforma özel kurulum kılavuzları için `references/literature_monitoring_strategies.md` dosyasına bakın.

**Tetikleyici**: "bu konuyu izle", "uyarılar kur", "bununla ilgili yeni yayınları takip et"

**Yetenekler**:
- Haftalık/aylık izleme özeti oluşturma
- Atıf yapılan kaynaklar için geri çekme uyarıları
- Çelişkili bulguların tespiti
- Kilit yazar takibi
- Anahtar kelime evrim takibi

**Giriş**: Tamamlanmış kaynakça + herhangi bir araştırma modundan gelen arama stratejisi
**Çıktı**: İzleme yapılandırması + özet şablonu (markdown)

**Sınırlama**: İzleme ajanı, kullanıcının harekete geçmesi için yapılandırmalar ve şablonlar üretir. Otonom arka plan izlemesi yapamaz.

---

## Devir Protokolü: deep-research → academic-paper

Araştırma tamamlandıktan sonra, aşağıdaki materyaller `academic-paper`'a devredilebilir:

1. **Araştırma Sorusu Özeti** (research_question_agent'tan)
2. **Metodoloji Taslağı** (research_architect_agent'tan)
3. **Açıklamalı Kaynakça** (bibliography_agent'tan)
4. **Sentez Raporu** (synthesis_agent'tan)
5. **[Sokratik mod ise] İÇGÖRÜ Koleksiyonu ve Araştırma Planı Özeti**

**Tetikleyici**: Kullanıcı "şimdi bir makale yazmama yardım et" veya "buna dayalı bir makale yaz" derse.

`academic-paper`'ın `intake_agent`'ı mevcut materyalleri otomatik olarak tespit edecek ve gereksiz adımları atlayacaktır:
- RQ Özeti varsa -> konu belirlemeyi atla
- Kaynakça varsa -> literatür taramasını atla
- Sentez varsa -> bulgular / tartışma yazımını hızlandır

Ayrıntılı devir örneği için `examples/handoff_to_paper.md` dosyasına bakın.

---

## Tam Akademik Boru Hattı

Tam iş akışı için `academic-pipeline/SKILL.md` dosyasına bakın.

---

## Ajan Dosya Referansları

| Ajan | Tanım Dosyası |
|-------|----------------|
| research_question_agent | `agents/research_question_agent.md` |
| research_architect_agent | `agents/research_architect_agent.md` |
| bibliography_agent | `agents/bibliography_agent.md` |
| source_verification_agent | `agents/source_verification_agent.md` |
| synthesis_agent | `agents/synthesis_agent.md` |
| report_compiler_agent | `agents/report_compiler_agent.md` |
| editor_in_chief_agent | `agents/editor_in_chief_agent.md` |
| devils_advocate_agent | `agents/devils_advocate_agent.md` |
| ethics_review_agent | `agents/ethics_review_agent.md` |
| socratic_mentor_agent | `agents/socratic_mentor_agent.md` |
| risk_of_bias_agent | `agents/risk_of_bias_agent.md` |
| meta_analysis_agent | `agents/meta_analysis_agent.md` |
| monitoring_agent | `agents/monitoring_agent.md` |

---

## Referans Dosyaları

| Referans | Amaç | Tarafından Kullanılır |
|-----------|---------|---------|
| `references/apa7_style_guide.md` | APA 7. baskı hızlı referans | report_compiler, editor_in_chief |
| `references/source_quality_hierarchy.md` | Kanıt piramidi + derecelendirme rubriği | source_verification, bibliography |
| `references/methodology_patterns.md` | Araştırma tasarımı şablonları | research_architect |
| `references/logical_fallacies.md` | 30+ mantıksal hata kataloğu | devils_advocate |
| `references/ethics_checklist.md` | YZ açıklaması, atıf, çift kullanım | ethics_review |
| `references/interdisciplinary_bridges.md` | Disiplinler arası bağlantı kalıpları | synthesis, research_architect |
| `references/socratic_questioning_framework.md` | 6 tür Sokratik soru + 30+ istem kalıbı | socratic_mentor |
| `references/failure_paths.md` | Tetikleyiciler ve kurtarma yolları ile 12 başarısızlık senaryosu | tüm ajanlar |
| `references/mode_selection_guide.md` | Mod seçim akış şeması ve karşılaştırma tablosu | orchestrator |
| `references/irb_decision_tree.md` | IRB karar ağacı + Tayvan süreci + HE hızlı referans | ethics_review, research_architect |
| `references/equator_reporting_guidelines.md` | EQUATOR raporlama kılavuzu eşlemesi | research_architect, report_compiler |
| `references/preregistration_guide.md` | Ön tescil karar ağacı + platformlar + kontrol listesi | research_architect |
| `references/systematic_review_toolkit.md` | Cochrane v6.4, PRISMA 2020, RoB 2, ROBINS-I, I² kılavuzu, GRADE, protokol tescili | risk_of_bias, meta_analysis, bibliography, report_compiler |
| `references/literature_monitoring_strategies.md` | Google Akademik uyarıları, PubMed uyarıları, RSS beslemeleri, Retraction Watch, atıf takibi, izleme hızı | monitoring_agent |

---

## Şablonlar

| Şablon | Amaç |
|----------|---------|
| `templates/research_brief_template.md` | Quick modu çıktı formatı |
| `templates/literature_matrix_template.md` | Kaynak x Tema analiz matrisi |
| `templates/evidence_assessment_template.md` | Kaynak başına kalite değerlendirme kartı |
| `templates/preregistration_template.md` | OSF standart 21 maddelik ön tescil şablonu |
| `templates/prisma_protocol_template.md` | PRISMA-P 2015 sistematik inceleme protokolü şablonu |
| `templates/prisma_report_template.md` | PRISMA 2020 sistematik inceleme rapor şablonu (27 madde) |

---

## Örnekler

| Örnek | Şunu Gösterir |
|---------|-------------|
| `examples/exploratory_research.md` | Tam 6 aşamalı boru hattı kılavuzu |
| `examples/systematic_review.md` | PRISMA tarzı literatür taraması |
| `examples/policy_analysis.md` | Uygulamalı karşılaştırmalı politika araştırması |
| `examples/socratic_guided_research.md` | Tam Sokratik mod çok turlu diyaloğu (12 tur) |
| `examples/handoff_to_paper.md` | deep-research full modunun academic-paper'a devri |
| `examples/review_mode.md` | Review modu: Politika öneri metni için 3 ajanlı inceleme boru hattı |
| `examples/fact_check_mode.md` | Fact-check modu: İddia başına kararlarla HEI iddialarının kaynak doğrulaması |

---

## Çıktı Dili

Kullanıcının dilini takip eder. Akademik terminoloji İngilizce olarak korunur. Sokratik mod doğal konuşma tarzını kullanır.

---

## Kalite Standartları

1. **Her iddianın bir atfı olmalıdır** — desteklenmeyen iddialara yer verilmez.
2. **Kanıt hiyerarşisi** — meta-analizler > RKÇ'ler > kohort çalışmaları > vaka raporları > uzman görüşü.
3. **Çelişki beyanı** — kaynaklar uyuşmuyorsa, her iki tarafı da kanıt kalitesi karşılaştırmasıyla bildirin.
4. **Sınırlılık şeffaflığı** — her raporun açık bir sınırlılıklar bölümü olmalıdır.
5. **YZ beyanı** — tüm raporlar, YZ destekli araştırma araçlarının kullanıldığına dair bir ifade içerir.
6. **Yeniden üretilebilirlik** — arama stratejileri, dahil etme kriterleri ve analitik yöntemler replikasyon için belgelenmelidir.
7. **Sokratik dürüstlük** — Sokratik modda asla doğrudan cevap vermeyin; her zaman sorularla rehberlik edin.

## Ajanlar Arası Kalite Hizalaması

Ajanlar arasında tutarsızlığı önlemek için birleştirilmiş tanımlar:

| Kavram | Tanım | Şunlar İçin Geçerlidir |
|---------|-----------|------------|
| **Hakemli (Peer-reviewed)** | Resmi hakem değerlendirme sürecine sahip bir dergide yayınlanmış (yalnızca editoryal inceleme yeterli değildir). Konferans bildirileri yalnızca açıkça hakemli ise sayılır | bibliography_agent, source_verification_agent |
| **Güncellik Kuralı** | Varsayılan: son 5 yıl içinde yayınlanmış. Alana göre geçersiz kılma: CS/AI = 3 yıl, Tarih/Felsefe = 20 yıl, Hukuk = yargı yetkisi değişikliklerine bağlıdır. Temel eserler yaştan bağımsız olarak muaftır | bibliography_agent, ethics_review_agent |
| **KRİTİK şiddet** | Çözülmediği takdirde temel bir sonucu geçersiz kılacak veya akademik suistimal oluşturacak sorun. Boru hattı ilerlemeden önce acil çözüm gerektirir | Tüm ajanlar |
| **Kaynak Katmanı** | tier_1 = en üst çeyrek hakemli dergi; tier_2 = diğer hakemli; tier_3 = akademik ama hakemli değil; tier_4 = gri literatür | bibliography_agent, source_verification_agent |
| **Minimum Kaynak Sayısı** | full = 15+, quick = 5-8, lit-review = 25+, systematic-review = uygun olanların tümü (sınır yok), fact-check = iddia başına 3+ | bibliography_agent |
| **Doğrulama Eşiği** | %100 DOI kontrolü + %50 WebSearch spot kontrolü | source_verification_agent, ethics_review_agent |

> **Çapraz Beceri Referansı**: Aşamalar arası veri değişim formatları için `shared/handoff_schemas.md` dosyasına bakın.

---

## Diğer Becerilerle Entegrasyon

Bu beceri alandan bağımsızdır ancak alana özgü becerilerle birleştirilebilir:

deep-research + tw-hei-intelligence     -> Kanıta dayalı HEI politika araştırması
deep-research + report-to-website       -> Etkileşimli araştırma raporu
deep-research + podcast-script-generator -> Araştırma podcasti
deep-research + academic-paper          -> Tam araştırmadan yayına boru hattı
deep-research (socratic) + academic-paper (plan) -> Rehberli araştırma + makale planlama
deep-research (systematic-review) + academic-paper -> PRISMA sistematik inceleme makalesi


---

