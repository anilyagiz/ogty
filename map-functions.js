// Singularity Automotive IoT Security Platform - Interactive Map Functions

// Map variables
let deviceMap = null;
let threatMap = null;
let deviceMarkers = [];
let threatMarkers = [];
let deviceCluster = null;
let threatCluster = null;

// Turkish city coordinates for realistic vehicle placement
const turkishCities = [
    { name: 'İstanbul', lat: 41.015137, lng: 28.979530, devices: 142 },
    { name: 'Ankara', lat: 39.925533, lng: 32.866287, devices: 87 },
    { name: 'İzmir', lat: 38.423733, lng: 27.142826, devices: 23 },
    { name: 'Bursa', lat: 40.188453, lng: 29.061056, devices: 56 },
    { name: 'Antalya', lat: 36.884804, lng: 30.704044, devices: 38 },
    { name: 'Adana', lat: 37.000000, lng: 35.321335, devices: 45 },
    { name: 'Konya', lat: 37.871353, lng: 32.484632, devices: 32 },
    { name: 'Gaziantep', lat: 37.066222, lng: 37.383331, devices: 28 },
    { name: 'Şanlıurfa', lat: 37.167000, lng: 38.795000, devices: 19 },
    { name: 'Kocaeli', lat: 40.853270, lng: 29.881520, devices: 41 }
];

// Vehicle data for real-time tracking
let vehicles = [];
let vehicleMovementInterval = null;

// Initialize maps when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMaps();
    setupMapEventListeners();
    generateVehicleData();
    startVehicleMovement();
    initializeMobileMapFeatures();
    addMapAnimations();
});

// Initialize both maps
function initializeMaps() {
    initializeDeviceMap();
    initializeThreatMap();
}

// Initialize device management map
function initializeDeviceMap() {
    const deviceMapContainer = document.getElementById('device-map');
    if (!deviceMapContainer) return;

    // Create the map centered on Turkey
    deviceMap = L.map('device-map').setView([39.0, 35.0], 6);

    // Add tile layer with dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(deviceMap);

    // Initialize marker cluster group
    deviceCluster = L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            const count = cluster.getChildCount();
            let size = 'small';
            let className = 'marker-cluster-';
            
            if (count < 10) {
                size = 'small';
                className += 'small';
            } else if (count < 100) {
                size = 'medium';
                className += 'medium';
            } else {
                size = 'large';
                className += 'large';
            }
            
            return L.divIcon({
                html: '<div><span>' + count + '</span></div>',
                className: 'marker-cluster ' + className,
                iconSize: L.point(40, 40)
            });
        }
    });

    deviceMap.addLayer(deviceCluster);

    // Add device markers for Turkish cities
    addDeviceMarkers();

    // Add map controls for mobile
    if (window.innerWidth <= 768) {
        deviceMap.zoomControl.setPosition('bottomright');
    }
}

// Initialize cybersecurity threat map
function initializeThreatMap() {
    const threatMapContainer = document.getElementById('threat-map');
    if (!threatMapContainer) return;

    // Create the map centered on Turkey
    threatMap = L.map('threat-map').setView([39.0, 35.0], 6);

    // Add tile layer with dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(threatMap);

    // Initialize marker cluster group for threats
    threatCluster = L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            const count = cluster.getChildCount();
            let className = 'marker-cluster-threat-';
            
            if (count < 5) {
                className += 'low';
            } else if (count < 15) {
                className += 'medium';
            } else {
                className += 'high';
            }
            
            return L.divIcon({
                html: '<div><span>' + count + '</span></div>',
                className: 'marker-cluster ' + className,
                iconSize: L.point(40, 40)
            });
        }
    });

    threatMap.addLayer(threatCluster);

    // Add initial threat markers
    addThreatMarkers();

    // Add map controls for mobile
    if (window.innerWidth <= 768) {
        threatMap.zoomControl.setPosition('bottomright');
    }
}

