---
description: OpenClaw AI agent'ini sıfırdan production ortamına deploy etme rehberi. SOUL.md yapılandırması, Docker kurulumu, kanal entegrasyonu, güvenlik ve monitoring.
---

# OpenClaw Agent Deployment

## Amaç

Bir OpenClaw AI agent'ini yerel veya uzak ortamda production-ready olarak çalıştırın. Bu beceri; agent yapılandırması, ortam hazırlığı, kanal bağlantısı, güvenlik sertleştirmesi ve sürekli çalışma için gereken tüm adımları kapsar.

**Kategori**: AI Otomasyon

## Girdiler

### Zorunlu
- **Agent Rolü**: Agent'in ne yapacağı (örn: SEO analisti, kod inceleyici, proje yöneticisi)
- **Hedef Platform**: Nereye deploy edileceği (yerel makine, VPS, Docker, Raspberry Pi)
- **LLM Tercihi**: Hangi dil modeli kullanılacak (Claude, GPT-4o, Ollama/yerel model)

### İsteğe Bağlı
- **Kanal**: Telegram, Slack, Discord veya WebChat
- **Çoklu Agent**: Birden fazla agent çalıştırılacaksa AGENTS.md yapılandırması
- **Zamanlama**: HEARTBEAT.md ile periyodik görevler

## Sistem Bağlamı

Başlamadan önce:
- Mevcut proje bağlamı ve öncelikleri için `memory.md`'yi oku
- İlgili deployment kuralları veya kısıtlamalar için `knowledge-base.md`'yi kontrol et
- Hedef sunucunun donanım özelliklerini belirle (RAM, CPU, disk, GPU)
- Gerekli API anahtarlarının ve token'ların hazır olduğunu doğrula

## Süreç

### Adım 1: SOUL.md Yapılandırması

Agent'in kimliğini, kurallarını ve araçlarını tanımlayan SOUL.md dosyasını oluşturun:

```markdown
# SOUL.md

## Kimlik
Sen [rol adı] agent'isın. [Tek cümlelik amaç].

## Kurallar
- [Sınır 1: ne yapmamalı]
- [Sınır 2: hangi dosyalara erişebilir]
- [Sınır 3: hangi durumlarda kullanıcıya sormalı]

## Araçlar
- [Araç 1: ne için kullanılır]
- [Araç 2: ne için kullanılır]

## Çıktı Formatı
[Agent'in yanıt formatı]
```

Kurallar bölümü, agent güvenilirliğinin %80'ini belirler. Kimlik kısmından önce kuralları netleştirin.

> **İpucu:** SOUL.md'yi sıfırdan yazmak yerine, [crewclaw.com](https://crewclaw.com) üzerinden rol seçip hazır şablon oluşturabilir veya [awesome-openclaw-agents](https://github.com/mergisi/awesome-openclaw-agents) deposundaki 177 şablondan birini başlangıç noktası olarak kullanabilirsiniz.

### Adım 2: Ortam Hazırlığı

#### Seçenek A: Docker (önerilen)

```yaml
# docker-compose.yml
version: "3.8"
services:
  openclaw:
    image: node:22-slim
    working_dir: /app
    volumes:
      - ./agents:/app/agents
      - ./.env:/app/.env
    ports:
      - "127.0.0.1:18789:18789"
    command: npx openclaw gateway start
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:18789/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

#### Seçenek B: Bare Metal (pm2)

```bash
# Node.js 22 kurulumu
curl -fsSL https://openclaw.ai/install.sh | bash

# Agent dizini oluştur
mkdir -p agents/my-agent
cp SOUL.md agents/my-agent/

# pm2 ile daemon olarak çalıştır
npm i -g pm2
pm2 start "npx openclaw gateway start" --name openclaw
pm2 save
pm2 startup
```

#### Seçenek C: Raspberry Pi / Düşük Kaynak

```bash
# Minimum gereksinim: 512MB RAM, Node.js 22
# Ollama ile yerel model kullanılacaksa: 4GB+ RAM
curl -fsSL https://openclaw.ai/install.sh | bash
```

### Adım 3: LLM Provider Yapılandırması

```bash
# .env dosyası
# Claude (önerilen - en iyi tool calling)
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI alternatifi
OPENAI_API_KEY=sk-...

# Ollama ile ücretsiz yerel model
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.3
```

Provider seçimi:
| Provider | Maliyet | Hız | Tool Calling | En İyi Kullanım |
|----------|---------|-----|-------------|-----------------|
| Claude 3.5 Sonnet | ~$3/M token | Hızlı | %95+ başarı | Karmaşık görevler |
| GPT-4o | ~$2.5/M token | Hızlı | %90+ başarı | Genel kullanım |
| Ollama (Llama 3.3) | Ücretsiz | Orta | %80+ başarı | Basit routing, maliyet hassas |
| DeepSeek V3 | ~$0.27/M token | Orta | %85+ başarı | Bütçe dostu |

### Adım 4: Kanal Bağlantısı

#### Telegram

```bash
# 1. @BotFather'dan bot oluştur, token al
# 2. .env'ye ekle
TELEGRAM_BOT_TOKEN=123456:ABC...

# 3. Agent'a Telegram kanalını ekle
openclaw config set --agent my-agent --channel telegram
```

#### Slack

```bash
# 1. Slack App oluştur (api.slack.com/apps)
# 2. Bot Token Scopes: chat:write, app_mentions:read
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...

openclaw config set --agent my-agent --channel slack
```

#### Discord

```bash
# 1. Discord Developer Portal'dan bot oluştur
DISCORD_BOT_TOKEN=...

