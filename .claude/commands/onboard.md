---
description: Yeni bir kod tabanına katılım - mimari tarama, kilit kararlar, ilk görevler
argument-hint: "[proje dizini veya repo URL'si]"
allowed-tools:
  - Read
  - Agent
  - Glob
  - Grep
  - Bash(git log:*, find:*, wc:*, ls:*)
---

Yeni proje katılımı. Bir kod tabanını tarar ve kapsamlı bir oryantasyon oluşturur: mimari, kilit kararlar, bağımlılık haritası, ortam kurulumu ve ilk görevler.

## Adımlar

### Adım 1: Projeyi bul

Kullanıcı bir dizin belirttiyse onu kullan. Aksi halde mevcut çalışma dizinini kullan.

Gerçek bir proje olduğunu doğrula (package.json, Cargo.toml, pyproject.toml, go.mod veya dengi var mı).

### Adım 2: Yapısal tarama (paralel)

**Tarama 1 — Proje kimliği:**
- Varsa README, CONTRIBUTING, CHANGELOG dosyalarını oku
- Metadata için package.json / Cargo.toml / pyproject.toml oku
- Belirle: dil, framework, derleme aracı, test framework'ü
- Say: toplam dosya, kod satır sayısı, bağımlılık sayısı

**Tarama 2 — Mimari:**
- Dizin yapısını haritalandır (ilk 3 seviye)
- Mimari kalıbı belirle (MVC, altıgen, monolitik, mikroservisler, sunucusuz)
- Giriş noktalarını bul (ana dosyalar, rota tanımları, işleyiciler)
- Config dosyalarını bul (env, yaml, json config'ler)

**Tarama 3 — Kilit dosyalar:**
- En çok değiştirilen 10 dosyayı bul (`git log --format='' --name-only | sort | uniq -c | sort -rn | head -20`)
- En büyük dosyaları bul (muhtemelen önemli veya sorunlu)
- Test dizinlerini ve test kalıplarını bul

### Adım 3: Bağımlılık analizi

- Sürümleriyle birlikte doğrudan bağımlılıkları listele
- Güncel olmayan veya kullanımdan kaldırılmış paketleri işaretle (büyük sürüm farklarını kontrol et)
- Kritik bağımlılıkları belirle (projenin işleyemeyeceği olanlar)
- Anlaşılmaya değer olağandışı veya niş bağımlılıkları not et

### Adım 4: Kod kalıpları

Belirlemek için 3-5 temsili dosya oku:
- İsimlendirme kuralları (camelCase, snake_case, vb.)
- Hata işleme kalıpları
- Günlükleme yaklaşımı
- Durum yönetimi (önyüz ise)
- Veritabanı erişim kalıpları (arka uç ise)
- Kimlik doğrulama / yetkilendirme yaklaşımı

### Adım 5: Git arkeolojisi

```bash
git log --oneline -20
```

Son geçmişten:
- Aktif olarak ne üzerinde çalışılıyor?
- Ana katkıda bulunanlar kim?
- Commit stili ne? (conventional commits, serbest form, vb.)
- Uzun süredir devam eden branch'ler var mı?

### Adım 6: Katılım rehberini oluştur

`ONBOARDING.md` dosyasına kaydet (veya doğrudan çıktıla):

```markdown
# Katılım Rehberi — [Proje Adı]

## Hızlı Bilgiler
- **Dil:** [dil] / **Framework:** [framework]
- **Mimari:** [kalıp]
- **Kod satır sayısı:** [sayı]
- **Bağımlılıklar:** [doğrudan sayı]
- **Test framework'ü:** [framework]
- **Derleme aracı:** [araç]

## Proje Yapısı
```
[açıklamalı dizin ağacı, ilk 3 seviye]
```

## Önce Okunması Gereken Kilit Dosyalar
1. **[dosya]** — [neden önemli]
2. **[dosya]** — [neden önemli]
3. **[dosya]** — [neden önemli]
4. **[dosya]** — [neden önemli]
5. **[dosya]** — [neden önemli]

## Mimari Genel Bakış
[Sistemin nasıl çalıştığını açıklayan 2-3 paragraf]

## Kod Kalıpları
- **İsimlendirme:** [kural]
- **Hata işleme:** [kalıp]
- **Durum:** [yaklaşım]
- **Kimlik doğrulama:** [yaklaşım]

## Ortam Kurulumu
1. [Yerel olarak çalıştırmak için adım]
2. [Adım]
3. [Adım]

## İlk Görevler
Aşinalık kazanmak için iyi başlangıç görevleri:
1. [Dosya referanslı belirli, küçük görev]
2. [Dosya referanslı belirli, küçük görev]
3. [Dosya referanslı belirli, küçük görev]

## Dikkat Edilmesi Gerekenler
- [Tuzak veya açık olmayan kalıp]
- [Tuzak veya açık olmayan kalıp]

---
Oluşturulma: [tarih]
```

Kısa bir özet çıktıla ve bu kod tabanı hakkında anlaşılması gereken en önemli şeyi vurgula.
