# Katkı Rehberi

Kalfa'ya katkı sunduğunuz için teşekkür ederiz.

## Nasıl Katkı Sağlanır

1. Depoyu fork'layın.
2. `main` üzerinden yeni bir branch oluşturun.
3. Değişikliklerinizi küçük, odaklı ve açıklanabilir parçalarda yapın.
4. Açıklayıcı commit mesajları yazın.
5. Pull request açın.

## Katkı Standartları

* Kapsamı dar tutun, gereksiz refactor eklemeyin.
* Davranış değişikliği varsa dokümantasyonu güncelleyin.
* Gizli bilgi, token, `.env` içeriği veya yerel konfigürasyon dosyası commit etmeyin.
* Mevcut dosya yapısı, isimlendirme ve stil yaklaşımını koruyun.

## Pull Request İçeriği

PR açıklamasında şunları belirtin:

* Ne değişti?
* Neden değişti?
* Nasıl doğruladınız? (komut, kontrol, test)

## Pull Request Kontrol Listesi

* [ ] Değişiklik kapsamı net ve sınırlı.
* [ ] İlgili dokümanlar güncellendi.
* [ ] Hassas veri veya gizli bilgi yok.
* [ ] PR açıklaması teknik olarak yeterli.

## Yerel Doğrulama

PR açmadan önce, mevcut repo durumunda doğrulanmış asgari kontroller şunlardır:

1. `npm install`
2. `npm run lint:md`
3. `npm test`

## İnceleme ve Birleştirme Süreci

* Bakımcılar PR'ı teknik doğruluk, kapsam ve uyum açısından inceler.
* Gerekirse değişiklik talebi ile geri bildirim verilir.
* Onaylanan PR'lar uygun olduğunda `main` dalına birleştirilir.

## Topluluk Kuralları

Katkıdan önce [Davranış Kuralları](./CODE_OF_CONDUCT.md) dosyasını okuyun.
Topluluk etkileşimlerinde bu kurallar bağlayıcıdır.
