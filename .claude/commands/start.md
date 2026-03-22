---
description: Güne başla - hafızayı yükle, görev panosunu aç, çalışmaya hazır. Yeni kurulumda otomatik onboarding yapar.
argument-hint: ""
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(date:*)
  - Glob
  - Grep
---

Bir çalışma oturumu başlat. İlk çalıştırmada otomatik onboarding yapar. Sonraki çalıştırmalarda bağlamı yükleyip günü açar.

## Adımlar

### Adım 0: İlk kurulum kontrolü

`memory.md`'yi oku. İçeriğinde proje adı veya açıklaması yoksa (sadece varsayılan şablon varsa), bu yeni bir kurulumdur. **Adım A'ya git** (onboarding).

Proje bilgisi zaten varsa **Adım 1'e atla** (normal gün başlangıcı).

---

## YENİ KURULUM: Otomatik Onboarding (Adım A-E)

### Adım A: Projeyi tara

Sessizce şunları yap (kullanıcıya çıktı verme, sadece topla):
- Kök dizindeki dosya ve klasörleri listele
- `package.json`, `Cargo.toml`, `go.mod`, `requirements.txt`, `pyproject.toml`, `Gemfile` gibi bağımlılık dosyalarını ara
- Varsa `package.json` oku (proje adı, bağımlılıklar, script'ler)
- Varsa `README.md` oku (ilk 50 satır)
- Dil ve framework'ü tespit et
- `.claude/skills/SOLOPRENEUR-REHBER.md` dosyasını oku

### Adım B: Bulgularını özetle ve sor

Kullanıcıya kısa bir özet göster:

```
Projeyi taradım:
- Dil: [tespit edilen]
- Framework: [tespit edilen]
- Yapı: [monolith/monorepo/vs]

Seni daha iyi tanımak için birkaç sorum var:
```

Sonra şu 4 soruyu sor:
1. **Bu projenin amacı ne?** (bir cümleyle)
2. **Hedef kitlen kim?** (kime satıyorsun/kime hizmet ediyorsun)
3. **Şu an en çok neye zaman harcıyorsun?** (kodlama, pazarlama, müşteri bulma, içerik üretme...)
4. **Otomatikleştirmek veya hızlandırmak istediğin şey ne?**

### Adım C: Hafızayı oluştur

Cevaplara ve tarama bulgularına göre `memory.md`'yi güncelle:

```markdown
# Hafıza

## Proje
- **Ad:** [proje adı]
- **Açıklama:** [bir cümle]
- **Dil/Framework:** [tespit edilen]
- **Hedef Kitle:** [kullanıcının cevabı]

## Şimdi
- Proje kurulumu tamamlandı

## Açık Konular
- (henüz yok)

## Son Kararlar
- (henüz yok)

## Engeller
- (yok)
```

### Adım D: Skill önerileri

Kullanıcının cevaplarına göre solopreneur rehberinden en uygun skill zincirini öner:

- Yeni ürün → **Zincir 1: Sıfırdan İlk Müşteriye**
- Lansman aşaması → **Zincir 2: Ürün Lansmanı**
- İçerik/SEO büyümesi → **Zincir 3: İçerik ile Büyüme**
- Müşteri bulma → **Zincir 4: Satış Makinesi**
- Verimlilik → **Zincir 5: Yapay Zeka ile Verimlilik**

### Adım E: Normal gün başlangıcına geç

Onboarding tamamlandıktan sonra Adım 1'e devam et.

---

## NORMAL GÜN BAŞLANGICI (Adım 1-6)

### Adım 1: Bugünün tarihini al

```bash
date +"%m%d%y %H:%M %A"
```

### Adım 2: Hafızayı yükle (paralel okumalar)

Eşzamanlı oku:
- `.claude/memory.md`
- `.claude/knowledge-base.md`

Bunlar çalışma bağlamındır. Bilgi Tabanı girdileri zorunlu kısıtlamalardır.

### Adım 3: Günlük not oluştur

`.claude/workspace/DailyNotes/GGAAYY.md` oluştur (yoksa):

```markdown
# GGAAYY - Günlük Çalışma Kaydı

## Kararlar
-

## Toplantılar ve Görüşmeler
-

## Notlar
-

## Gün Sonu Özeti
-
```

### Adım 4: Görev panosunu aç

`.claude/workspace/TaskBoard.md` oku. Şunları tara:
- Geciken kalemler (önceki günlerden hâlâ açık olan)
- Bugünün öncelikleri
- Engellenen kalemler

### Adım 5: Görev incelemesi

Bugün'deki her görev için:
1. Hâlâ geçerli mi?
2. Başlamak için ihtiyacım olan her şey var mı?
3. Bağımlılıklar var mı?

Eski görevleri Bekleyen İşler'e taşı. Engellenen kalemleri işaretle.

### Adım 6: Çalışmaya hazır

Kısa bir oryantasyon çıktıla:
- Hangi gün olduğu
- Bugün için ilk 1-3 öncelik
- memory.md'den engeller veya açık konular
- "Çalışmaya hazırım. İlk ne yapalım?"

Kısa tut. Kullanıcı çalışmaya başlamak istiyor, rapor okumak değil.
