---
description: Sistem yapılandırma sapmasını tespit et - eski kuralları, çelişkileri ve sahipsiz dosyaları bul
argument-hint: ""
allowed-tools:
  - Read
  - Agent
  - Glob
  - Grep
  - Bash(wc:*, find:*, date:*)
---

Öz-izleme komutu. Tüm Claude Code yapılandırmanızı sapma açısından tarar — eski kurallar, çelişkiler, sahipsiz dosyalar ve yapılandırma tutarsızlıkları.

## Adımlar

### Adım 1: Sistem dosyalarını tara (paralel)

Tüm yapılandırma kaynaklarını eşzamanlı oku:
- `CLAUDE.md` — proje talimatları
- `.claude/memory.md` — aktif hafıza
- `.claude/knowledge-base.md` — öğrenilmiş kurallar
- `.claude/settings.json` — hook yapılandırması
- `.claude/command-index.md` — komut kaydı (varsa)

### Adım 2: Çelişkileri kontrol et

**CLAUDE.md içinde:**
- Çelişkili talimatlar var mı? (örn. "her zaman X yap" ve "asla X yapma")
- Var olmayan dosya veya dizinlere referanslar var mı?
- Tanımlanmamış komut veya agent'lara referanslar var mı?

**CLAUDE.md ve Bilgi Tabanı arasında:**
- Bilgi Tabanı, CLAUDE.md ile çelişen kurallar içeriyor mu?
- Her iki dosyada tekrarlanan kurallar var mı?

**Hafıza ve gerçeklik arasında:**
- Hafıza, artık var olmayan görevlere, dosyalara veya durumlara referans veriyor mu?
- Açıkça eski olan "mevcut odak" öğeleri var mı?

### Adım 3: Sahipsiz dosyaları kontrol et

Şunları tara:
- **Sahipsiz komutlar:** `.claude/commands/` içinde olup command-index.md'de referans verilmeyen dosyalar
- **Sahipsiz agent'lar:** Hiçbir komut veya skill'in çağırmadığı agent tanımları
- **Sahipsiz skill'ler:** Hiçbir komut, agent veya CLAUDE.md tarafından referans verilmeyen skill'ler
- **Ölü referanslar:** Var olmayan dosya, URL veya yol isimleri
- **Kullanılmayan hook'lar:** Var olan ama settings.json'da bağlanmamış hook betikleri

### Adım 4: Eskimişliği kontrol et

- **Memory.md:** "Şimdi" bölümü 3 günden eski mi?
- **Bilgi Tabanı girdileri:** Güncel olmayan araçlara, API'lere veya kalıplara referans veren var mı?
- **Günlük Notlar:** Arşivlenmesi gereken 30+ günlük günlük notlar var mı?
- **Görev Panosu:** Bir haftadan fazla "devam ediyor" durumunda olan görevler var mı?

### Adım 5: Yapılandırma sağlığını kontrol et

- **settings.json:** Geçerli JSON mı? Tüm hook betikleri çalıştırılabilir mi?
- **CLAUDE.md boyutu:** Çok mu büyüyor? (>500 satır uyarıdır)
- **Memory.md boyutu:** Sınırlar içinde mi? (<100 satır hedef)
- **Bilgi Tabanı boyutu:** Sınırlar içinde mi? (<200 satır hedef)

### Adım 6: Sapma raporunu oluştur

```markdown
# Sapma Tespit Raporu

**Tarih:** [tarih]
**Durum:** [TEMİZ / UYARILAR / SORUNLAR BULUNDU]

## Bulunan Çelişkiler
- [dosya referanslarıyla çelişki]

## Sahipsiz Kalemler
- [sahipsiz dosya veya referans]

## Eski Kalemler
- [eski hafıza, görev veya referans]

## Yapılandırma Sağlığı
| Kontrol | Durum | Not |
|---------|-------|-----|
| settings.json geçerli | Geçti/Kaldı | |
| CLAUDE.md boyutu | [satır] | [tamam / uyarı] |
| memory.md boyutu | [satır] | [tamam / uyarı] |
| Bilgi Tabanı boyutu | [satır] | [tamam / uyarı] |
| Hook betikleri çalıştırılabilir | Geçti/Kaldı | |

## Önerilen Eylemler
1. [Belirli düzeltme]
2. [Belirli düzeltme]
3. [Belirli düzeltme]

---
Aylık veya sistem davranışı tuhaf hissettirdiğinde çalıştırın.
```

Durum satırını ve kritik sorunları çıktıla. Sorunlar basitse otomatik düzeltmeyi öner.
