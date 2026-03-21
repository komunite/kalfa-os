# Komut Dizini

Tüm sistem komutları, tetikleyicileri, gerekli araçları ve çalıştırma modu.

## Günlük Ritüeller

| Komut | Tetikleyici | Araçlar | Mod | Açıklama |
|-------|-------------|---------|-----|----------|
| `/start` | İş gününün başlangıcı | Read, Write, Edit, Bash(date) | Doğrudan çalıştır | Hafızayı yükle, günlük not oluştur, görevleri gözden geçir |
| `/sync` | Gün ortası (3-4 saat sonra) | Read, Write, Edit, Bash(date), Agent | Doğrudan çalıştır | Hafızayı tazele, not defterini işle, görevleri gözden geçir |
| `/wrap-up` | İş gününün sonu | Read, Write, Edit, Bash(date), Agent | Doğrudan çalıştır | Günlük denetim, bilgiyi dışsallaştır, yarını hazırla |
| `/standup` | Gün başlangıcı (hızlı mod) | Read, Edit, Glob, Bash(git,date) | Doğrudan çalıştır | Git + görevlerden dün/bugün/engeller otomatik oluştur |
| `/clear` | Bağlam baskısı veya görev tamamlanması | Read, Write, Edit, Bash(date) | Doğrudan çalıştır | Durumu damıt, bağlamı temizle, otomatik devam et |

## Kalite ve İnceleme

| Komut | Tetikleyici | Araçlar | Mod | Açıklama |
|-------|-------------|---------|-----|----------|
| `/audit [kapsam]` | Bir görev/özellik tamamlandıktan sonra | Read, Agent, Write, Edit | Doğrudan çalıştır | Kalite incelemesini Denetçi agent'ına devret |
| `/review [hedef]` | Kod birleştirme öncesi | Read, Agent, Glob, Grep, Bash(git) | Doğrudan çalıştır | Derin kod incelemesi — güvenlik + performans + mimari |
| `/system-audit` | Aylık veya büyük değişikliklerden sonra | Read, Glob, Grep, Agent, Write, Edit, Bash(date,wc,find) | Doğrudan çalıştır | Tüm sistemin derin altyapı denetimi |
| `/drift-detect` | Aylık veya davranış tuhaflaştığında | Read, Agent, Glob, Grep, Bash(wc,find,date) | Doğrudan çalıştır | Config sapmasını tespit et — eski kurallar, çelişkiler, yetimler |
| `/retro [dönem]` | Sprint/hafta sonu | Read, Write, Edit, Glob, Agent, Bash(date) | Doğrudan çalıştır | Sprint retrospektifi — kalıpları analiz et, süreci iyileştir |
| `/debt-map [dizin]` | Sprint planlaması öncesi | Read, Agent, Glob, Grep, Bash(git,wc,find) | Doğrudan çalıştır | Codebase genelinde teknik borcu haritalandır ve önceliklendir |

## Problem Çözme

| Komut | Tetikleyici | Araçlar | Mod | Açıklama |
|-------|-------------|---------|-----|----------|
| `/unstick [problem]` | 10+ dakika tıkalıyken | Read, Agent, Grep, Glob, WebSearch | Doğrudan çalıştır | Çözümleyici agent'ı ile kök neden analizi |
| `/onboard [proje]` | Tanımadığın codebase'de çalışmaya başlarken | Read, Agent, Glob, Grep, Bash(git,find,wc,ls) | Doğrudan çalıştır | Tam codebase tanıştırma rehberi oluştur |

## Planlama ve Strateji

| Komut | Tetikleyici | Araçlar | Mod | Açıklama |
|-------|-------------|---------|-----|----------|
| `/brief [fikir]` | Yeni proje başlatırken | Read, Write, Edit, Agent, Glob, Bash(date) | Doğrudan çalıştır | Ham fikri yapılandırılmış proje özetine dönüştür |
| `/launch [ürün]` | Ürün/özellik lansmanına hazırlanırken | Read, Write, Edit, Agent, Glob, Grep, WebSearch, WebFetch, Bash(date) | Doğrudan çalıştır | Tam lansman hattı — rekabet taramasından pazara giriş kontrol listesine |
| `/proposal [proje]` | Müşteri teklif istediğinde | Read, Write, Edit, Agent, Glob, Bash(date) | Doğrudan çalıştır | Kapsam ve fiyatlandırma ile yapılandırılmış müşteri teklifi oluştur |
| `/competitive-intel [pazar]` | Yeni pazara girerken veya konumu değerlendirirken | Read, Write, Edit, Agent, Glob, WebSearch, WebFetch, Bash(date) | Doğrudan çalıştır | Stratejik önerilerle derin rekabet analizi |

## İletişim ve Teslimat

| Komut | Tetikleyici | Araçlar | Mod | Açıklama |
|-------|-------------|---------|-----|----------|
| `/report [konu]` | Paydaşlara bulguları sunman gerektiğinde | Read, Write, Edit, Agent, Glob, Grep, Bash(date) | Doğrudan çalıştır | Hedef kitleye uygun profesyonel rapor oluştur |
| `/release [versiyon]` | Yeni versiyon yayınlarken | Read, Write, Edit, Glob, Grep, Bash(git,date) | Doğrudan çalıştır | Otomatik sürüm notları — teknik + pazarlama + yönetici |
| `/handoff [alıcı]` | İşi başka birine veya yapay zekaya devretirken | Read, Write, Edit, Glob, Grep, Bash(git,date) | Doğrudan çalıştır | Tam bağlam brifingleriyle yapılandırılmış oturum devri |

## Sistem Geliştirme

| Komut | Tetikleyici | Araçlar | Mod | Açıklama |
|-------|-------------|---------|-----|----------|
| `/playbook [isim]` | Manuel bir iş akışını tekrarlıyorken | Read, Write, Edit, Glob, Bash(date) | Doğrudan çalıştır | İş akışını kaydet ve yeniden kullanılabilir komut otomatik oluştur |

## Otomatik Tetikleme Koşulları

Komutlar, tetikleme koşulları eşleştiğinde proaktif olarak çalıştırılmalıdır (kullanıcıyı beklemeden):

| Koşul | Komut |
|-------|-------|
| Yeni oturum başlıyor | `/start` (sabahsa) veya `/standup` (hızlıysa) |
| Oturumda 30+ araç çağrısı | `/clear` |
| Sıkıştırma uyarısı | `/clear` (acil mod) |
| Çok adımlı görev tamamlandı | `/clear` düşün |
| Kalite düşmüş hissediliyor | `/clear` |
| 10+ dakika tıkalı | `/unstick` |
| Özellik/görev tamamlandı | `/audit` |
| Kod birleştirme öncesi | `/review` |
| Tanımadığın projeye başlıyorsun | `/onboard` |
| İşi başkasına devrediyorsun | `/handoff` |
| Sistem davranışı tuhaflaştı | `/drift-detect` |

## Çalıştırma Modları

- **Doğrudan çalıştır**: Komut dosyasını oku ve prosedürü doğrudan uygula
- **Öner**: Orkestratör için `RECOMMEND: /komut [argümanlar] — [neden]` çıktısı ver