// Add device markers to the map
function addDeviceMarkers() {
    if (!deviceMap || !deviceCluster) return;

    // Clear existing markers
    deviceCluster.clearLayers();
    deviceMarkers = [];

    // Add markers for each Turkish city
    turkishCities.forEach(city => {
        const status = getDeviceStatus(city.devices);
        const marker = L.marker([city.lat, city.lng], {
            icon: createDeviceIcon(status)
        });

        // Create popup content
        const popupContent = `
            <div class="map-popup">
                <h4>${city.name}</h4>
                <div class="popup-stats">
                    <div class="stat-item">
                        <span class="stat-label">Toplam Cihaz:</span>
                        <span class="stat-value">${city.devices}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Durum:</span>
                        <span class="stat-value status-${status}">${getStatusText(status)}</span>
                    </div>
                </div>
                <button class="popup-btn" onclick="zoomToCity(${city.lat}, ${city.lng})">
                    <i class="fas fa-search-plus"></i> Yakınlaştır
                </button>
            </div>
        `;

        marker.bindPopup(popupContent);
        deviceMarkers.push(marker);
        deviceCluster.addLayer(marker);
    });

    // Add random vehicle markers around cities
    addVehicleMarkers();
}

// Add vehicle markers to the device map
function addVehicleMarkers() {
    if (!deviceMap || !deviceCluster) return;

    // Generate random vehicles around each city
    turkishCities.forEach(city => {
        const vehicleCount = Math.floor(city.devices / 10); // 1 vehicle per 10 devices
        
        for (let i = 0; i < vehicleCount; i++) {
            // Generate random position near the city
            const latOffset = (Math.random() - 0.5) * 0.5;
            const lngOffset = (Math.random() - 0.5) * 0.5;
            
            const vehicle = {
                id: `TR-${Math.floor(Math.random() * 9999)}`,
                lat: city.lat + latOffset,
                lng: city.lng + lngOffset,
                status: getVehicleStatus(),
                city: city.name,
                speed: Math.floor(Math.random() * 120) + 40, // 40-160 km/h
                direction: Math.random() * 360 // 0-360 degrees
            };
            
            vehicles.push(vehicle);
            
            const marker = L.marker([vehicle.lat, vehicle.lng], {
                icon: createVehicleIcon(vehicle.status)
            });

            // Create popup content for vehicle
            const popupContent = `
                <div class="map-popup vehicle-popup">
                    <h4>${vehicle.id}</h4>
                    <div class="popup-stats">
                        <div class="stat-item">
                            <span class="stat-label">Konum:</span>
                            <span class="stat-value">${vehicle.city}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Hız:</span>
                            <span class="stat-value">${vehicle.speed} km/h</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Durum:</span>
                            <span class="stat-value status-${vehicle.status}">${getStatusText(vehicle.status)}</span>
                        </div>
                    </div>
                    <button class="popup-btn" onclick="trackVehicle('${vehicle.id}')">
                        <i class="fas fa-crosshairs"></i> Takip Et
                    </button>
                </div>
            `;

            marker.bindPopup(popupContent);
            marker.vehicleId = vehicle.id;
            deviceMarkers.push(marker);
            deviceCluster.addLayer(marker);
        }
    });
}

