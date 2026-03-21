# Kalfa OS — Hızlı Başlangıç

Üretim kalitesinde bir Claude Code sistemine 3 adım kaldı.

---

## 1. Claude Code'u Kur

Claude Code zaten kuruluysa bu adımı atla (`claude --version` ile kontrol et).

```bash
# Mac / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

Ücretli bir Anthropic planı gerektirir (Pro $20/ay, Max $100-200/ay, veya Teams/Enterprise).

> **Not:** `ANTHROPIC_API_KEY` ortam değişkenin ayarlıysa, Claude Code abonelik yerine API hesabına fatura keser. İstemiyorsan `unset ANTHROPIC_API_KEY` çalıştır.

> **Ön Gereksinim:** Güvenlik hook'ları `jq` (komut satırı JSON işleyicisi) gerektirir. Kurulu değilse yükle:
> ```bash
> # Mac
> brew install jq
>
> # Ubuntu / Debian
> sudo apt-get install jq
>
> # Windows (Chocolatey ile)
> choco install jq
> ```
> `jq --version` ile doğrula. `jq` olmadan hook'lar çalışır ama güvenlik kontrolleri (yedekleme doğrulaması, bütünlük kapıları, tehlikeli komut engelleme) sessizce atlanır.

## 2. Repo'yu klonla ve projeye kopyala

```bash
git clone https://github.com/kullanici/kalfa-os.git
cp -r kalfa-os/* /projenizin/yolu/
cp -r kalfa-os/.claude /projenizin/yolu/
```

Bu işlem `.claude/` sistem dizinini, `CLAUDE.md`, `Task Board.md`, `Scratchpad.md` ve `Daily Notes/` dosyalarını ekler.

Zaten bir `.claude/` dizininiz varsa elle birleştirin — mevcut ayarlarınızı veya hafızanızı üzerine yazmayın.

## 3. Claude Code'u Başlat ve Tanıştırma Prompt'unu Çalıştır

```bash
claude
```

Ardından aşağıdaki tanıştırma prompt'unu yapıştırın. Bu, Claude'a projenizi taramasını, sistemi benimsemesini ve her şeyi sizin kurulumunuza göre yapılandırmasını söyler.

---

## Tanıştırma Prompt'u (bunu kopyalayıp Claude Code'a yapıştırın)

```
Bu projeye Kalfa OS işletim sistemini yeni kurdum. Sistem dosyaları .claude/ dizininde ve ana talimatlar CLAUDE.md dosyasında.

Lütfen şunları yap:

1. Tam sistem mimarisini anlamak için CLAUDE.md'yi oku.
2. .claude/memory.md ve .claude/knowledge-base.md dosyalarını oku.
3. Mevcut tüm komutları öğrenmek için .claude/command-index.md dosyasını oku.
4. Proje yapımı tara (dosyalar, klasörler, dil, framework, bağımlılıklar).
5. Tespit ettiklerinin bir özetini göster.
6. Sonra sistemi ihtiyaçlarıma göre uyarlamak için birkaç akıllı soru sor:
   - Bu projedeki ana hedeflerim ne?
   - Tipik iş akışım nasıl görünüyor?
   - En çok hangi görevlere zaman harcıyorum (veya otomatikleştirmek istiyorum)?
   - Düzenli olarak kullandığım araçlar, platformlar veya servisler var mı?
7. Cevaplarıma ve taramana dayanarak memory.md'yi güncelle:
   - Proje adı ve açıklaması
   - Dil/framework/build aracı
   - Önemli dosya yolları
   - Fark ettiğin kalıplar
   - Hedeflerim ve iş akışı tercihlerim
8. .claude/skills/ dizinindeki skill'leri incele — projeme ve hedeflerime en uygun kategorileri ve belirli skill'leri öner.
9. Günlük iş akışını başlatmak için /start çalıştır.

Önce tara, sonra soru sor — ilk taramayı yapmadan beni bekleme.
```

---

## Neler Kurdunuz

**6 katmanlı hafıza** — Claude oturumlar arası bağlamı hatırlar, hatalardan öğrenir ve zamanla gelişir.

**9 uzman agent** — Denetçi (kalite kapısı), Çözümleyici, Hata Tercümanı, Lastik Ördek, PR Yazarı, Kapsam Bekçisi, Borç Takipçisi, Keşif Rehberi, Arkeolog. Komutlar aracılığıyla otomatik çalışırlar.

**21 komut** — `/start`, `/sync`, `/wrap-up`, `/clear`, `/audit`, `/onboard`, `/review`, `/retro`, `/launch`, `/report` ve dahası. Claude Code'a yazın, sistem gerisini halleder.

**16 kategoride 989 skill** — Yapay Zeka ve Otomasyon, İçerik, Danışmanlık, Müşteri Başarısı, Tasarım, Yazılım Geliştirme, E-ticaret, E-posta, Finans, Pazarlama, Ürün, Verimlilik, Satış, SEO, Sosyal Medya, Girişimcilik.

**9 otomatik kontrol** — Her seferinde çalışan deterministik güvenlik ağları: tehlikeli shell komutlarını engeller, üzerine yazmadan önce yedekler, eksik içeriği yakalar, her şeyi loglar.

**Kendi kendini geliştiren motor** — Claude kalıpları gözlemler, öğrenmeleri aday gösterir ve Denetçi onaylanan kuralları terfi ettirir. Sisteminiz kullandıkça akıllanır.

## Günlük İş Akışı

```
Sabah:      /start → çalış → /sync (görev değiştirirken)
Öğleden sonra: çalış → /clear (bağlam ağırlaşırsa) → çalış
Akşam:      /wrap-up
```

## Komutlar

| Komut | Ne zaman kullanılır |
|---|---|
| `/start` | İş oturumunun başında |
| `/sync` | Oturum ortasında bağlamı tazelemek için |
| `/clear` | İlgisiz görevler arasında veya kalite düştüğünde |
| `/wrap-up` | İş oturumunun sonunda |
| `/audit` | Önemli bir iş bitirdikten sonra |
| `/onboard` | Yeni bir codebase'i tanımak için |
| `/unstick` | Bir problemde tıkandığında |
| `/review` | Kod veya iş incelemesi için |
| `/retro` | Sprint retrospektifi |
| `/system-audit` | Derin altyapı sağlık kontrolü |

## SSS

**Kodlama bilmem gerekiyor mu?**
Hayır. Her şey düz Türkçe/İngilizce.

**Bu herhangi bir projeyle çalışır mı?**
Evet — herhangi bir dil, framework veya yapı. Tanıştırma prompt'u otomatik uyarlanır.

## İpuçları

1. **İlgisiz görevler arasında `/clear` çalıştır.** Bağlam kirliliği kalite düşüşünün 1 numaralı nedenidir.
2. **memory.md'yi 100 satırın altında tut.** Agresif şekilde buda.
3. **Bilgi tabanının doğal büyümesine izin ver.** Önceden doldurma — Denetçi'nin gerçek öğrenmeleri terfi ettirmesini bekle.
4. **Hook'lara güven.** Talimatların kaçırdığını onlar yakalar.
5. **Tıkandığında `/unstick` dene.** Boşa dönmekten iyidir.
