---
description: Hızlı git durumu özeti - aktif alan, çalışma alanı, kritik sinyaller, sonraki adım
argument-hint: ""
allowed-tools:
  - Read
  - Bash(git status:*, git branch:*, git rev-parse:*, git rev-list:*, git diff:*, git ls-files:*)
---

Kısa, read-only durum özeti üret. Yalnızca git tabanlı veri kullan. Hiçbir dosyaya yazma.

## Adımlar

### Adım 1: Git repo kontrolü

Önce şunu çalıştır:

```bash
git rev-parse --is-inside-work-tree
```

Başarısız olursa şu fallback bloğunu yazdır ve dur:

```text
Durum: git repo değil
Focus: unavailable
Workspace: unavailable
Git: unavailable
Risk: none
Sonraki: bu komutu bir git reposu içinde çalıştır
```

### Adım 2: Git durumunu topla (paralel)

Şunları topla:

**Branch adı:**

```bash
git branch --show-current
```

Boşsa `detached HEAD` kullan.

**Ana durum çıktısı:**

```bash
git status --short --branch
```

**Merge conflict sinyali:**

```bash
git diff --name-only --diff-filter=U
```

**Untracked dosyalar:**

```bash
git ls-files --others --exclude-standard
```

**Tracking branch kontrolü:**

```bash
git rev-parse --abbrev-ref --symbolic-full-name @{upstream}
```

Başarılıysa ahead/behind sayısını al:

```bash
git rev-list --left-right --count HEAD...@{upstream}
```

Başarısızsa tracking yok kabul et.

### Adım 3: Alanları türet

#### Durum

- Branch adı varsa kullan
- Yoksa `detached HEAD`

#### Focus

Sadece `Workspace` için hesaplanan benzersiz path listesinden türet. Anlamsal etiket üretme; yalnızca path prefix kullan.

Kurallar:

1. Path listesi boşsa `clean workspace`
2. Tek path varsa:
   - parent directory varsa onu kullan
   - yoksa dosya yolunun kendisini kullan
3. Hem `.claude/commands/*` path'leri hem de `.claude/command-index.md` varsa focus olarak `.claude/commands` kullan
4. Bir directory prefix benzersiz path'lerin yarısından fazlasını kapsıyorsa en derin geçerli prefix'i kullan
5. Ortak baskın prefix yoksa `mixed changes`

#### Workspace

- Hiç değişiklik yoksa tam olarak `Workspace: clean`
- Değişiklik varsa benzersiz path sayısını hesapla ve en fazla 2-3 örnek path göster:

```text
Workspace: <N changed> (<örnek path 1>, <örnek path 2>, <örnek path 3>)
```

Staged, unstaged, untracked ve unmerged path'leri tek listede düşün; aynı path'i iki kez sayma.

Deterministik kurallar:

- Örnek path'leri leksikografik sırayla seç
- En fazla ilk 3 örneği göster
- Hiçbir durumda ikinci bir `Workspace` satırı ekleme

#### Git

Tek satırda özetle:

- Çalışma alanı temizse `clean`, aksi halde `dirty`
- Tracking varsa:
  - tam biçim `clean/dirty • ahead X / behind Y`
- Tracking yoksa:
  - tam biçim `clean/dirty • tracking unavailable`

Örnekler:

```text
Git: clean • ahead 0 / behind 0
Git: dirty • ahead 1 / behind 0
Git: dirty • tracking unavailable
```

#### Risk

Tek satır yaz. En fazla 2-3 kritik sinyal göster. Hiçbiri yoksa tam olarak `Risk: none` yaz.

Sadece şu sinyaller geçerli:

- `merge conflict`
- `branch diverged`
- `dirty workspace`
- `<N> untracked files`

Kurallar:

- Merge conflict varsa en yüksek öncelik
- `branch diverged` yalnızca hem ahead hem behind > 0 ise
- Dirty workspace sinyali yalnızca tracked veya staged değişiklik varsa
- Untracked dosyalar ayrı sinyal olabilir
- En fazla ilk 3 sinyali göster, fazlasını ekleme

Örnek:

```text
Risk: merge conflict; dirty workspace
Risk: branch diverged; 3 untracked files
Risk: none
```

#### Sonraki

Tek ve net aksiyon ver:

Mapping sırası sabit olsun:

1. Unmerged path varsa: `çatışmaları çöz ve tekrar durum kontrol et`
2. Tracking var ve ahead > 0 ve behind > 0 ise: `branch'i sync et ve sonra değişikliklere dön`
3. Tracking var ve behind > 0 ise: `upstream değişikliklerini al ve tekrar kontrol et`
4. Tracked veya staged değişiklik varsa: `değişiklikleri gözden geçir ve commit'e hazırla`
5. Yalnızca untracked dosyalar varsa: `untracked dosyaları ekle ya da yok say`
6. Tracking yoksa: `branch tracking ayarla veya local değişiklikle devam et`
7. Workspace temiz ve tracking var ve ahead > 0 ise: `yerel commit'leri push et`
8. Workspace temiz ve tracking var ve ahead 0 / behind 0 ise: `yeni iş için branch aç veya bir sonraki göreve başla`

### Adım 4: Çıktıyı yazdır

Çıktı kısa, sabit ve deterministik olmalı. Hedef 6-8 satır; hiçbir durumda 15 satırı geçme.

Sert kural:

- Normal durumda yalnızca bu 6 satırı yaz
- Fallback durumda da yalnızca bu 6 satırı yaz
- Ek açıklama, ikinci blok, dipnot veya uzun liste ekleme
- Satır sınırına yaklaşılırsa örnek path ve risk sinyallerini kısalt; yeni satır ekleme

Tam biçim:

```text
Durum: ...
Focus: ...
Workspace: ...
Git: ...
Risk: ...
Sonraki: ...
```

Clean workspace örneği:

```text
Durum: main
Focus: clean workspace
Workspace: clean
Git: clean • ahead 0 / behind 0
Risk: none
Sonraki: yeni iş için branch aç veya bir sonraki göreve başla
```

Uzun açıklama, ek paragraf veya ikinci rapor bloğu üretme.
