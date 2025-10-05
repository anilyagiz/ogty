# Singularity - Endüstriyel IoT Siber Güvenlik ve Cihaz Yönetimi Platformu

## 📱 Kullanım Kılavuzu

### Desteklenen Cihaz Tipleri
- 🚗 **Araçlar**: Otomotiv IoT, CAN Bus, GPS, Telemetri
- 🤖 **Robotlar**: Endüstriyel robotlar, PLC, Motor kontrol
- 💻 **Bilgisayarlar**: SCADA sistemleri, Sunucular, İş istasyonları
- 🏭 **Üretim Ekipmanları**: CNC, Konveyörler, Sensörler

### Gereksinimler

- Modern web tarayıcı (Chrome, Firefox, Safari, Edge)
- Python 3.x (yerel sunucu için) veya Node.js
- Jest (testler için)

### Kurulum ve Çalıştırma

#### Yöntem 1: Python HTTP Server (Önerilen)

```bash
# Proje dizininde
python -m http.server 8000

# veya Python 3
python3 -m http.server 8000
```

Ardından tarayıcınızda: `http://localhost:8000`

#### Yöntem 2: Node.js HTTP Server

```bash
# http-server kurulumu (global)
npm install -g http-server

# Sunucuyu başlat
http-server -p 8000
```

#### Yöntem 3: VS Code Live Server

1. VS Code'da "Live Server" eklentisini yükleyin
2. `index.html` dosyasına sağ tıklayın
3. "Open with Live Server" seçeneğini tıklayın

### PWA Kurulumu

1. Tarayıcıda uygulamayı açın
2. Adres çubuğundaki "Yükle" düğmesine tıklayın (Chrome/Edge)
3. Uygulama ana ekranınıza eklenecektir
4. Çevrimdışı kullanım için Service Worker otomatik olarak aktif olacaktır

### Test Çalıştırma

```bash
# Jest kurulumu
npm install --save-dev jest

# package.json'a test scripti ekleyin
{
  "scripts": {
    "test": "jest"
  }
}

# Testleri çalıştır
npm test
```

## 🎯 Demo Akışı (3-5 Dakika)

### 1. Cihaz Yönetimi (60 saniye)

- **İlk Sayaçları Göster**: Aktif cihaz sayısı, çevrimdışı, uyarılar, OTA işleri
- **Cihaz Listesini İncele**: 
  - Araçlar: Plaka, marka-model, batarya, hız
  - Robotlar: Seri no, yük, sıcaklık, çevrim sayısı  
  - Bilgisayarlar: CPU, bellek, disk kullanımı
  - Üretim Ekipmanları: Verimlilik, çalışma saatleri
- **Filtreleme**: Cihaz tipi, şehir veya risk seviyesine göre filtrele
- **Cihaz Detayı**: Bir cihaza dokun, detay bilgilerini göster
- **Veri Görselleştirme**: 
  - Araçlar için CAN Bus verileri
  - Robotlar için performans verileri
  - Bilgisayarlar için ağ trafiği
  - Üretim ekipmanları için üretim verileri

### 2. Siber Güvenlik (60 saniye)

- **Veri İşleme Hattını Göster**: Pipeline görselleştirmesini açıkla
- **"Tehdit Simüle Et" Butonuna Bas**: 
  - 0.1 saniyede AI karar simülasyonunu izle
  - Pipeline adımlarının yanıp sönmesini göster
- **Tehdit Listesi**: Yeni oluşturulan tehdidi göster
- **Cihaz Tipine Özel Tehditler**:
  - Araçlar: CAN Flood, GPS Spoofing, OTA Anomaly
  - Robotlar: PLC Injection, Motion Control Hijack, Safety Override
  - Bilgisayarlar: Ransomware, SQL Injection, Zero-Day Exploit
  - Üretim Ekipmanları: SCADA Attack, Sensor Manipulation, HMI Compromise
- **Detayları Açıkla**: Tehdit tipi, seviye, hedef cihaz bilgileri

### 3. Harita Görünümü (90 saniye)

