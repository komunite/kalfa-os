# Kalfa OS

Claude Code için Türkçe profesyonel işletim sistemi. Hafıza, uzman agent'lar, otomatik güvenlik kontrolleri ve 989 hazır skill ile Claude Code'u üretim kalitesinde bir iş ortağına dönüştürür.

## Ne İçerir

| Bileşen | Sayı | Açıklama |
|---------|------|----------|
| **Skill'ler** | 989 | 16 kategoride yapılandırılmış operasyonel prosedürler |
| **Agent'lar** | 9 | Kalıcı hafızaya sahip uzman alt-agent'lar |
| **Komutlar** | 21 | İş akışı ritüelleri ve araçlar |
| **Hook'lar** | 9 | Deterministik güvenlik kontrolleri |
| **Hafıza** | 6 katman | Oturumlar arası bağlam koruma |

## Hızlı Başlangıç

### 1. Ön Gereksinimler

- [Claude Code](https://claude.ai) kurulu ve ücretli Anthropic planı aktif
- `jq` kurulu (`brew install jq` / `sudo apt-get install jq`)

### 2. Kurulum

```bash
# Repo'yu bilgisayarına indir
git clone https://github.com/komunite/kalfa-os.git

# Kendi projenin klasörüne gir
cd /Users/seninkullanicin/projeler/benim-projem

# Kalfa OS dosyalarını buraya kopyala
cp -r ~/kalfa-os/.claude .
cp ~/kalfa-os/CLAUDE.md .
cp ~/kalfa-os/SETUP.md .
cp ~/kalfa-os/Scratchpad.md .
cp ~/kalfa-os/"Task Board.md" .
cp -r ~/kalfa-os/"Daily Notes" .
```

### 3. Başlatma

```bash
claude
```

Claude Code açıldıktan sonra:

```
/start
```

Detaylı kurulum için `SETUP.md` dosyasına bakın.

## Sistem Mimarisi

### 9 Uzman Agent

| Agent | Görevi |
|-------|--------|
| **Denetçi** | Kalite kapısı. İşleri inceler, bilgiyi terfi ettirir |
| **Çözümleyici** | Tıkandığında kök neden analizi yapar |
| **Hata Tercümanı** | Anlaşılmaz hataları çözüme dönüştürür |
| **Lastik Ördek** | Sokratik sorgulama ile gerçek problemi buldurur |
| **PR Yazarı** | Diff'lerden PR açıklaması, commit mesajı yazar |
| **Kapsam Bekçisi** | Konu sapmasını yakalar |
| **Borç Takipçisi** | Teknik borcu izler ve önceliklendirir |
| **Keşif Rehberi** | Yeni codebase'leri hızlıca öğrenir |
| **Arkeolog** | Kodun neden var olduğunu ortaya çıkarır |

### 21 Komut

| Komut | Ne Zaman |
|-------|----------|
| `/start` | Gün başında |
| `/sync` | Gün ortasında bağlam tazeleme |
| `/wrap-up` | Gün sonunda |
| `/clear` | Görevler arası geçişte |
| `/audit` | Önemli iş bittiğinde |
| `/review` | Kod incelemesi |
| `/unstick` | Tıkandığında |
| `/onboard` | Yeni codebase tanımak için |
| `/retro` | Sprint retrospektifi |
| `/system-audit` | Altyapı denetimi |

Tam liste için `.claude/command-index.md` dosyasına bakın.

### 16 Skill Kategorisi (989 Skill)

Yapay Zeka ve Otomasyon, İçerik, Danışmanlık, Müşteri Başarısı, Tasarım, Yazılım Geliştirme, E-ticaret, E-posta Pazarlama, Finans, Pazarlama, Ürün Yönetimi, Kişisel Verimlilik, Satış, SEO, Sosyal Medya, Girişimcilik.

Detaylar için `.claude/skills/INDEX.md` dosyasına bakın.

### 6 Katmanlı Hafıza

1. `memory.md` — Aktif oturum bağlamı
2. Agent hafızası — Agent başına kalıcı bilgi
3. Bilgi tabanı — Sistem geneli öğrenilmiş kurallar
4. Bilgi adaylıkları — Aday öğrenmeler hattı
5. MCP bilgi grafi — Yapılandırılmış varlıklar
6. Günlük notlar — Kronolojik oturum geçmişi

### 9 Güvenlik Hook'u

- Tehlikeli shell komutlarını engeller
- Dosyaları üzerine yazmadan önce yedekler
- Eksik içeriği yakalar
- Tüm değişiklikleri loglar
- Oturum durumunu otomatik korur

## Günlük İş Akışı

```
Sabah:         /start → çalış → /sync (görev değiştirirken)
Öğleden sonra: çalış → /clear (bağlam ağırlaşırsa) → çalış
Akşam:         /wrap-up
```

## Dosya Yapısı

```
projeniz/
├── .claude/
│   ├── agents/          # 9 uzman agent tanımı
│   ├── commands/        # 21 komut dosyası
│   ├── hooks/           # 9 güvenlik hook'u
│   ├── skills/          # 989 skill (16 kategori)
│   ├── agent-memory/    # Agent başına kalıcı hafıza
│   ├── logs/            # Denetim izi ve olay kaydı
│   ├── backups/         # Otomatik yedekler
│   ├── memory.md        # Aktif oturum bağlamı
│   ├── knowledge-base.md    # Öğrenilmiş kurallar
│   ├── command-index.md     # Komut katalogu
│   └── settings.json        # Hook yapılandırması
├── CLAUDE.md            # Ana sistem talimatları
├── SETUP.md             # Kurulum rehberi
├── Task Board.md        # Görev panosu
├── Scratchpad.md        # Hızlı not defteri
└── Daily Notes/         # Günlük notlar
```

## Katkıda Bulunma

1. Repo'yu fork'la
2. Değişikliklerini yap
3. PR aç

## Lisans

MIT