// Add threat markers to the threat map
function addThreatMarkers() {
    if (!threatMap || !threatCluster) return;

    // Clear existing markers
    threatCluster.clearLayers();
    threatMarkers = [];

    // Generate random threat vehicles
    const threatCount = Math.floor(Math.random() * 15) + 10; // 10-25 threats
    
    for (let i = 0; i < threatCount; i++) {
        const city = turkishCities[Math.floor(Math.random() * turkishCities.length)];
        const latOffset = (Math.random() - 0.5) * 0.8;
        const lngOffset = (Math.random() - 0.5) * 0.8;
        
        const threat = {
            id: `TR-${Math.floor(Math.random() * 9999)}`,
            lat: city.lat + latOffset,
            lng: city.lng + lngOffset,
            status: getThreatStatus(),
            city: city.name,
            threatType: getThreatType()
        };
        
        const marker = L.marker([threat.lat, threat.lng], {
            icon: createThreatIcon(threat.status)
        });

        // Create popup content for threat
        const popupContent = `
            <div class="map-popup threat-popup">
                <h4>${threat.id}</h4>
                <div class="popup-stats">
                    <div class="stat-item">
                        <span class="stat-label">Konum:</span>
                        <span class="stat-value">${threat.city}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Tehdit Tipi:</span>
                        <span class="stat-value">${threat.threatType}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Seviye:</span>
                        <span class="stat-value status-${threat.status}">${getStatusText(threat.status)}</span>
                    </div>
                </div>
                <button class="popup-btn" onclick="respondToThreat('${threat.id}')">
                    <i class="fas fa-shield-alt"></i> Müdahale Et
                </button>
            </div>
        `;

        marker.bindPopup(popupContent);
        marker.threatId = threat.id;
        threatMarkers.push(marker);
        threatCluster.addLayer(marker);
    }
}

