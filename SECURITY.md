# Güvenlik Politikası

Kalfa için güvenlik açıklarını sorumlu şekilde bildirmenizi rica ederiz.

## Desteklenen Sürümler

Şu anda yalnızca aşağıdaki sürümler güvenlik güncellemesi alır:

* `main` dalındaki en güncel kod
* Varsa en güncel yayın (latest release)

Eski commit'ler ve geçmiş sürümler için geriye dönük güvenlik yaması garantisi verilmez.

## Güvenlik Açığı Bildirme

Hassas güvenlik sorunlarını herkese açık issue olarak paylaşmayın.

Bildirim için tercih edilen yöntemler:

1. GitHub Security Advisory (önerilen)
2. E-posta: `hey@komunite.com.tr`

Bildirimde şu bilgileri paylaşın:

* Etkilenen dosya/akış
* Açığın teknik açıklaması
* Yeniden üretme adımları
* Olası etki (veri sızıntısı, yetki yükseltme, komut enjeksiyonu vb.)
* Varsa PoC veya log çıktısı

## Yanıt Süreci

* İlk geri dönüş hedefi: 3 iş günü
* İlk teknik değerlendirme hedefi: 7 iş günü
* Kritik açıklar için öncelikli düzeltme uygulanır

Duruma göre sizden ek doğrulama bilgisi veya yeniden üretim ortamı istenebilir.

## Sorumlu Açıklama

* Düzeltme hazır olmadan önce açığı kamuya açık paylaşmayın.
* Düzeltme sonrası, gerekiyorsa etki ve çözüm özeti yayınlanır.
* Talep edilirse katkınız güvenlik bildirimlerinde teşekkür notu olarak belirtilir.

## Güvenlik Kapsamı Notları

Kalfa bir çalışma sistemi katmanıdır (`.claude/commands`, `.claude/hooks`, `.claude/skills`).
Güvenlik değerlendirmelerinde özellikle şu alanlara odaklanın:

* Hook güvenlik kontrolleri
* Dosya yazma/üzerine yazma güvenliği
* Gizli bilgi sızıntısı riski
* Tehlikeli komut engelleme davranışı
