# Claude Bağlamı — Kalfa

Bu proje, Claude Code için profesyonel bir işletim sistemi olan Kalfa'u kullanır.
Herhangi bir işlem yapmadan önce daima `.claude/memory.md` dosyasını oku.

## Hızlı Başlangıç

* `/start` ile güne başla
* `/sync` ile gün ortasında hafızayı tazele
* `/wrap-up` ile günü kapat
* `/audit` ile son yapılan işin kalitesini doğrula
* `/clear` ile bağlamı güvenle temizle ve kaldığın yerden devam et
* `/unstick` ile bir problemde tıkandığında yardım al
* `/retro` ile sprint retrospektifi yap
* `/system-audit` ile derin altyapı denetimi başlat

## Temel Dosyalar

* Hafıza: `.claude/memory.md` (mevcut bağlam için bunu oku)
* Bilgi Tabanı: `.claude/knowledge-base.md` (sistem geneli öğrenilmiş kurallar — her görevden önce oku)
* Görev Panosu: `.claude/workspace/TaskBoard.md`
* Not Defteri: `.claude/workspace/Scratchpad.md` (hızlı not, /sync sırasında işlenir, /wrap-up ile temizlenir)
* Günlük Notlar: `.claude/workspace/DailyNotes/` (/start ile otomatik oluşturulur)
* Bilgi Adaylıkları: `.claude/knowledge-nominations.md` (aday öğrenmeler — Denetçi inceler)
* Komut Dizini: `.claude/command-index.md` (tüm komutlar, tetikleyicileri ve araçları)

## Sistem Mimarisi

* **Agent'lar** (`.claude/agents/`): Kalıcı hafızaya sahip uzman alt-agent'lar
  * `auditor` — Denetçi. İşleri inceler, bilgiyi terfi ettirir, SOP revizyonları önerir
  * `unsticker` — Çözümleyici. Tıkandığında kök neden analizi yapar, taze yaklaşımlar sunar
  * `error-whisperer` — Hata Tercümanı. Anlaşılmaz hataları çözüme dönüştürür. Oturumlar arası kalıp eşleştirme
  * `rubber-duck` — Lastik Ördek. Gerçek problemi ifade etmeni sağlar. Sokratik sorgulama
  * `pr-ghostwriter` — PR Yazarı. Diff'lerden PR açıklaması, commit mesajı, changelog yazar
  * `yak-shave-detector` — Kapsam Bekçisi. Konu sapmasını yakalar. "X yapmaya başladın ama şu an Y yapıyorsun"
  * `debt-collector` — Borç Takipçisi. Teknik borcu izler. Kestirmeleri kayıt altına alır, ne zaman ödenmesi gerektiğini önerir
  * `onboarding-sherpa` — Keşif Rehberi. Yeni codebase'leri hızlıca öğrenir. Mimari haritası, kritik dosya tespiti
  * `archaeologist` — Arkeolog. Kodun neden var olduğunu kazıp çıkarır. Git blame + bağlam yeniden inşası
  * `coach` — Koç. Çalışma kalıplarını analiz eder, kör noktaları tespit eder, proaktif öneriler sunar
* **Komutlar** (`.claude/commands/`): İş akışı ritüelleri ve araçlar
* **Hook'lar** (`.claude/hooks/`): Deterministik güvenlik uygulaması (loglama, doğrulama)
* **Log'lar** (`.claude/logs/`): Denetim izi + olay kaydı — hook'lar tarafından otomatik doldurulur
* **Skill'ler** (`.claude/skills/`): Alan bilgisi, ihtiyaç halinde yüklenir

## Hafıza Mimarisi (6 Katman)

1. **memory.md** — Aktif oturum bağlamı (şu an ne yapıyorsun)
2. **Agent Hafızası** (`.claude/agent-memory/`) — Agent başına kalıcı bilgi, oturumlar arası
3. **Bilgi Tabanı** (`.claude/knowledge-base.md`) — Sistem geneli öğrenilmiş kurallar (Denetçi onaylı)
4. **Bilgi Adaylıkları** (`.claude/knowledge-nominations.md`) — Aday öğrenmeler hattı
5. **MCP Bilgi Grafiği** — Yapılandırılmış varlıklar ve ilişkiler (MCP hafıza etkinse)
6. **Günlük Notlar** — Kronolojik oturum geçmişi ve devir kayıtları

