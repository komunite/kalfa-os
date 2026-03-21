---
description: Git geçmişinden hedef kitleye uygun sürüm notları oluştur
argument-hint: "[sürüm veya tarih aralığı]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash(git log:*, git tag:*, git diff:*, date:*)
---

Git geçmişinden otomatik sürüm notları oluştur. Aynı veriden hedef kitleye uygun sürümler üretir — teknik değişiklik günlüğü, pazarlama duyurusu veya yönetici özeti.

## Adımlar

### Adım 1: Aralığı belirle

Hangi commit'lerin dahil edileceğini belirle:
- Kullanıcı bir sürüm belirttiyse → etiket aralığını bul (örn. `git log v1.2.0..v1.3.0`)
- Kullanıcı tarih belirttiyse → tarih aralığını kullan (`git log --after="2025-01-01" --before="2025-02-01"`)
- Hiçbir şey belirtilmediyse → son etiketten bu yana değişiklikler (`git log $(git describe --tags --abbrev=0)..HEAD`)

### Adım 2: Commit verilerini topla

```bash
git log [aralık] --format="%h %s" --no-merges
```

Ayrıca kontrol et:
- Varsa PR açıklamaları (merge commit mesajları için `git log --merges`)
- Mevcut CHANGELOG girdileri
- Kapsamı anlamak için değiştirilen dosyalar (`git diff --stat [aralık]`)

### Adım 3: Değişiklikleri kategorize et

Her değişikliği şuna göre sınıflandır:

| Kategori | Simge | Örnek |
|----------|-------|-------|
| **Yeni Özellikler** | Eklendi | Yeni yetenek, yeni endpoint, yeni bileşen |
| **İyileştirmeler** | Değiştirildi | Performans artışı, UX iyileştirmesi, yeniden yapılandırma |
| **Hata Düzeltmeleri** | Düzeltildi | Çözülen sorun, düzeltilen davranış |
| **Kırıcı Değişiklikler** | Kırıcı | API değişikliği, kaldırılan özellik, geçiş gerekli |
| **Bağımlılıklar** | Bağımlılıklar | Güncellenen paketler, yeni bağımlılıklar |
| **Dahili** | Dahili | Testler, CI, belgeler, yeniden yapılandırma |

### Adım 4: Sürüm notlarını yaz (3 versiyon)

**Versiyon 1 — Teknik Değişiklik Günlüğü** (geliştiriciler için):
```markdown
# [Sürüm] — [Tarih]

## Kırıcı Değişiklikler
- [geçiş talimatlarıyla değişiklik]

## Yeni Özellikler
- [özellik]: [açıklama] ([commit hash])

## İyileştirmeler
- [iyileştirme] ([commit hash])

## Hata Düzeltmeleri
- [düzeltme] ([commit hash])

## Bağımlılıklar
- [paket] [eski] sürümünden [yeni] sürümüne güncellendi
```

**Versiyon 2 — Pazarlama Duyurusu** (müşteriler/genel kitle için):
```markdown
# [Sürüm]'deki Yenilikler

[1-2 cümlelik çekici giriş — en heyecan verici değişiklik]

### [Özellik Adı]
[Fayda odaklı açıklama — nasıl çalıştığı değil, kullanıcı için ne anlama geldiği]

### [İyileştirme]
[Kullanıcıya yönelik iyileştirme, varsa öncesi/sonrası ile]

### Hata Düzeltmeleri
[Özet — "X dahil olmak üzere X sorun düzeltildi..." — commit hash'leri yok]
```

**Versiyon 3 — Yönetici Özeti** (paydaşlar için):
```markdown
# Sürüm Özeti — [Sürüm]

**Etki:** [bir cümle — bu sürümün ne başardığı]

**Temel değişiklikler:**
- [İş etkisi çerçevelemesiyle ilk 3 değişiklik]

**Metrikler:**
- [X] özellik eklendi
- [X] hata düzeltildi
- [X] dosya değiştirildi

**Risk:** [kırıcı değişiklikler veya geçiş ihtiyaçları — veya "Yok"]
```

### Adım 5: Kaydet ve çıktıla

`releases/[sürüm]-release-notes.md` dosyasına üç versiyonla birlikte kaydet.

Varsayılan olarak pazarlama versiyonunu çıktıla (en sık ihtiyaç duyulan) ve diğer versiyonların dosyada olduğunu belirt.
