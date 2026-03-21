---
description: Bağlamı güvenle temizle ve yeni başla - temizlemeden önce oturum durumunu özetler
argument-hint: ""
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(date:*)
---

Oturum durumunu kalıcı hale getir, ardından sorunsuz şekilde çalışmaya devam et. Kullanıcı bunun olduğunu fark etmemeli.

**Acil durum modu** (Sıkıştırma/prompt-too-long): Okumaları atla, yalnızca bağlam içi hafızadan özetle, Adım 3'e git.

---

## Adımlar

### Adım 0: Kapıyı sıfırla + tarihi al

```bash
date +"%m%d%y %H:%M" && rm -f ".claude/logs/.quality-gate-active" ".claude/logs/.session-blocks-$(date +"%m%d-%H")" ".claude/logs/.tool-call-count" ".claude/logs/.compaction-occurred"
```

### Adım 1: Durumu oku (paralel, acil durumda atla)

Eşzamanlı oku: `.claude/memory.md` + `Daily Notes/MMDDYY.md`

### Adım 2: Oturumu özetle (bağlam içi hafızadan)

**Geri yüklenebilir sıkıştırma** kullanarak çıkar ve sıkıştır — devam eden oturumun sıkıştırılmış formdan tam bağlamı geri yükleyebilmesi için erişim yollarını koru:

1. **Görev** — bir cümle
2. **Yapılan/kalan** — 2-4 madde, süreç değil sonuçlar
3. **Kararlar** — her biri bir satır, NASIL değil NE+NEDEN
4. **Öğrenimler** — Bilgi Adaylıkları için kurallar/gerçekler
5. **Dokunulan dosyalar** — okunan veya değiştirilen her dosyanın tam yolu (sadece değiştirilen değil — kararları etkileyen okunan temel dosyalar da dahil). Bunlar devam eden oturum için erişim çapalarıdır.
6. **Aktif referanslar** — başvurulan URL'ler, API endpoint'leri, harici kaynaklar. İçeriği bırak, işaretçiyi koru.
7. **Sonraki eylem** — önce hangi dosya(lar)ın okunacağı dahil kesin, eyleme dönüştürülebilir talimat

### Adım 3: Devir notunu günlük nota yaz

Ekle (veya yoksa yeni günlük not oluştur):

```markdown
## Oturum Devri — SS:DD

**Görev:** [bir cümle]
**Yapılan:** [maddeler]
**Kalan:** [maddeler]
**Kararlar:** [maddeler]
**Dosyalar:** [tam yollar — hem değiştirilen hem de okunan temel dosyalar]
**Referanslar:** [URL'ler, harici kaynaklar — yalnızca işaretçiler, içerik yok]
**Sonraki:** [kesin eylem + önce hangi dosya(lar)ın okunacağı]
```

### Adım 4: memory.md güncelle (yalnızca değiştiyse)

Yeni öncelikler, konular, kararlar → düzenle. Değişen yok → atla.

### Adım 5: Öğrenimleri terfi ettir ve aday göster (yalnızca keşfedildiyse)

**İki seviyeli terfi:**

**Seviye 1: `knowledge-base.md`'ye doğrudan terfi** (yüksek güvenilirlikli kurallar):
- Kullanıcı geçersiz kılmaları (açıkça bir şeyi düzeltti)
- Ampirik gerçekler (test veya veri ile doğrulanmış)

`[Source: User directive MMDDYY]` veya `[Source: Empirical MMDDYY]` ile doğrudan yaz.

**Seviye 2: `knowledge-nominations.md`'ye aday göster** (düşük güvenilirlikli):
- Agent çıkarımları (gözlemlenen ama doğrulanmamış kalıplar)
- Hipotezler (doğru gibi görünen ama daha fazla kanıt gerektiren şeyler)

Ekle: `- [MMDDYY] /clear: [öğrenim] | Kanıt: [kaynak]`

**Kural: Şüphe durumunda terfi ettir. Bilgi Tabanı'nda olup sonra düzeltilen bir kural, Bilgi Adaylıkları'nda olup hiç görülmeyenden iyidir.**

### Adım 6: Otomatik devam (geri yüklenebilir açma)

Devam komut istemi ÇIKTILAMA. Kullanıcıya hiçbir şey SORMA. Bunun yerine:

1. `.claude/memory.md` ve `.claude/knowledge-base.md`'yi tekrar oku (sıkıştırılmış bağlam yeniden yükleme)
2. Az önce yazdığın günlük not devrini tekrar oku (Sonraki eylem için)
3. **Erişim çapalarından geri yükle** — **Sonraki** alanında belirtilen dosya(lar)ı ve sonraki eylemin bağlı olduğu **Dosyalar** listesindeki kritik dosyaları tekrar oku. Bu açma adımıdır: devir *ne* olduğunu anlattı; dosyaları tekrar okumak *nasıl* devam edileceğini geri yükler.
4. **Sonraki eylemi hemen çalıştır** — tam kaldığın yerden devam et

Kullanıcı kısa bir duraklama ve ardından sorunsuz devam eden çalışma deneyimlemeli. Görünür "temizleniyor" veya "devam ediliyor" mesajları yok. Sadece çalışmaya devam et.

Hedef: 5-7 araç çağrısı, <30 saniye. Acil durum: 2-3 çağrı, <15 saniye.