// Create custom device icon
function createDeviceIcon(status) {
    const iconColors = {
        normal: '#00ff88',
        warning: '#ffdd00',
        critical: '#ff5252'
    };

    return L.divIcon({
        html: `<div class="device-marker" style="background-color: ${iconColors[status]};">
                    <div class="marker-pulse"></div>
                </div>`,
        className: 'custom-device-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    });
}

// Create custom vehicle icon
function createVehicleIcon(status) {
    const iconColors = {
        normal: '#00d4ff',
        warning: '#ffdd00',
        critical: '#ff5252'
    };

    return L.divIcon({
        html: `<div class="vehicle-marker" style="color: ${iconColors[status]};">
                    <i class="fas fa-car-side"></i>
                    <div class="marker-pulse"></div>
                </div>`,
        className: 'custom-vehicle-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
}

// Create custom threat icon
function createThreatIcon(status) {
    const iconColors = {
        normal: '#00d4ff',
        warning: '#ffdd00',
        critical: '#ff5252'
    };

    return L.divIcon({
        html: `<div class="threat-marker" style="color: ${iconColors[status]};">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div class="marker-pulse"></div>
                </div>`,
        className: 'custom-threat-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
}

// Get device status based on device count
function getDeviceStatus(deviceCount) {
    if (deviceCount < 30) return 'critical';
    if (deviceCount < 60) return 'warning';
    return 'normal';
}

// Get vehicle status randomly
function getVehicleStatus() {
    const rand = Math.random();
    if (rand < 0.1) return 'critical';
    if (rand < 0.25) return 'warning';
    return 'normal';
}

// Get threat status randomly
function getThreatStatus() {
    const rand = Math.random();
    if (rand < 0.2) return 'critical';
    if (rand < 0.5) return 'warning';
    return 'normal';
}

// Get threat type
function getThreatType() {
    const threatTypes = [
        'CAN Bus Saldırısı',
        'Şifreleme Anomalisi',
        'Yetkisiz Erişim',
        'Sinyal Baskısı',
        'Ağ Saldırısı',
        'OBD-II Port Erişimi'
    ];
    
    return threatTypes[Math.floor(Math.random() * threatTypes.length)];
}

// Get status text in Turkish
function getStatusText(status) {
    const statusTexts = {
        normal: 'Normal',
        warning: 'Uyarı',
        critical: 'Kritik'
    };
    
    return statusTexts[status] || 'Bilinmeyen';
}

// Setup map event listeners
function setupMapEventListeners() {
    // Device map view toggle
    const deviceMapViewBtn = document.getElementById('device-map-view');
    const deviceListViewBtn = document.getElementById('device-list-view');
    const deviceMapRefreshBtn = document.getElementById('device-map-refresh');
    
    if (deviceMapViewBtn) {
        deviceMapViewBtn.addEventListener('click', () => {
            document.getElementById('device-map').style.display = 'block';
            document.getElementById('device-list').style.display = 'none';
            deviceMapViewBtn.classList.add('active');
            deviceListViewBtn.classList.remove('active');
            
            // Refresh map to fix display issues
            setTimeout(() => {
                if (deviceMap) deviceMap.invalidateSize();
            }, 100);
        });
    }
    
    if (deviceListViewBtn) {
        deviceListViewBtn.addEventListener('click', () => {
            document.getElementById('device-map').style.display = 'none';
            document.getElementById('device-list').style.display = 'block';
            deviceListViewBtn.classList.add('active');
            deviceMapViewBtn.classList.remove('active');
            
            renderDeviceList();
        });
    }
    
    if (deviceMapRefreshBtn) {
        deviceMapRefreshBtn.addEventListener('click', () => {
            refreshDeviceMap();
        });
    }
}

// Render device list view
function renderDeviceList() {
    const deviceListContainer = document.getElementById('device-list');
    if (!deviceListContainer) return;
    
    let listHTML = '<div class="device-list-content">';
    
    turkishCities.forEach(city => {
        const status = getDeviceStatus(city.devices);
        
        listHTML += `
            <div class="device-list-item status-${status}">
                <div class="device-info">
                    <h4>${city.name}</h4>
                    <div class="device-stats">
                        <span class="device-count">${city.devices} Cihaz</span>
                        <span class="device-status">${getStatusText(status)}</span>
                    </div>
                </div>
                <button class="list-action-btn" onclick="zoomToCity(${city.lat}, ${city.lng})">
                    <i class="fas fa-map-marked-alt"></i>
                </button>
            </div>
        `;
    });
    
    listHTML += '</div>';
    deviceListContainer.innerHTML = listHTML;
}

// Generate initial vehicle data
function generateVehicleData() {
    // This is already handled in addVehicleMarkers()
}

// Start vehicle movement animation
function startVehicleMovement() {
    // Clear any existing interval
    if (vehicleMovementInterval) {
        clearInterval(vehicleMovementInterval);
    }
    
    // Update vehicle positions every 3 seconds
    vehicleMovementInterval = setInterval(() => {
        updateVehiclePositions();
    }, 3000);
}

// Update vehicle positions
function updateVehiclePositions() {
    if (!deviceMap || vehicles.length === 0) return;
    
    vehicles.forEach(vehicle => {
        // Calculate new position based on speed and direction
        const distance = vehicle.speed * 0.00003; // Convert km/h to approximate degrees
        const radians = vehicle.direction * Math.PI / 180;
        
        vehicle.lat += Math.cos(radians) * distance;
        vehicle.lng += Math.sin(radians) * distance;
        
        // Randomly change direction slightly
        vehicle.direction += (Math.random() - 0.5) * 10;
        
        // Update marker position
        const marker = deviceMarkers.find(m => m.vehicleId === vehicle.id);
        if (marker) {
            marker.setLatLng([vehicle.lat, vehicle.lng]);
            
            // Update popup content
            const popupContent = `
                <div class="map-popup vehicle-popup">
                    <h4>${vehicle.id}</h4>
                    <div class="popup-stats">
                        <div class="stat-item">
                            <span class="stat-label">Konum:</span>
                            <span class="stat-value">${vehicle.city}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Hız:</span>
                            <span class="stat-value">${vehicle.speed} km/h</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Durum:</span>
                            <span class="stat-value status-${vehicle.status}">${getStatusText(vehicle.status)}</span>
                        </div>
                    </div>
                    <button class="popup-btn" onclick="trackVehicle('${vehicle.id}')">
                        <i class="fas fa-crosshairs"></i> Takip Et
                    </button>
                </div>
            `;
            
            marker.setPopupContent(popupContent);
        }
    });
}

// Zoom to a specific city
function zoomToCity(lat, lng) {
    if (deviceMap) {
        deviceMap.setView([lat, lng], 10);
        
        // Switch to map view if in list view
        const deviceMapViewBtn = document.getElementById('device-map-view');
        const deviceListViewBtn = document.getElementById('device-list-view');
        
        if (deviceListViewBtn && deviceListViewBtn.classList.contains('active')) {
            deviceMapViewBtn.click();
        }
    }
}

// Track a specific vehicle
function trackVehicle(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle && deviceMap) {
        deviceMap.setView([vehicle.lat, vehicle.lng], 13);
        
        // Find and open the vehicle's popup
        const marker = deviceMarkers.find(m => m.vehicleId === vehicleId);
        if (marker) {
            marker.openPopup();
        }
    }
}

// Respond to a threat
function respondToThreat(threatId) {
    const marker = threatMarkers.find(m => m.threatId === threatId);
    if (marker) {
        // Change threat status to normal
        const newIcon = createThreatIcon('normal');
        marker.setIcon(newIcon);
        
        // Update popup content
        const popupContent = `
            <div class="map-popup threat-popup">
                <h4>${threatId}</h4>
                <div class="popup-stats">
                    <div class="stat-item">
                        <span class="stat-label">Durum:</span>
                        <span class="stat-value status-normal">Temizlendi</span>
                    </div>
                </div>
                <div class="response-success">
                    <i class="fas fa-check-circle"></i> Tehdit başarıyla temizlendi
                </div>
            </div>
        `;
        
        marker.setPopupContent(popupContent);
        
        // Show notification
        showNotification('success', 'Tehdit Temizlendi', `${threatId} için müdahale başarılı`);
    }
}

// Refresh device map
function refreshDeviceMap() {
    if (deviceMap) {
        addDeviceMarkers();
        showNotification('info', 'Harita Yenilendi', 'Cihaz konumları güncellendi');
    }
}

// Show notification (reusing from main script if available)
function showNotification(type, title, message) {
    if (window.showNotification) {
        window.showNotification(type, title, message);
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    if (deviceMap) {
        setTimeout(() => {
            deviceMap.invalidateSize();
        }, 100);
    }
    
    if (threatMap) {
        setTimeout(() => {
            threatMap.invalidateSize();
        }, 100);
    }
});

// Initialize mobile-specific map features
function initializeMobileMapFeatures() {
    // Add touch-friendly controls for mobile
    if (window.innerWidth <= 768) {
        addMobileMapControls();
        optimizeMapForMobile();
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (deviceMap) deviceMap.invalidateSize();
            if (threatMap) threatMap.invalidateSize();
        }, 200);
    });
}

// Add mobile-specific map controls
function addMobileMapControls() {
    if (!deviceMap) return;
    
    // Custom control for mobile gestures
    const MobileControl = L.Control.extend({
        options: {
            position: 'topleft'
        },
        
        onAdd: function(map) {
            const container = L.DomUtil.create('div', 'mobile-map-controls');
            
            // Add touch-friendly buttons
            container.innerHTML = `
                <button class="mobile-btn" onclick="centerMapOnVehicles()" title="Araçları Ortala">
                    <i class="fas fa-compress-arrows-alt"></i>
                </button>
                <button class="mobile-btn" onclick="toggleMapLayer()" title="Katman Değiştir">
                    <i class="fas fa-layer-group"></i>
                </button>
                <button class="mobile-btn" onclick="toggleTracking()" title="Takip Modu">
                    <i class="fas fa-satellite-dish"></i>
                </button>
            `;
            
            return container;
        }
    });
    
    // Add control to both maps
    deviceMap.addControl(new MobileControl());
    if (threatMap) {
        threatMap.addControl(new MobileControl());
    }
}

// Optimize map for mobile devices
function optimizeMapForMobile() {
    // Enable dragging on mobile for better user experience
    if (deviceMap) {
        deviceMap.dragging.enable();
        
        // Enable touch gestures
        deviceMap.touchZoom.enable();
        deviceMap.doubleClickZoom.enable();
        deviceMap.scrollWheelZoom.enable();
        
        // Adjust zoom controls for touch
        if (deviceMap.zoomControl) {
            deviceMap.zoomControl.setPosition('bottomright');
        }
        
        // Add better touch support
        if (L.Browser.touch && deviceMap.tap) {
            deviceMap.tap.enable();
        }
    }
    
    if (threatMap) {
        threatMap.dragging.enable();
        threatMap.touchZoom.enable();
        threatMap.doubleClickZoom.enable();
        threatMap.scrollWheelZoom.enable();
        
        if (threatMap.zoomControl) {
            threatMap.zoomControl.setPosition('bottomright');
        }
        
        // Add better touch support
        if (L.Browser.touch && threatMap.tap) {
            threatMap.tap.enable();
        }
    }
}

// Center map on all vehicles
function centerMapOnVehicles() {
    if (!deviceMap || vehicles.length === 0) return;
    
    const vehicleLatLngs = vehicles.map(v => [v.lat, v.lng]);
    const bounds = L.latLngBounds(vehicleLatLngs);
    
    deviceMap.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 12
    });
    
    showNotification('info', 'Harita Ortalandı', 'Tüm araçlar görüntüleniyor');
}

