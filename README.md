![banner-kalfa](https://i.ibb.co/qMCNDX72/kalfa-banner.jpg)
## Kalfa

Bu araç, Claude Code ile daha düzenli ve üretim kalitesinde çalışma yapmanıza yardımcı olur. Bunu hafıza katmanları, uzman agent'lar, tekrar kullanılabilir skill'ler, komut ritüelleri ve güvenlik hook'ları ile yapar; böylece farklı projelerde tutarlı çıktı alabilirsiniz.

Proje durumu: aktif olarak geliştiriliyor

[![npm](https://img.shields.io/npm/v/%40komunite%2Fkalfa)](https://www.npmjs.com/package/@komunite/kalfa)

## Metrikler

| Bileşen | Sayı | Açıklama |
|---------|------|----------|
| **Skill'ler** | 994 | 16 kategoride yapılandırılmış operasyonel prosedürler |
| **Agent'lar** | 10 | Kalıcı hafızaya sahip uzman alt-agent'lar |
| **Komutlar** | 22 | İş akışı ritüelleri ve araçlar |
| **Hook'lar** | 9 | Deterministik güvenlik kontrolleri |
| **Hafıza** | 6 katman | Oturumlar arası bağlam koruma |

### Temel işlevler

Kalfa; Claude Code kullanıcıları, bireysel üreticiler ve küçük ekipler için tasarlanmıştır. Amaç, kullanıcıların günlük çalışma akışını standartlaştırmak, kaliteyi korumak ve bağlam kaybını azaltmaktır.

Kalfa, `.claude/commands` içindeki komutlar, `.claude/hooks` içindeki otomasyon kontrolleri ve `.claude/skills` içindeki operasyonel skill kütüphanesi ile çalışır. `memory.md`, `knowledge-base.md` ve görev dosyalarını okuyarak o anki bağlamı toplar ve bunu bir sonraki doğru adıma dönüştürür. Teknik detaylar için [Geliştirici dokümantasyonu](#geliştirici-dokümantasyonu) bölümüne bakın.

### Kalfa ne yapmaz

Bu araç, Claude Code'un yerine geçen bağımsız bir uygulama değildir. Kendi web arayüzü, backend servisi veya tek başına çalışan bir API ürünü sağlamaz.

Ayrıca bu araç, harici servis hesaplarını sizin adınıza otomatik açmaz veya özel entegrasyonları sıfır eforla garanti etmez; gerekli erişim ve yapılandırmaları sizin sağlamanız gerekir.

## Önkoşullar

Bu aracı kullanmadan önce şunlara aşina olmanız faydalıdır:

* Claude Code temel kullanım akışı
* Git ve Markdown temelleri

Sizde bulunması gerekenler:

* Claude Code kurulumu ve aktif Anthropic planı
* `jq` kurulumu (hook doğrulamaları için)
* Terminal erişimi olan bir işletim sistemi (macOS, Linux veya Windows)
* Proje klasöründe dosya yazma yetkisi

## NPM paketi kullanımı

### 1. `npx` ile tek seferlik kullanım (önerilen)

Kalfa'yı hedef projenize tek komutla kurabilirsiniz:

```bash
npx @komunite/kalfa init
```

Farklı bir dizine kurmak için:

```bash
npx @komunite/kalfa init --target /proje/dizini
```

<!--lint disable no-undefined-references-->
> [!NOTE]
> `--target` ile verdiğiniz dizin mevcut olmalıdır.

Mevcut dosyaların üzerine yazmak için:

```bash
npx @komunite/kalfa init --force
```

> [!WARNING]
> `--force` mevcut dosyaların üzerine yazar.

Yalnızca ne yapılacağını görmek için:

```bash
npx @komunite/kalfa init --dry-run
```

> [!TIP]
> `--dry-run` hiçbir dosyaya yazmaz, yalnızca yapılacak işlemleri gösterir.
<!--lint enable no-undefined-references-->

### 2. Global kurulum ile kullanım

```bash
npm i -g @komunite/kalfa
kalfa init
```

Yardım menüsü:

```bash
kalfa --help
```

## Kalfa nasıl kullanılır

### Yeni bir oturum başlat

1. Proje kök dizininde Claude Code'u açın.
   1. `.claude/` klasörünün mevcut olduğunu doğrulayın.
   2. `CLAUDE.md` dosyasının bulunduğunu kontrol edin.
   3. `.claude/workspace/TaskBoard.md` dosyasının erişilebilir olduğundan emin olun.
2. `/start` komutunu çalıştırın.
3. Günün önceliklerini netleştirip ilk işe başlayın.

### Gün içinde bağlamı sağlıklı tut

1. Oturum ortasında `/sync` çalıştırın.
2. Bağlam ağırlaştığında `/clear` kullanın.
   1. Oturum özeti günlük nota yazılır.
   2. Hafıza dosyası güncellenir.
   3. Çalışma kaldığı yerden devam eder.
3. Gün sonunda `/wrap-up` ile kapanış yapın.

### Kalite kontrollerini işlet

1. Bir iş kalemi bittiğinde `/audit` çalıştırın.
2. Merge öncesi `/review` çalıştırın.
   1. Kritik bulguları önceliklendirin.
   2. Gerekli düzeltmeleri uygulayın.
   3. Tekrar kontrol edin.
3. Teslim veya devir için `/release` ve `/handoff` kullanın.

### Skill kütüphanesinden faydalan

1. `.claude/skills/INDEX.md` dosyasından ilgili skill'i bulun.
2. Claude'a hedefinizi verip skill'i uygulatın.
   1. Net amaç belirtin.
   2. Kısıtları ve beklenen çıktıyı yazın.
   3. Sonraki adımları görev panosuna ekleyin.
3. Öğrenimleri not alıp tekrar kullanım için saklayın.

## Sorun giderme

Hook'lar çalışmıyor veya eksik davranıyor

* `jq --version` ile `jq` kurulumunu doğrulayın.

`settings.json` kaynaklı hatalar alınıyor

* `.claude/settings.json` dosyasını `jq . .claude/settings.json` ile doğrulayın.

Uzun oturumlarda kalite düşüyor

* `/clear` komutunu çalıştırıp bağlamı yeniden yükleyin.

## Yardım alma ve issue bildirme

* Hata ve geliştirme talepleri için issue açın: `https://github.com/komunite/kalfa/issues`
* Genel bilgi ve destek için GitHub üzerinden iletişime geçin. Yanıt süresi, bakımcıların uygunluğuna göre değişir.

## Geliştirici dokümantasyonu

### Teknik uygulama

Kalfa; Claude Code komut dosyaları, shell hook'ları ve hafıza dosyaları üzerinde çalışan bir operasyon katmanıdır. Kritik kontroller, `.claude/hooks/*.sh` script'leri ile uygulanır; iş akışları ise `.claude/commands/*.md` üzerinden yönetilir.

### Kod yapısı

* `.claude/commands/` dizini günlük çalışma ritüellerini ve operasyon komutlarını içerir.
* `.claude/hooks/` dizini güvenlik, loglama ve bütünlük denetimlerini içerir.
* `.claude/agents/` dizini uzman agent tanımlarını içerir.
* `.claude/skills/` dizini kategori bazlı skill kütüphanesini içerir.

### Yerel geliştirme

#### Ortam hazırlığı

Geliştirme ortamını hazırlama:

1. Depoyu klonlayın.
   1. `git clone https://github.com/komunite/kalfa.git`
   2. `cd kalfa`

#### Kurulum

Kurulum:

1. Node bağımlılıklarını yükleyin.
   1. `npm install`
   2. `npm run lint:md` komutunun çalıştığını doğrulayın.

#### Yapılandırma

Yapılandırma:

1. `.claude/settings.json` dosyasını proje ihtiyaçlarınıza göre düzenleyin.
2. `memory.md`, `knowledge-base.md` ve `.claude/workspace/TaskBoard.md` dosyalarını proje bağlamıyla güncelleyin.

#### Build ve test

Yerelde çalıştırma:

1. Bu repo bir uygulama build çıktısı üretmez; operasyon dosyası sağlar.
   1. Hedef projenizde `claude` başlatın.
   2. `/start`, `/sync`, `/wrap-up` akışlarını çalıştırın.

Testleri çalıştırma:

1. Markdown kontrollerini çalıştırın.
   1. `npm run lint:md`
   2. Gerekirse `npm run lint:md:fix`
2. CLI testlerini çalıştırın.
   1. `npm test`
   2. Geliştirme sırasında izleme modunda çalıştırmak için `npm run test:watch`

Katkı hazırlarken, mevcut repo durumunda doğrulanmış asgari yerel kontroller `npm run lint:md` ve `npm test` komutlarıdır.

#### Test kapsamı

Mevcut test seti `tests/` dizinindedir ve şunları doğrular:

1. `tests/smoke.test.js`
   1. Test altyapısının temel olarak çalıştığını doğrular.
2. `tests/cli.integration.test.js`
   1. Yardım çıktısını (`--help`) doğrular.
   2. `help` alias davranışını doğrular.
   3. Geçersiz hedef dizin için hata davranışını doğrular.
   4. `init --dry-run` çıktısını doğrular.
   5. `init` ile temel dosyaların hedef dizine kopyalandığını doğrular.

#### NPM yayını (bakımcılar için)

1. Paket içeriğini önizleyin.
   1. `npm run pack:preview`
2. npm tarafında Trusted Publisher tanımlayın.
   1. npm paket ayarlarında `@komunite/kalfa` için GitHub repo `komunite/kalfa` bağlayın.
   2. Workflow olarak `.github/workflows/npm-publish.yml` seçin.
3. Mevcut repo durumunda npm publish workflow'u manuel `workflow_dispatch` ile sınırlıdır ve job varsayılan olarak `if: false` korumasıyla devre dışıdır; yayın öncesinde `.github/workflows/npm-publish.yml` dosyasını gözden geçirip etkinleştirin.
4. Sürümü artırın ve etiketi gönderin.
   1. `npm version patch` (veya `minor` / `major`)
   2. `git push --follow-tags`
5. Gerekirse etkinleştirdikten sonra workflow'u GitHub arayüzünden elle çalıştırın.
   1. GitHub üzerinde Release oluşturmak tek başına publish başlatmaz.

#### Hata ayıklama

* `TAMLIK KAPISI` engeli alınıyor
  * `TODO`, `TBD`, `FIXME` gibi yer tutucuları kaldırın ve formatı düzeltin.

* Hook script çalışmıyor
  * `.claude/hooks/*.sh` dosyalarının çalıştırılabilir izinlerini kontrol edin.

## Nasıl katkıda bulunulur

Kalfa bakımcıları katkıları memnuniyetle karşılar.

* komut ve hook iyileştirmeleri
* dokümantasyon, skill kalitesi ve örnek iyileştirmeleri

### Katkı süreci

Katkıdan önce topluluk beklentileri için [Code of Conduct](./CODE_OF_CONDUCT.md) dosyasını okuyun. Depodaki mevcut yapı ve yazım standartlarını takip edin.

1. Fork alın ve branch açın.
   1. `main` üzerinden yeni bir branch oluşturun.
   2. Değişiklik kapsamını dar tutun.
2. Değişiklik yapın ve doğrulayın.
   1. `npm run lint:md` çalıştırın.
   2. `npm test` çalıştırın.
   3. Açıklayıcı bir pull request açın.

## Emeği geçenler

Kalfa'nın geliştirilmesine katkı veren Komünite ekibine ve tüm katkıcılara teşekkür ederiz.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için [LICENSE](./LICENSE) dosyasına bakın.