- **Harita Sekmesine Geç**: Türkiye haritasında tüm cihazları göster
- **Cluster'ları Göster**: Risk seviyesine göre renklendirmeyi açıkla
- **Zoom ve Detay**: Bir cluster'a zoom yap, cihaz marker'larını göster
- **Cihaz İkonları**: 
  - 🚗 Araçlar: Araba ikonu
  - 🤖 Robotlar: Robot ikonu
  - 💻 Bilgisayarlar: Masaüstü ikonu
  - 🏭 Üretim Ekipmanları: Fabrika ikonu
- **Cihaz Detayı**: Bir marker'a dokun, alt sayfa açılmasını göster
- **Siber Olaylar**: Cihaz üzerindeki güvenlik olaylarını göster
- **Katman Değiştir**: Koyu veya alternatif harita katmanına geç
- **Gerçek Zamanlı**: Cihazların konumlarının güncellenmesini izle

### 4. Kestirimci Bakım (45 saniye)

- **Bakım Sekmesi**: Tahmin edilen arızaları göster
- **Cihaz Tipine Göre Bakım**:
  - Araçlar: Batarya, Fren sistemi, Motor sensörleri
  - Robotlar: Motor sürücü, Eklemler, Kontrol ünitesi
  - Bilgisayarlar: Disk, Bellek, İşlemci, Ağ
  - Üretim Ekipmanları: Hidrolik sistem, Konveyör, Sensörler
- **Olasılık Yüzdeleri**: Yüksek riskli bileşenleri vurgula
- **Bakım Planla**: Bir karta dokun, başarı bildirimi göster

### 5. PWA ve Offline (30 saniye)

- **Offline Mod**: Cihazı uçak moduna al
- **Yenile**: Sayfayı yenile, offline banner'ı göster
- **Cache'den Çalışma**: Uygulamanın çevrimdışı çalıştığını göster
- **Online'a Dön**: Uçak modunu kapat, banner'ın kaybolduğunu göster

## 🎨 Özellikler

### ✅ Çoklu Cihaz Desteği
- 🚗 **Araçlar**: 30 araç, CAN Bus, GPS, OTA
- 🤖 **Robotlar**: 10 endüstriyel robot, PLC kontrol
- 💻 **Bilgisayarlar**: SCADA, sunucular, iş istasyonları
- 🏭 **Üretim Ekipmanları**: CNC, konveyörler, sensörler
- Toplamda 40+ cihaz gerçek zamanlı izleme

### ✅ Mobile-First Tasarım
- 360x640 hedef çözünürlük
- Touch-friendly UI (44x44px minimum)
- Responsive grid sistem
- iOS ve Android optimizasyonları
- **Smooth Tab Geçişleri**: Mobil uyumlu animasyonlar
- **Ripple Effect**: Material Design dokunma efektleri
- **Auto Scroll**: Sekme değişiminde otomatik yukarı kaydırma
- **Aktif Tab Göstergesi**: Alt çizgi ve üst highlight efektleri

### ✅ Karanlık Mod
- Otomatik `prefers-color-scheme` desteği
- Yüksek kontrast oranları
- Göz yorgunluğunu azaltır

### ✅ Performans
- LCP < 2.5s hedefi
- Hardware-accelerated animations
- Passive event listeners
- CSS containment optimizasyonları

### ✅ Erişilebilirlik
- ARIA rolleri ve etiketleri
- Klavye navigasyonu
- Odak yönetimi
- Ekran okuyucu desteği

### ✅ PWA Özellikleri
- Offline çalışma
- Service Worker cache stratejisi
- Ana ekrana ekleme
- Push notification desteği (hazır)

## 🔧 Teknik Detaylar

### Dosya Yapısı
```
singularity/
├── index.html                      # Ana HTML
├── styles.css                      # Temel stiller ve tema
├── responsive-enhancements.css     # Responsive tasarım
├── touch-target-enhancements.css   # Touch optimizasyonları
├── mobile-optimization.css         # Performans optimizasyonları
├── map-styles.css                  # Harita stilleri
├── script.js                       # Ana uygulama mantığı
├── map-functions.js                # Harita fonksiyonları
├── dashboard-fixes.js              # UI iyileştirmeleri
├── service-worker.js               # PWA offline desteği
├── manifest.json                   # PWA manifest
├── tests/
│   └── riskScore.test.js          # Jest unit testleri
└── README-kullanim.md             # Bu dosya
```