## Komut Farkındalığı

Tüm agent'lar sistem komutlarını çalıştırabilir. Tam katalog için `.claude/command-index.md` dosyasını oku.

* **Doğrudan çalıştır**: Bir komutun gerektirdiği araçlara sahipsen, `.claude/commands/{isim}.md` dosyasını oku ve prosedürü doğrudan uygula.
* **Öner**: Gerekli araçlara sahip değilsen, orkestratör için `RECOMMEND: /komut [argümanlar] — [neden]` çıktısı ver.
* Agent'lar tetikleme koşulları eşleştiğinde komutları proaktif olarak çalıştırmalıdır.

## Erişim Haritası — Neyi Nerede Bulursun

| İhtiyacın...                    | Önce buraya bak                            | Sonra buraya                      |
| ------------------------------- | ------------------------------------------ | --------------------------------- |
| Şu an ne yapıyorum?             | `memory.md` → Şimdi                        | Görev Panosu → Bugün              |
| Bir prosedür nasıl yapılır      | `.claude/commands/` veya `.claude/skills/` | CLAUDE.md                         |
| Bir kural veya öğrenilmiş bilgi | `knowledge-base.md`                        | Agent hafızası                    |
| Belirli bir günde ne oldu       | `.claude/workspace/DailyNotes/GGAAYY.md`                    | Denetim izi                       |
| Daha önce ne yanlış gitti       | `knowledge-base.md` → Kesin Kurallar       | Agent hafızası → Bilinen Kalıplar |
| Hangi komutlar var              | `.claude/command-index.md`                 | `.claude/commands/{isim}.md`      |

## Bağlam Sağlığı

Oturumların sınırlı bir bağlamı var. Ağır işlemler bağlamı hızla tüketir.

**Otomatik güvenlik ağı (hook'lar):**

* `PreCompact` hook'u otomatik sıkıştırma öncesi durumu kaydeder
* `SessionStart(compact)` hook'u sıkıştırma sonrası bağlamı geri yükler
* `SessionStart(user)` hook'u her yeni oturumda eski kapı dosyalarını sıfırlar

**Bütünlük kapıları (PreToolUse Write|Edit — kesin engeller):**

* **knowledge-base.md**: Her giriş `[Kaynak:]` belirtmeli, maks 200 satır, TBD/TODO yok
* **memory.md**: Maks 100 satır (sadece Write)
* **settings.json**: Geçerli JSON olmalı (bozuk JSON tüm hook'ları devre dışı bırakır)
* **Agent tanımları** (`.claude/agents/*.md`): TBD/TODO yok — talimatlar kesin olmalı
* **Kapısız** (doğası gereği iteratif): Günlük Notlar, Not Defteri, Şablonlar, Log'lar, Komutlar, Skill'ler

**Kendi kendini izleme (yumuşak sinyaller — Claude'un sorumluluğu):**

* \~30+ araç çağrısı veya 3+ büyük dosya okuması sonrası: proaktif olarak `/clear` çalıştır
* "compacting conversation" uyarısı görürsen: derhal `/clear` çalıştır
* Çıktı kalitesi düşerse (tekrar, atlanan detaylar): `/clear` çalıştır
* Çok adımlı bir görev tamamlandığında: sonraki ilgisiz göreve geçmeden önce `/clear` düşün
* Farklı görev alanları arasında geçiş yaparken: sınırı kabul et, ağır geçişler için `/clear` tercih et

**`/clear` nasıl çalışır:** Oturum durumunu memory.md + günlük not devrine damıtır, erişim yollarını korur. Ardından sıkıştırılmış bağlamı yeniden yükleyerek ve bir sonraki eylemi uygulayarak otomatik olarak çalışmaya devam eder. Kullanıcı için kesintisiz.

## Bakım

* memory.md dosyasını kompakt tut (<100 satır)
* Eskimiş öğeleri agresif şekilde buda
* Tamamlanan listesi Cuma günleri temizlenir
* /sync ve /wrap-up sırasında olay kaydını gözden geçir
* Denetçi SOP revizyonları önerir — kullanıcı onaylamadan değişiklik uygulanmaz