// Toggle map layer
let currentLayerIndex = 0;
const mapLayers = [
    {
        name: 'Karanlık Tema',
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    {
        name: 'OpenStreetMap',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    {
        name: 'Uydu Görüntüsü',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
    }
];

function toggleMapLayer() {
    if (!deviceMap) return;
    
    // Remove current tile layer
    deviceMap.eachLayer(function(layer) {
        if (layer instanceof L.TileLayer) {
            deviceMap.removeLayer(layer);
        }
    });
    
    // Add new layer
    currentLayerIndex = (currentLayerIndex + 1) % mapLayers.length;
    const newLayer = mapLayers[currentLayerIndex];
    
    L.tileLayer(newLayer.url, {
        attribution: newLayer.attribution,
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(deviceMap);
    
    showNotification('info', 'Harita Katmanı Değiştirildi', newLayer.name);
}

// Toggle vehicle tracking mode
let trackingMode = false;
let trackedVehicle = null;

function toggleTracking() {
    trackingMode = !trackingMode;
    
    if (trackingMode) {
        // Start tracking first available vehicle
        if (vehicles.length > 0) {
            trackedVehicle = vehicles[0];
            startVehicleTracking();
            showNotification('info', 'Takip Modu Aktif', `${trackedVehicle.id} takip ediliyor`);
        }
    } else {
        stopVehicleTracking();
        showNotification('info', 'Takip Modu Pasif', 'Araç takibi durduruldu');
    }
}

// Start tracking a specific vehicle
function startVehicleTracking() {
    if (!trackedVehicle || !deviceMap) return;
    
    // Center map on tracked vehicle
    deviceMap.setView([trackedVehicle.lat, trackedVehicle.lng], 14);
    
    // Highlight tracked vehicle
    const marker = deviceMarkers.find(m => m.vehicleId === trackedVehicle.id);
    if (marker) {
        marker.setZIndexOffset(1000);
        animateTrackedVehicle(marker);
    }
}

// Stop vehicle tracking
function stopVehicleTracking() {
    if (trackedVehicle) {
        const marker = deviceMarkers.find(m => m.vehicleId === trackedVehicle.id);
        if (marker) {
            marker.setZIndexOffset(0);
        }
        trackedVehicle = null;
    }
}

// Animate tracked vehicle
function animateTrackedVehicle(marker) {
    if (!trackingMode || !marker) return;
    
    const icon = marker.getElement();
    if (icon) {
        icon.style.animation = 'tracked-pulse 2s infinite';
    }
}

// Add map animations
function addMapAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tracked-pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7); }
            70% { transform: scale(1.3); box-shadow: 0 0 0 10px rgba(0, 212, 255, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
        }
        
        @keyframes marker-appear {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
            100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }
        
        .mobile-map-controls {
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            padding: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .mobile-btn {
            background: #007bff;
            color: white;
            border: none;
            border-radius: 6px;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 16px;
        }
        
        .mobile-btn:hover {
            background: #0056b3;
            transform: scale(1.1);
        }
        
        .mobile-btn:active {
            transform: scale(0.95);
        }
        
        .custom-device-icon,
        .custom-vehicle-icon,
        .custom-threat-icon {
            animation: marker-appear 0.5s ease-out;
        }
        
        .device-marker,
        .vehicle-marker,
        .threat-marker {
            transition: all 0.3s ease;
        }
        
        .device-marker:hover,
        .vehicle-marker:hover,
        .threat-marker:hover {
            transform: scale(1.2);
        }
        
        .map-popup {
            min-width: 250px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .map-popup h4 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 16px;
        }
        
        .popup-stats {
            margin-bottom: 10px;
        }
        
        .stat-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 14px;
        }
        
        .stat-label {
            color: #666;
        }
        
        .stat-value {
            font-weight: 600;
        }
        
        .stat-value.status-normal {
            color: #28a745;
        }
        
        .stat-value.status-warning {
            color: #ffc107;
        }
        
        .stat-value.status-critical {
            color: #dc3545;
        }
        
        .popup-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            font-size: 14px;
            transition: background 0.3s ease;
        }
        
        .popup-btn:hover {
            background: #0056b3;
        }
        
        .response-success {
            background: #d4edda;
            color: #155724;
            padding: 8px;
            border-radius: 4px;
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
        }
        
        .device-list-content {
            padding: 10px;
        }
        
        .device-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            margin-bottom: 8px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        
        .device-list-item:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .device-list-item.status-normal {
            border-left: 4px solid #28a745;
        }
        
        .device-list-item.status-warning {
            border-left: 4px solid #ffc107;
        }
        
        .device-list-item.status-critical {
            border-left: 4px solid #dc3545;
        }
        
        .device-info h4 {
            margin: 0 0 5px 0;
            color: #fff;
        }
        
        .device-stats {
            display: flex;
            gap: 10px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .list-action-btn {
            background: #007bff;
            color: white;
            border: none;
            border-radius: 6px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .list-action-btn:hover {
            background: #0056b3;
            transform: scale(1.1);
        }
        
        /* Enhanced mobile styles */
        @media (max-width: 767px) {
            .mobile-map-controls {
                bottom: 80px;
                left: 10px;
            }
            
            .mobile-btn {
                width: 48px;
                height: 48px;
                font-size: 18px;
            }
            
            .map-popup {
                min-width: 280px;
            }
            
            .popup-btn {
                padding: 12px;
                font-size: 16px;
            }
            
            .device-list-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            
            .list-action-btn {
                align-self: flex-end;
            }
            
            /* Touch-friendly map controls */
            .leaflet-touch .leaflet-control-zoom {
                font-size: 18px;
            }
            
            .leaflet-touch .leaflet-bar a {
                width: 44px;
                height: 44px;
                line-height: 44px;
            }
            
            /* Better touch targets for markers */
            .custom-device-icon,
            .custom-vehicle-icon,
            .custom-threat-icon {
                cursor: pointer;
                touch-action: manipulation;
            }
            
            /* Improved popup positioning on mobile */
            .leaflet-popup-content-wrapper {
                border-radius: 8px;
                box-shadow: 0 3px 14px rgba(0,0,0,0.4);
            }
            
            /* Better map container on mobile */
            #device-map, #threat-map {
                height: 400px;
                touch-action: pan-y;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced vehicle tracking with smooth animations
function updateVehiclePositions() {
    if (!deviceMap || vehicles.length === 0) return;
    
    vehicles.forEach(vehicle => {
        // Calculate new position based on speed and direction
        const distance = vehicle.speed * 0.00003; // Convert km/h to approximate degrees
        const radians = vehicle.direction * Math.PI / 180;
        
        const oldLat = vehicle.lat;
        const oldLng = vehicle.lng;
        
        vehicle.lat += Math.cos(radians) * distance;
        vehicle.lng += Math.sin(radians) * distance;
        
        // Randomly change direction slightly
        vehicle.direction += (Math.random() - 0.5) * 10;
        
        // Update marker position with animation
        const marker = deviceMarkers.find(m => m.vehicleId === vehicle.id);
        if (marker) {
            // Smooth animation for marker movement
            animateMarkerMovement(marker, [oldLat, oldLng], [vehicle.lat, vehicle.lng]);
            
            // Update popup content
            const popupContent = `
                <div class="map-popup vehicle-popup">
                    <h4>${vehicle.id}</h4>
                    <div class="popup-stats">
                        <div class="stat-item">
                            <span class="stat-label">Konum:</span>
                            <span class="stat-value">${vehicle.city}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Hız:</span>
                            <span class="stat-value">${vehicle.speed} km/h</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Durum:</span>
                            <span class="stat-value status-${vehicle.status}">${getStatusText(vehicle.status)}</span>
                        </div>
                    </div>
                    <button class="popup-btn" onclick="trackVehicle('${vehicle.id}')">
                        <i class="fas fa-crosshairs"></i> Takip Et
                    </button>
                </div>
            `;
            
            marker.setPopupContent(popupContent);
            
            // Update tracking if this vehicle is being tracked
            if (trackingMode && trackedVehicle && trackedVehicle.id === vehicle.id) {
                deviceMap.setView([vehicle.lat, vehicle.lng], 14);
            }
        }
    });
}

// Animate marker movement smoothly
function animateMarkerMovement(marker, oldPosition, newPosition) {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentLat = oldPosition[0] + (newPosition[0] - oldPosition[0]) * easeProgress;
        const currentLng = oldPosition[1] + (newPosition[1] - oldPosition[1]) * easeProgress;
        
        marker.setLatLng([currentLat, currentLng]);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Enhanced threat response with animation
function respondToThreat(threatId) {
    const marker = threatMarkers.find(m => m.threatId === threatId);
    if (marker) {
        // Add response animation
        const icon = marker.getElement();
        if (icon) {
            icon.style.animation = 'threat-response 1s ease-out';
        }
        
        setTimeout(() => {
            // Change threat status to normal
            const newIcon = createThreatIcon('normal');
            marker.setIcon(newIcon);
            
            // Update popup content
            const popupContent = `
                <div class="map-popup threat-popup">
                    <h4>${threatId}</h4>
                    <div class="popup-stats">
                        <div class="stat-item">
                            <span class="stat-label">Durum:</span>
                            <span class="stat-value status-normal">Temizlendi</span>
                        </div>
                    </div>
                    <div class="response-success">
                        <i class="fas fa-check-circle"></i> Tehdit başarıyla temizlendi
                    </div>
                </div>
            `;
            
            marker.setPopupContent(popupContent);
            
            // Show notification
            showNotification('success', 'Tehdit Temizlendi', `${threatId} için müdahale başarılı`);
        }, 500);
    }
}

// Add threat response animation
const threatResponseStyle = document.createElement('style');
threatResponseStyle.textContent = `
    @keyframes threat-response {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.5) rotate(180deg); filter: hue-rotate(120deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
`;
document.head.appendChild(threatResponseStyle);

// Enhanced map refresh with animation
function refreshDeviceMap() {
    if (deviceMap) {
        // Add loading animation
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'map-loading-overlay';
        loadingOverlay.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        loadingOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            z-index: 1000;
        `;
        
        const mapContainer = document.getElementById('device-map');
        if (mapContainer) {
            mapContainer.style.position = 'relative';
            mapContainer.appendChild(loadingOverlay);
        }
        
        setTimeout(() => {
            addDeviceMarkers();
            if (loadingOverlay.parentNode) {
                loadingOverlay.parentNode.removeChild(loadingOverlay);
            }
            showNotification('info', 'Harita Yenilendi', 'Cihaz konumları güncellendi');
        }, 1000);
    }
}