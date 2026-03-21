---
description: Tüm işletim sisteminin derin altyapı denetimi
argument-hint: ""
allowed-tools:
  - Read
  - Glob
  - Grep
  - Agent
  - Write
  - Edit
  - Bash(date:*,wc:*,find:*)
---

Kapsamlı altyapı denetimi. Aylık veya büyük sistem değişikliklerinden sonra çalıştırın.

## Kontroller

### Kontrol 1: Agent Sağlığı
- `.claude/agents/*.md` içindeki her dosyayı oku
- Her birinin geçerli frontmatter'a (---) sahip olduğunu doğrula
- TBD/TODO işaretçisi olmadığını doğrula
- Referans verilen araçların var olduğunu kontrol et
- İhtiyaç duyan agent'lar için agent-memory dizinlerinin var olduğunu kontrol et

### Kontrol 2: Komut Sağlığı
- `.claude/commands/*.md` içindeki her dosyayı oku
- Her birinin geçerli frontmatter'a sahip olduğunu doğrula
- allowed-tools'ların makul olduğunu kontrol et
- Diğer komutlara kırık çapraz referans olmadığını doğrula

### Kontrol 3: Hook Sağlığı
- `.claude/settings.json`'ın geçerli JSON olduğunu doğrula
- settings.json'da referans verilen her hook betiğinin var olduğunu kontrol et
- Tüm hook betiklerinin çalıştırılabilir olduğunu doğrula (chmod +x)
- Kuru test çalıştır: her hook boş girişle 0 çıkış kodu vermeli

### Kontrol 4: Hafıza Katmanı Sağlığı
- `memory.md`: 100 satırın altında mı? "Şimdi" güncel mi?
- `knowledge-base.md`: 200 satırın altında mı? Tüm girdilerin [Source:]'u var mı?
- `knowledge-nominations.md`: Eski adaylıklar var mı (>30 gün)?
- `agent-memory/`: Dizinler mevcut agent'larla eşleşiyor mu?
- Günlük Notlar: Son notlar mevcut mu?

### Kontrol 5: Günlük Sağlığı
- `audit-trail.md`: 5000 satırın altında mı?
- `incident-log.md`: Çözülmemiş CRITICAL/HIGH olaylar var mı?
- `failure-log.md`: Tekrarlayan kalıplar var mı?
- `verdicts.jsonl`: Engelleme oranı ne? Görev türü kümelenmesi var mı?

### Kontrol 6: İzin ve Config Tutarlılığı
- `.claude/settings.json` hook'ları gerçek hook dosyalarıyla eşleşiyor
- Sahipsiz hook betikleri yok (var ama referans verilmemiş)
- Eksik hook betikleri yok (referans verilmiş ama yok)

### Kontrol 7: Dosyalar Arası Tutarlılık
- CLAUDE.md referansları gerçek dosya konumlarıyla eşleşiyor
- Command-index.md gerçek komutlarla eşleşiyor
- Komutlar arasında döngüsel bağımlılık yok

### Kontrol 8: Yedekleme ve Depolama
- `.claude/backups/`: Otomatik budama çalışıyor mu? (>7 gün eski dizin yok)
- Proje kökünde olmaması gereken büyük dosyalar var mı?

### Kontrol 9: Via Negativa Taraması
- Hiç kullanılmayan dosya/agent/komut var mı?
- Kayıp olmadan kaldırılabilecek hook var mı?
- Agent'lar arasında tekrarlanan mantık var mı?
- Kaldırma öner — basit olan daha iyidir

## Derecelendirme

| Derece | Kriter |
|--------|--------|
| A | Tüm kontroller geçti, sorun yok |
| B | Yalnızca küçük sorunlar (kozmetik, engelleyici olmayan) |
| C | Dikkat gerektiren bazı sorunlar (eksik kaynak, eski adaylıklar) |
| D | Yapısal sorunlar (kırık hook'lar, geçersiz JSON, eksik agent'lar) |
| F | Kritik başarısızlıklar (güvenlik sorunları, veri kaybı riski) |

## Çıktı

Sonuçları günlük nota şu başlık altında yaz:
```markdown
## Sistem Denetimi — AAGGYY

**Derece:** [A-F]
**Kontroller:** [geçen]/9
**Sorunlar:** [önem derecesiyle maddeler]
**Eylemler:** [varsa düzeltici görevler]
```

D veya F dereceli sorunlar için Görev Panosu'nda düzeltici görevler oluştur.
