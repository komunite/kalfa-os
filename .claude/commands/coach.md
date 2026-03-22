---
description: Yapay zeka koçunu çalıştır — çalışma kalıplarını analiz et, proaktif öneriler al
argument-hint: "[dönem: hafta|ay|hepsi]"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Write
  - Agent
  - Bash(date:*,wc:*,find:*)
---

Yapay zeka koçunu çalıştır. Çalışma kalıplarını analiz edip veriye dayalı öneriler sunar.

## Adımlar

### Adım 1: Analiz dönemini belirle

Argüman verilmişse:
- `hafta` → son 7 gün
- `ay` → son 30 gün
- `hepsi` → tüm mevcut veri

Argüman yoksa → varsayılan `hafta`

### Adım 2: Veri topla (paralel okumalar)

Eşzamanlı oku:
- `.claude/memory.md`
- `.claude/workspace/TaskBoard.md`
- `.claude/agent-memory/coach/MEMORY.md` (koçun önceki gözlemleri)

### Adım 3: Günlük notları tara

```bash
# Son 7 günün günlük notlarını bul
find .claude/workspace/DailyNotes/ -name "*.md" -mtime -7 -type f | sort
```

Bulunan günlük notları oku. Eğer günlük not yoksa veya az varsa, bunu bir bulgu olarak not et ("Günlük not tutulmuyor — veri eksik, koçluk sınırlı olacak").

### Adım 4: Koç agent'ını çalıştır

Koç agent'ına şu bağlamı ver:
- Günlük notlardan: aktiviteler, kararlar, oturum devirleri
- Görev panosundan: açık/tamamlanan/geciken görevler
- Koç hafızasından: önceki gözlemler ve verilen öneriler

Agent şu 4 analizi yapacak:
1. **Verimlilik analizi** — görev tamamlama, üretken günler, zaman dağılımı
2. **Büyüme analizi** — içerik üretim sıklığı, satış pipeline, kanal çeşitliliği
3. **Sürdürülebilirlik analizi** — tükenmişlik sinyalleri, oturum süreleri, engel yoğunluğu
4. **Kaçırılan fırsat analizi** — yapılan ama genişletilmeyen işler, tekrarlayan manuel süreçler

### Adım 5: Önceki önerileri takip et

Koç hafızasındaki son önerileri kontrol et:
- Uygulandıysa → olumlu pekiştirme ("Geçen haftaki önerimi uyguladın, güzel")
- Uygulanmadıysa → nazikçe sor, zorla değil ("Geçen haftaki X önerisine fırsat buldun mu?")
- 3 hafta üst üste uygulanmadıysa → öneriyi düşür (kullanıcı istemiyordur)

### Adım 6: Raporu sun

Koç raporunu kullanıcıya göster. Format:

```
🎯 Koç Raporu — [tarih]

📊 Veri Özeti
[analiz edilen dönem ve kaynak sayısı]

✅ İyi Giden
- [olumlu kalıp 1]
- [olumlu kalıp 2]

⚠️ Dikkat
- [sinyal + spesifik öneri]

💡 Fırsat
- [kaçırılan fırsat + aksiyon]

🏆 Bu Haftanın 1 Numaralı Tavsiyesi
> [tek, net, uygulanabilir öneri]
```

### Adım 7: Koç hafızasını güncelle

`.claude/agent-memory/coach/MEMORY.md` dosyasını güncelle:
- Yeni gözlemleri ekle
- Verilen önerileri kaydet
- Kalıp trendlerini güncelle (iyileşiyor/kötüleşiyor/stabil)
