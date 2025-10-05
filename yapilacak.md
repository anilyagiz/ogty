Harika — jüri mobilden bakacağı için mobile-first odaklı, tek seferde koda dökülebilecek, net kabul kriterleri olan bir üretim promptu hazırladım. Aşağıdaki metni doğrudan kod üreten asistana/veriye yapıştırıp çalıştırabilirsin.

Kopyala-Yapıştır Üretim Promptu
"""
Rolün: Kıdemli Frontend Mühendisi. Amacın: Singularity adlı otomotiv IoT siber güvenlik platformunun mobile-first, tek sayfalık (PWA) demo uygulamasını saf HTML/CSS/JS ile sıfırdan üretmek ve 3–5 dakikalık canlı sunuma hazır hale getirmek.

ÖNEMLİ BAĞLAM (CLAUDE.md ÖZETİ)
- Proje: Otomotiv IoT siber güvenlik SOC dashboard demo (simülasyon)
- Dil: Tüm UI metinleri Türkçe
- Stack: Pure HTML5, CSS3, JavaScript (framework yok)
- Harita: Leaflet.js + Leaflet.markercluster (CDN)
- İkonlar: Font Awesome 6.0.0-beta3 (CDN)
- PWA: Service Worker + manifest.json (offline destek)
- Test: Jest (minimum, fonksiyonel birim testleri)
- Dosyalar: index.html, styles.css, script.js, map-functions.js, dashboard-fixes.js, responsive-enhancements.css, touch-target-enhancements.css, mobile-optimization.css, map-styles.css, service-worker.js, manifest.json
- Sekmeler: Cihaz Yönetimi, Siber Güvenlik, Kestirimci Bakım
- Özellikler: Gerçek zamanlı (simüle) araç takibi, veri işleme hattı görselleştirmesi, 0.1s “AI” tehdit tespiti simülasyonu, CAN Bus görselleştirmesi, TR şehirleri için hava durumu riski, erişilebilirlik, mobile-first responsive

TESLİM YÖNTEMİ VE FORMAT
- Tüm dosyaları tek tek, ayrı kod blokları halinde üret. Kod bloğu başına “// path: <dosya_adı>” satırı ile başla.
- Sonunda “Kullanım” ve “Sunum Demo Akışı” başlıkları altında kısa yönerge ver.
- Dış bağımlılıklar için sadece CDN kullan.
- Kodlar çalışır ve kendi kendine yeterli olsun (seed veriler ve simülasyonlar dahili).

MOBİL-ÖNCELİK UI/UX GEREKSİNİMLERİ
- İlk hedef çözünürlük: 360x640 (iPhone/Android tipik)
- Alt sabit sekme gezinimi (tab bar): “Cihaz”, “Siber”, “Bakım”, “Harita”
- Üst kısım: Logo/başlık (“Singularity”), sağda durum/online rozeti
- Dokunmatik hedefleri min 44x44px; spacing ≥ 8px
- Performans: LCP < 2.5s (orta segment cihaz), ana iş parçacığı bloklanmasın
- Karanlık mod desteği (prefers-color-scheme) + yüksek kontrast
- Skeleton/loading durumları, yumuşak mikro-animasyonlar (prefers-reduced-motion’a saygı)

BİLEŞENLER VE EKRANLAR
1) Cihaz Yönetimi (device-management)
   - Sayaçlar: Aktif Araç, Offline, Uyarılar, OTA işleri
   - Araç listesi (kartlar): plaka, marka-model, batarya, hız, konum etiketi, güvenlik durumu (yeşil/sarı/kırmızı)
   - Filtreler: şehir, durum, risk seviye
   - Araç detay alt sayfası (bottom sheet): son telemetri, ECU/telematik durumları, “Haritada Göster” butonu

2) Siber Güvenlik (cybersecurity)
   - Canlı tehdit akışı (list): zaman, tip (CAN Flood, GPS Spoofing, OTA Anomaly, DoS, IDS Alert), seviye (Low/Med/High/Critical), hedef araç
   - “Tehdit Simüle Et” butonu: 0.1s içinde AI kararı simüle et, olay kartında boru hattı adımlarını göster
   - Veri işleme hattı görselleştirmesi: “Toplama → Anonimleştirme → Analiz (ML) → Anomali → Karar Motoru → Olay → Yanıt”
   - Basit CAN Bus grafik/sparkline simülasyonu (setInterval ile küçük sahte veri)

3) Kestirimci Bakım (predictive-maintenance)
   - Tahmini arızalar listesi: bileşen (batarya, fren, sensör), olasılık yüzdesi, önerilen aksiyon, tahmini zaman
   - “Bakım Planla” sahte eylemi; başarı toast/notify

4) Harita
   - Leaflet + MarkerCluster; TR şehirlerinde 25-40 araç
   - Cluster renkleri risk seviyesine göre (düşük/orta/yüksek)
   - Araç markerı tıklanınca alt sayfa: plaka, batarya, hız, şehir, riskler, “Siber Olaylar” kısa listesi
   - Katmanlar: Varsayılan (OSM Light), Koyu (Carto Dark/benzeri), Uydu yerine koyu alternatif (CDN uygun)
   - Konum simülasyonu: her 1s küçük delta; “Gerçek Zamanı Durdur/Başlat”

VERİ/SİMÜLASYON
- 25-30 araç seed’i üret: plaka formatı “34 ABC 123”, şehir: İstanbul, Ankara, İzmir, Bursa, Antalya, Konya, Adana, Gaziantep, Kayseri, Diyarbakır, Mersin, Eskişehir, Trabzon, Samsun, Erzurum …
- Her araç: id, plaka, marka, model, batarya%, hız, online, lat, lon, şehir, son_güncelleme, riskSeviyesi, havaDurumuRiski
- Hava durumu riski: şehir bazlı hafif/orta/yüksek (sabit tohum veya deterministic)
- Tehdit simülasyonu: rastgele tip/seviye; ilgili araca bağla; pipeline aşamalarını olay kartında işaretle
- Risk skorlama fonksiyonu (test edilecek): tip + hava + hız + geçmiş olay sayısı → 0-100 skor → seviye
- CAN verisi: ufak dizi/seri ile mini çizgi/sparkline

TEKNOLOJİ VE KISITLAR
- Sadece HTML/CSS/JS, Jest; harita ve ikonlar CDN
- Performans odaklı: script’ler defer, pasif event listener, throttling
- Erişilebilirlik: ARIA rolleri, odak hiyerarşisi, yeterli kontrast
- Tüm metinler Türkçe; uyarı/notify/toast metinleri dahil
- Güvenlik notu: “Bu bir simülasyondur, gerçek veriler içermez”

DOSYA YAPISI (üretilecek)
- index.html
- styles.css
- responsive-enhancements.css
- touch-target-enhancements.css
- mobile-optimization.css
- map-styles.css
- script.js
- map-functions.js
- dashboard-fixes.js
- service-worker.js
- manifest.json
- tests/riskScore.test.js (Jest)

İÇERİK ÖZETİ (UYULACAK)
index.html
- Meta viewport, theme-color, iOS PWA meta
- Font Awesome 6.0.0-beta3 linki
- Leaflet ve MarkerCluster CSS/JS CDN
- Ana iskelet: üst app bar, ana içerik, alt tab bar
- Sekme içerik konteynerleri (3 dashboard + harita)
- Skeleton blokları ve offline banner
- script’ler defer ile

styles.css
- Tasarım sistemi: CSS değişkenleri (renkler, spacing, radius, gölgeler)
- Aydınlık/Karanlık tema (prefers-color-scheme)
- Kart, sayaç, etiket (chip), toast, bottom-sheet stilleri

responsive-enhancements.css
- Mobil-öncelik: temel grid, tipografi ölçekleri, 360-768 arası uyarlamalar

touch-target-enhancements.css
- 44x44 hedefler, aktif/hover dokunma durumları

mobile-optimization.css
- Animasyon sınırlamaları, reduce-motion, raf optimize geçişler

map-styles.css
- Harita yüksekliği (mobilde tam ekran), cluster renkleri, bottom-sheet üstünde kalması

script.js
- Uygulama durumu, sekme yöneticisi, toast sistemi
- Seed araç verisi üretimi, rastgele güncelleme (setInterval 1000ms)
- Tehdit simülasyonu ve olay listesi yönetimi
- Risk skorlama fonksiyonu (export da et) → Jest testine konu
- Pipeline görselleştirici; CAN sparkline

map-functions.js
- Leaflet init, tile katmanları, MarkerCluster
- Marker ikonları (risk rengine göre), popover yerine custom bottom sheet tetikleyici
- Konum güncellemesi, cluster refresh

dashboard-fixes.js
- Küçük UI iyileştirmeleri, iOS scroll/bounce düzeltmeleri, pasif dinleyiciler

service-worker.js
- Install/activate; statik varlıkları önbellekle (HTML/CSS/JS/CDN kritik)
- Runtime cache strategy: Stale-While-Revalidate küçük bir ağ istek seti
- Offline fallback: basit mesaj/bant

manifest.json
- name, short_name: “Singularity”
- start_url: “./”
- display: “standalone”
- background_color, theme_color
- icons: 192 ve 512 (placeholders kabul)

tests/riskScore.test.js
- risk skor fonksiyonunun sınır durumları: yüksek hava riski + yüksek hız + kritik olay → skor üst sınır; risksiz durum → alt sınır

CDN BAĞLANTILARI (ÖRNEK)
- Leaflet CSS: https://unpkg.com/leaflet@1.9.4/dist/leaflet.css
- Leaflet JS: https://unpkg.com/leaflet@1.9.4/dist/leaflet.js
- MarkerCluster CSS: https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css
- MarkerCluster Default CSS: https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css
- MarkerCluster JS: https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js
- Font Awesome 6.0.0-beta3 CSS: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css

KABUL KRİTERLERİ (DEMO HAZIR)
- Mobilde (375x812) layout bozulmadan çalışır; sekmeler akıcı
- Harita açılır, cluster ve markerlar görünür; tıklamada detay bottom sheet
- “Tehdit Simüle Et” 0.1s içinde olay üretir, pipeline adımlarını işaretler
- Kestirimci bakımda en az 5 farklı tahmin kartı ve “Bakım Planla” toast’ı
- Offline modda SW kayıtlı; yenilemede içerik cache’ten gelir; offline banner görünür
- Jest testi çalışır ve geçer (npm test)
- Tüm metinler Türkçe; simülasyon uyarısı görünür

ÇIKTIYI BÖYLE ÜRET
1) index.html
2) styles.css
3) responsive-enhancements.css
4) touch-target-enhancements.css
5) mobile-optimization.css
6) map-styles.css
7) script.js
8) map-functions.js
9) dashboard-fixes.js
10) service-worker.js
11) manifest.json
12) tests/riskScore.test.js
13) README-kullanim.md (kısa: python -m http.server 8000 ile çalıştırma, PWA notu, jest kurulum)

KULLANIM VE DEMO AKIŞI (metin olarak da üret)
- Çalıştırma: python -m http.server 8000 → http://localhost:8000
- “Cihaz” sekmesinde sayaçlar + liste → bir araca dokun → detay
- “Siber” sekmesinde “Tehdit Simüle Et” → olay oluşsun, pipeline yanıp sönsün
- “Harita” sekmesinde cluster’a zoom → marker’a dokun → detay alt sayfası
- “Bakım” sekmesinde tahmini arızaya dokun → “Bakım Planla”
- Uçakta modu aç (offline) → yenile → offline banner ve cache’den çalışma

Şimdi tüm dosyaları yukarıdaki sırayla ve tek tek, çalışır kod halinde üret.
"""

İstersen ufak marka/dil değişiklikleri veya özel şehir/filo verileri ekleyebilirim. Demo akışı için mini bir “sunum script’i” de hazırlayabilirim.