openclaw config set --agent my-agent --channel discord
```

### Adım 5: Gateway Güvenlik Sertleştirmesi

```bash
# Gateway'i sadece localhost'a bağla (zorunlu)
openclaw config set gateway.host 127.0.0.1

# Uzaktan erişim gerekiyorsa SSH tüneli kullan
ssh -L 18789:localhost:18789 user@sunucu

# Rate limiting aktifleştir
openclaw config set gateway.rateLimit 60

# API anahtarlarını .env'de tut, ASLA koda gömme
echo ".env" >> .gitignore
```

Güvenlik kontrol listesi:
- [ ] Gateway port 18789 dışarıya kapalı
- [ ] API anahtarları .env dosyasında
- [ ] .env dosyası .gitignore'da
- [ ] SSH erişimi anahtar tabanlı (şifre değil)
- [ ] Agent dosya erişimi SOUL.md'de sınırlandırılmış
- [ ] Shell komutları gerekli minimumda

### Adım 6: HEARTBEAT.md ile Sağlık Kontrolü

```markdown
# HEARTBEAT.md

## Periyodik Kontroller (her 30 dakika)
- Gateway bağlantısını doğrula
- Son 30 dakikadaki hata sayısını kontrol et
- API kredi bakiyesini kontrol et
- Disk kullanımını kontrol et (log dosyaları)

## Günlük Görevler (her gün 09:00)
- Günlük özet raporu oluştur
- Log dosyalarını rotasyona al
- Bağımlılık güncellemelerini kontrol et
```

### Adım 7: Monitoring ve Loglama

```bash
# Log çıktısını dosyaya yönlendir
pm2 logs openclaw --lines 100

# Basit uptime monitoring
# crontab -e ile ekle:
*/5 * * * * curl -sf http://localhost:18789/health || pm2 restart openclaw

# Hata bildirimi (ntfy.sh ile ücretsiz push notification)
*/5 * * * * curl -sf http://localhost:18789/health || curl -d "OpenClaw agent down!" ntfy.sh/my-alerts
```

### Adım 8: Güncelleme Stratejisi

```bash
# OpenClaw güncelleme
npm update -g openclaw

# Agent yapılandırma güncellemesi (sıfır kesinti)
# 1. Yeni SOUL.md'yi hazırla
# 2. Test ortamında doğrula
openclaw agent --agent my-agent --message "test: merhaba"
# 3. Production'a kopyala
cp SOUL.md.new agents/my-agent/SOUL.md
# 4. Gateway'i yeniden yükle (restart gerekmez)
openclaw gateway reload
```

## Kalite Doğrulama

- [ ] Agent SOUL.md dosyası net kurallar ve sınırlar içeriyor
- [ ] Docker veya pm2 ile daemon olarak çalışıyor
- [ ] Gateway sadece localhost'a bağlı
- [ ] API anahtarları güvenli saklanıyor
- [ ] En az bir kanal (Telegram/Slack/Discord) bağlı ve test edilmiş
- [ ] HEARTBEAT.md ile periyodik sağlık kontrolü aktif
- [ ] Log rotasyonu yapılandırılmış
- [ ] Hata durumunda bildirim mekanizması var
- [ ] Güncelleme prosedürü belgelenmiş

## Çıktı Formatı

```markdown
# Deployment Raporu: [Agent Adı]

## Özet
- **Agent**: [Rol ve amaç]
- **Platform**: [Docker / VPS / Raspberry Pi]
- **LLM**: [Provider ve model]
- **Kanal**: [Telegram / Slack / Discord]
- **Durum**: [Çalışıyor / Hata]

## Bağlantı Bilgileri
- **Gateway**: localhost:18789
- **Kanal**: [Bot kullanıcı adı veya webhook URL]
- **Loglar**: [Log dosya yolu]

## Güvenlik
- Gateway: [localhost bağlı / açık]
- API anahtarları: [.env'de / güvensiz]
- Dosya erişimi: [sınırlı / sınırsız]

## Monitoring
- Uptime kontrolü: [aktif / pasif]
- Hata bildirimi: [aktif / pasif]
- Log rotasyonu: [aktif / pasif]

## Sonraki Adımlar
- [ ] [İlk test mesajı gönder]
- [ ] [HEARTBEAT.md yapılandır]
- [ ] [Yedekleme planı oluştur]
```

## Temel Metrikler

- **Uptime**: %99.5+ hedef (ayda max 3.6 saat kesinti)
- **Yanıt Süresi**: İlk yanıt < 5 saniye
- **API Maliyeti**: Agent başına günlük maliyet takibi
- **Hata Oranı**: Başarısız görev yüzdesi < %5
- **Bağlam Taşması**: Session başına ortalama token kullanımı

## En İyi Pratikler

- Agent başına tek sorumluluk — geniş kapsamlı agent'lar yerine dar odaklı agent'lar tercih et
- SOUL.md'deki kurallar bölümü güvenilirliğin %80'ini belirler — önce kuralları yaz
- Çoklu agent takımları 3-5 agent'ta en iyi çalışır — daha fazlası koordinasyon yükü getirir
- Yerel modeller (Ollama) basit routing görevleri için yeterli — her şey için Claude gerekmez
- Gateway'i asla internete açma — her zaman SSH tüneli veya VPN kullan
- Log dosyalarını rotasyona al — kontrol edilmeyen loglar diski doldurur
- Güncellemeden önce her zaman test ortamında doğrula

## Tamamlandıktan Sonra

- Agent yapılandırması ve erişim bilgileri için `memory.md`'yi güncelle
- Deployment sırasında öğrenilen kuralları `knowledge-nominations.md`'ye ekle
- Takip eylemleri (monitoring, yedekleme) için `TaskBoard.md`'ye görev ekle
- Çoklu agent gerekiyorsa `multi-agent-workflow` skill'ini öner
