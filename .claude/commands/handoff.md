---
description: Yapılandırılmış oturum devri - başka bir kişiye veya yapay zekaya
argument-hint: "[kime devrediyorsunuz]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash(git log:*, git status:*, git diff:*, date:*)
---

Çalışmayı başka bir kişiye veya yapay zekaya aktarırken yapılandırılmış bir devir brifingleri oluştur. Geçişte hiçbir şeyin kaybolmaması için bağlamı, kararları, riskleri ve sonraki adımları yakalar.

## Adımlar

### Adım 1: Oturum bağlamını topla

Oku:
- `.claude/memory.md` — mevcut durum
- Son günlük not — bugünün çalışma günlüğü
- `.claude/workspace/TaskBoard.md` — aktif görevler ve öncelikler
- `git status` ve `git log --oneline -10` — son değişiklikler

### Adım 2: Yapılanları belirle

Oturum bağlamı ve git geçmişinden şunları listele:
- **Tamamlanan:** Bu oturumda bitirilen görevler
- **Devam eden:** Başlanmış ama bitmemiş işler (mevcut durumlarıyla)
- **Alınan kararlar:** Seçimler ve gerekçeleri
- **Dokunulan dosyalar:** Değiştirilen her dosya ve değişikliğin bir satırlık özeti

### Adım 3: Bekleyenleri belirle

- **Hemen sonraki adımlar:** Sırada ne olmalı (sıralı)
- **Engellenen kalemler:** İlerleyemeyen görevler ve nedenleri
- **Açık sorular:** Girdi gerektiren kararlar
- **Riskler:** Ele alınmazsa ters gidebilecek şeyler

### Adım 4: Alıcının ihtiyaç duyduğu bağlam

- **Proje bağlamı:** Bu proje nedir ve şu anda neyin önemi var?
- **Kilit dosyalar:** En önemli şeyler için nereye bakılmalı
- **Tuzaklar:** Birini yanıltacak açık olmayan şeyler
- **Bağımlılıklar:** Bu çalışmanın bağlı olduğu harici kişiler, hizmetler veya olaylar

### Adım 5: Devir belgesini yaz

`handoffs/handoff-[tarih]-[saat].md` dosyasına kaydet:

```markdown
# Oturum Devri

**Kimden:** [mevcut oturum / isminiz]
**Kime:** [belirtildiyse alıcı, aksi halde "Sonraki oturum"]
**Tarih:** [tarih ve saat]

---

## Durum Özeti
[2-3 cümle: işlerin şu anda nerede olduğu]

## Yapılanlar
- [dosya referanslarıyla tamamlanan görev]
- [tamamlanan görev]

## Devam Edenler
- **[görev]** — Mevcut durum: [nerede olduğu]. Sonraki eylem: [sırada ne yapılacak]

## Alınan Kararlar
| Karar | Gerekçe | Geri alınabilir mi? |
|-------|---------|---------------------|
| [karar] | [neden] | Evet/Hayır |

## Değiştirilen Dosyalar
| Dosya | Değişiklik |
|-------|-----------|
| [yol] | [bir satırlık özet] |

## Sonraki Adımlar (Öncelik Sırasına Göre)
1. [En önemli sonraki eylem]
2. [İkinci öncelik]
3. [Üçüncü öncelik]

## Engellenen Kalemler
- **[kalem]** — Engelleyen: [neden]. Çözmek için: [gereken eylem]

## Açık Sorular
- [Devam etmeden önce yanıtlanması gereken soru]

## Riskler
- [Risk ve ne yapılacağı]

## Okunması Gereken Kilit Dosyalar
- [dosya] — [neden önemli]
- [dosya] — [neden önemli]

## Tuzaklar
- [Sizi yanıltacak açık olmayan şey]

---
Devir tamamlandı. Çalışmaya başlamadan önce bunu okuyun.
```

Kullanıcının doğruluğunu kontrol edebilmesi için özet bölümünü çıktıla.