### Teknolojiler
- **HTML5**: Semantic markup, PWA meta tags
- **CSS3**: Grid, Flexbox, Custom Properties, Animations
- **JavaScript**: ES6+, Async/Await
- **Leaflet.js**: Harita görselleştirme
- **MarkerCluster**: Harita clustering
- **Font Awesome**: İkonlar
- **Jest**: Unit testing

### Risk Skorlama Algoritması
```javascript
// Araçlar için:
Skor = Hava Durumu Riski (0-30) + 
       Hız (0-25) + 
       Batarya (0-20) + 
       Online Durumu (0-15) + 
       Tehdit Sayısı (0-30)

// Diğer Cihazlar için:
Skor = Ortam Riski (0-30) + 
       CPU/Yük (0-25) + 
       Güç Durumu (0-20) + 
       Online Durumu (0-15) + 
       Tehdit Sayısı (0-30)

Risk Seviyeleri:
- Düşük: 0-24
- Orta: 25-49
- Yüksek: 50-74
- Kritik: 75-100
```

## 🚀 İleri Düzey

### Service Worker Temizleme
```javascript
// Console'da
navigator.serviceWorker.getRegistrations()
  .then(registrations => {
    registrations.forEach(reg => reg.unregister());
  });
```

### Cache Temizleme
```javascript
// Console'da
caches.keys().then(keys => {
  keys.forEach(key => caches.delete(key));
});
```

### Realtime Güncellemeyi Durdur/Başlat
Harita görünümündeki "Gerçek Zamanı Durdur/Başlat" butonunu kullanın.

## 📊 Performans Metrikleri

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTI (Time to Interactive)**: < 3.8s

## 🐛 Sorun Giderme

### Harita Yüklenmiyor
- Tarayıcı konsolunu kontrol edin
- Leaflet CDN'lerinin erişilebilir olduğundan emin olun
- Service Worker'ı temizleyin ve yeniden yükleyin

### PWA Yüklenmiyor
- HTTPS veya localhost üzerinde olduğunuzdan emin olun
- manifest.json ve service-worker.js dosyalarının erişilebilir olduğunu kontrol edin

### Testler Çalışmıyor
- Jest'in kurulu olduğundan emin olun: `npm install --save-dev jest`
- `package.json` dosyasında test script'inin tanımlı olduğunu kontrol edin

## 📝 Notlar

- **Simülasyon**: Bu bir demo uygulamasıdır, gerçek veriler içermez
- **Veriler**: Tüm araç, tehdit ve bakım verileri rastgele üretilir
- **Konum Güncellemeleri**: 1 saniyede bir simüle edilir
- **Harita Güncellemeleri**: 2 saniyede bir cluster'lar yenilenir

## 🎓 Sunum İpuçları

1. **Mobil Cihazdan Göster**: Jüri mobil değerlendirme yapacağından, gerçek mobil cihazda gösterin
2. **Offline Özelliği**: PWA offline çalışmasını mutlaka gösterin
3. **Gerçek Zamanlı**: Araçların hareket ettiğini ve verilerin güncellendiğini gösterin
4. **AI Simülasyonu**: 0.1s tehdit tespitinin hızını vurgulayın
5. **Risk Skorlama**: Farklı faktörlerin risk skorunu nasıl etkilediğini açıklayın

## 📞 İletişim

**Singularity R&D**
- 📧 Email: [info@singularityrd.com](mailto:info@singularityrd.com)
- 🌐 Website: [singularityrd.com](https://singularityrd.com)

## 📄 Lisans

Bu proje demo amaçlıdır ve öğrenme/tanıtım için kullanılabilir.

---

**© 2025 Singularity. Tüm hakları saklıdır.**
