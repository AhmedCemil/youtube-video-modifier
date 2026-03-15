# YouTube Video Modifier

[English](README.md) | [Türkçe](README_TR.md)

YouTube video oynatıcısını gizlilik odaklı bir gömülü oynatıcıyla değiştiren Chrome eklentisi - reklamsız, takip çerezleri olmadan.

**YouTube'un yeni arayüzü ile uyumlu (2026)**

## Özellikler

- **Gizlilik Modu** - YouTube oynatıcısını gizlilik odaklı bir gömülü oynatıcıyla değiştirir (yout-ube.com üzerinden)
- **Sayfa İçi Değiştirme** - Video sayfa içinde değişir; yorumlar, açıklama ve yan panel görünür kalır
- **Açılır Pencere** - Araç çubuğu simgesinden herhangi bir YouTube bağlantısı yapıştırarak gizlilik modunda açabilirsiniz
- **Klavye Kısayolu Koruması** - Gizlilik modu aktifken YouTube kısayolları engellenir
- **Ctrl+Tıklama** - Videoyu yout-ube.com'da yeni sekmede açar
- **Oynatmaya Devam** - Gizlilik moduna geçerken mevcut zaman damgasından devam eder

## Kurulum

### Yöntem 1: Sürümlerden İndirin

1. [Sürümler sayfasına](../../releases) gidin
2. `youtube-video-modifier-v1.0.zip` dosyasını indirin
3. ZIP dosyasını bilgisayarınızdaki bir klasöre çıkarın
4. Chrome'da `chrome://extensions/` adresini açın
5. Sağ üstten **Geliştirici modu**'nu etkinleştirin
6. **Paketlenmemiş öğeyi yükle**'ye tıklayın
7. `youtube-video-modifier` klasörünü seçin

### Yöntem 2: Depoyu Klonlayın

1. Bu depoyu klonlayın veya ZIP olarak indirin
2. Chrome'da `chrome://extensions/` adresini açın
3. **Geliştirici modu**'nu etkinleştirin
4. **Paketlenmemiş öğeyi yükle**'ye tıklayın
5. `youtube-video-modifier` klasörünü seçin

## Kullanım

### Kalkan Düğmesi (Oynatıcı İçinde)
1. Herhangi bir YouTube videosuna gidin
2. Oynatıcı kontrol çubuğundaki **kalkan simgesine** tıklayın
3. Video oynatıcısı gizlilik moduna geçer
4. Normal oynatıcıya dönmek için tekrar tıklayın (sayfa yenilenir)

### Ctrl+Tıklama
- Kalkan düğmesine **Ctrl+Tıklama** yapın, video yout-ube.com'da **yeni sekmede** açılır

### Açılır Pencere (Araç Çubuğu Simgesi)
1. Chrome araç çubuğundaki eklenti simgesine tıklayın
2. Herhangi bir YouTube bağlantısı yapıştırın (veya sadece video kimliği)
3. **Open** veya **Enter** tuşuna basın
4. Video yout-ube.com'da yeni sekmede açılır

## Dosyalar

- `youtube-video-modifier/manifest.json` - Eklenti yapılandırması
- `youtube-video-modifier/content.js` - Oynatıcı değiştirme ve klavye yönetimi
- `youtube-video-modifier/styles.css` - Düğme ve iframe stilleri
- `youtube-video-modifier/popup.html` - Açılır pencere arayüzü
- `youtube-video-modifier/popup.js` - Açılır pencere bağlantı ayrıştırıcı

## İzinler

- `activeTab` - Aktif YouTube sekmesine erişim

## Destek

Herhangi bir sorunla karşılaşırsanız, lütfen bu depoda bir sorun bildirimi açın.
