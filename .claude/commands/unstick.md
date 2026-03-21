---
description: Bir problemde takıldığında - hızlıca çözüm bul
argument-hint: "[takıldığın şey]"
allowed-tools:
  - Read
  - Agent
  - Grep
  - Glob
  - WebSearch
---

Bir engeli aş. Kök neden analizi ve yeni yaklaşımlar için Çözümleyici agent'ını kullanır.

## Adımlar

### Adım 1: Takılma durumunu yakala

Kullanıcı neye takıldığını anlattıysa onu kullan. Aksi halde şuralardan çıkar:
- Mevcut memory.md → Şimdi
- Son günlük not girdileri
- Bağlamdaki son birkaç araç çağrısı

Engeli bir cümlede ifade et: "[Y] nedeniyle [X]'de takıldım."

### Adım 2: Engeli sınıflandır

| Tür | Sinyaller | Yaklaşım |
|-----|-----------|----------|
| **Bilgi boşluğu** | "Nasıl yapılacağını bilmiyorum..." | Belgeleri ara, kaynağı oku, Bilgi Tabanı'nı kontrol et |
| **Karar felci** | "Aralarında karar veremiyorum..." | Avantaj/dezavantajları listele, geri alınabilir seçeneği seç |
| **Döngüsel debug** | Aynı hata 3+ kez | Geri adım at, problemi yeniden ifade et, zıt yaklaşımı dene |
| **Kapsam karmaşası** | "Bu düşündüğümden büyük" | Kapsam Bekçisi kontrolü — doğru problemi mi çözüyorsun? |
| **Çevresel** | Build/deploy/config sorunları | Günlükleri kontrol et, ön koşulları doğrula, temiz durumu dene |

### Adım 3: Çözümleyici'yi devreye sok

Çözümleyici agent'ını başlat:

```
Agent(unsticker): [problem]'de takıldım.

Denediklerim: [denemeleri listele]
Hata/belirti: [ne oluyor]
Beklenen: [ne olması gerekiyor]

Bunu parçala. Neyi kaçırıyorum?
```

### Adım 4: Öneriyi uygula

Çözümleyici'nin en iyi önerisini al ve hemen dene.
Kararsız kalma — harekete geç. Takılmaktan çıkmanın en hızlı yolu ilerlemektir.

### Adım 5: Çözümü kaydet

Çözüldüyse, günlük nota ekle:
```markdown
### Çözüm — SS:DD
- **Engel:** [ne takılmıştı]
- **Kök neden:** [neden]
- **Düzeltme:** [ne işe yaradı]
```

Düzeltme bir kalıp ortaya çıkarıyorsa, knowledge-nominations.md'ye aday göster.
