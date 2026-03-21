# Kalfa OS

Claude Code icin Turkce profesyonel isletim sistemi. Hafiza, uzman agent'lar, otomatik guvenlik kontrolleri ve 989 hazir skill ile Claude Code'u uretim kalitesinde bir is ortağina donusturur.

## Ne Icerir

| Bilesen | Sayi | Aciklama |
|---------|------|----------|
| **Skill'ler** | 989 | 16 kategoride yapilandirilmis operasyonel prosedurler |
| **Agent'lar** | 9 | Kalici hafizaya sahip uzman alt-agent'lar |
| **Komutlar** | 21 | Is akisi rituelleri ve araclar |
| **Hook'lar** | 9 | Deterministik guvenlik kontrolleri |
| **Hafiza** | 6 katman | Oturumlar arasi baglam koruma |

## Hizli Baslangic

### 1. On Gereksinimler

- [Claude Code](https://claude.ai) kurulu ve ucretli Anthropic plani aktif
- `jq` kurulu (`brew install jq` / `sudo apt-get install jq`)

### 2. Kurulum

```bash
git clone https://github.com/kullanici/kalfa-os.git
cd hedef-projeniz
cp -r /kalfa-os/yolu/* .
cp -r /kalfa-os/yolu/.claude .
cp /kalfa-os/yolu/CLAUDE.md .
```

### 3. Baslatma

```bash
claude
```

Claude Code acildiktan sonra:

```
/start
```

Detayli kurulum icin `SETUP.md` dosyasina bakin.

## Sistem Mimarisi

### 9 Uzman Agent

| Agent | Gorevi |
|-------|--------|
| **Denetci** | Kalite kapisi. Isleri inceler, bilgiyi terfi ettirir |
| **Cozumleyici** | Tikandığinda kok neden analizi yapar |
| **Hata Tercumani** | Anlasilmaz hatalari cozume donusturur |
| **Lastik Ordek** | Sokratik sorgulama ile gercek problemi buldurur |
| **PR Yazari** | Diff'lerden PR aciklamasi, commit mesaji yazar |
| **Kapsam Bekcisi** | Konu sapmasini yakalar |
| **Borc Takipcisi** | Teknik borcu izler ve onceliklendirir |
| **Kesif Rehberi** | Yeni codebase'leri hizlica ogrenir |
| **Arkeolog** | Kodun neden var oldugunu ortaya cikarir |

### 21 Komut

| Komut | Ne Zaman |
|-------|----------|
| `/start` | Gun basinda |
| `/sync` | Gun ortasinda baglam tazeleme |
| `/wrap-up` | Gun sonunda |
| `/clear` | Gorevler arasi geciste |
| `/audit` | Onemli is bittiginde |
| `/review` | Kod incelemesi |
| `/unstick` | Tikandığinda |
| `/onboard` | Yeni codebase tanimak icin |
| `/retro` | Sprint retrospektifi |
| `/system-audit` | Altyapi denetimi |

Tam liste icin `.claude/command-index.md` dosyasina bakin.

### 16 Skill Kategorisi (989 Skill)

Yapay Zeka ve Otomasyon, Icerik, Danismanlik, Musteri Basarisi, Tasarim, Yazilim Gelistirme, E-ticaret, E-posta Pazarlama, Finans, Pazarlama, Urun Yonetimi, Kisisel Verimlilik, Satis, SEO, Sosyal Medya, Girisimcilik.

Detaylar icin `.claude/skills/INDEX.md` dosyasina bakin.

### 6 Katmanli Hafiza

1. `memory.md` — Aktif oturum baglami
2. Agent hafizasi — Agent basina kalici bilgi
3. Bilgi tabani — Sistem geneli ogrenilmis kurallar
4. Bilgi adayliklari — Aday ogrenmeler hatti
5. MCP bilgi grafi — Yapilandirilmis varliklar
6. Gunluk notlar — Kronolojik oturum gecmisi

### 9 Guvenlik Hook'u

- Tehlikeli shell komutlarini engeller
- Dosyalari uzerine yazmadan once yedekler
- Eksik icerigi yakalar
- Tum degisiklikleri loglar
- Oturum durumunu otomatik korur

## Gunluk Is Akisi

```
Sabah:         /start → calis → /sync (gorev degistirirken)
Ogleden sonra: calis → /clear (baglam agirlaşirsa) → calis
Aksam:         /wrap-up
```

## Dosya Yapisi

```
projeniz/
├── .claude/
│   ├── agents/          # 9 uzman agent tanimi
│   ├── commands/        # 21 komut dosyasi
│   ├── hooks/           # 9 guvenlik hook'u
│   ├── skills/          # 989 skill (16 kategori)
│   ├── agent-memory/    # Agent basina kalici hafiza
│   ├── logs/            # Denetim izi ve olay kaydi
│   ├── backups/         # Otomatik yedekler
│   ├── memory.md        # Aktif oturum baglami
│   ├── knowledge-base.md    # Ogrenilmis kurallar
│   ├── command-index.md     # Komut katalogu
│   └── settings.json        # Hook yapilandirmasi
├── CLAUDE.md            # Ana sistem talimatlari
├── SETUP.md             # Kurulum rehberi
├── Task Board.md        # Gorev panosu
├── Scratchpad.md        # Hizli not defteri
└── Daily Notes/         # Gunluk notlar
```

## Katkida Bulunma

1. Repo'yu fork'la
2. Degisikliklerini yap
3. PR ac

## Lisans

MIT
