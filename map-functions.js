// Map Functions using Leaflet

let map = null;
let markerClusterGroup = null;
let vehicleMarkers = {};
let currentLayer = 'light';

const TILE_LAYERS = {
    light: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© OpenStreetMap contributors'
    },
    dark: {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '© OpenStreetMap contributors © CARTO'
    },
    satellite: {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution: '© OpenStreetMap contributors © CARTO'
    }
};

// Initialize Map
function initMap() {
    if (map) return;
    
    // Center on Turkey
    map = L.map('map', {
        center: [39.9334, 32.8597],
        zoom: 6,
        zoomControl: true,
        preferCanvas: true
    });
    
    // Add default tile layer
    L.tileLayer(TILE_LAYERS.light.url, {
        attribution: TILE_LAYERS.light.attribution,
        maxZoom: 18
    }).addTo(map);
    
    // Initialize marker cluster group
    markerClusterGroup = L.markerClusterGroup({
        maxClusterRadius: 80,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: createClusterIcon
    });
    
    map.addLayer(markerClusterGroup);
    
    // Add initial markers
    setTimeout(() => {
        updateMarkers();
        console.log('Map initialized with', window.APP_STATE?.devices?.length || 0, 'devices');
    }, 100);
    
    // Layer control
    const layerSelect = document.getElementById('map-layer');
    if (layerSelect) {
        layerSelect.addEventListener('change', (e) => {
            changeMapLayer(e.target.value);
        });
    }
    
    // Disable scroll wheel zoom on mobile
    if (window.innerWidth < 768) {
        map.scrollWheelZoom.disable();
    }
    
    window.map = map;
    
    // Force marker update after short delay
    setTimeout(() => {
        if (window.APP_STATE?.devices?.length > 0) {
            updateMarkers();
        }
    }, 500);
}

// Create custom cluster icon based on risk level
function createClusterIcon(cluster) {
    const markers = cluster.getAllChildMarkers();
    const riskCounts = {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0
    };
    
    markers.forEach(marker => {
        const risk = marker.options.riskLevel || 'low';
        riskCounts[risk]++;
    });
    
    // Determine dominant risk level
    let dominantRisk = 'low';
    let maxCount = riskCounts.low;
    
    if (riskCounts.critical > 0) {
        dominantRisk = 'critical';
    } else if (riskCounts.high > maxCount) {
        dominantRisk = 'high';
        maxCount = riskCounts.high;
    } else if (riskCounts.medium > maxCount) {
        dominantRisk = 'medium';
    }
    
    const count = markers.length;
    const size = count < 10 ? 40 : count < 50 ? 50 : 60;
    
    return L.divIcon({
        html: `<div><span>${count}</span></div>`,
        className: `marker-cluster marker-cluster-${size < 50 ? 'small' : size < 60 ? 'medium' : 'large'} cluster-${dominantRisk}`,
        iconSize: L.point(size, size)
    });
}

// Create custom device marker
function createDeviceIcon(device) {
    const riskColors = {
        low: '#10b981',
        medium: '#f59e0b',
        high: '#ef4444',
        critical: '#dc2626'
    };
    
    const color = device.online ? riskColors[device.riskLevel] : '#9ca3af';
    const icon = device.online ? device.icon : 'fa-times';
    
    return L.divIcon({
        html: `<div class="vehicle-marker risk-${device.riskLevel} ${device.online ? '' : 'offline'}" style="background: ${color};">
            <i class="fas ${icon}"></i>
        </div>`,
        className: '',
        iconSize: L.point(32, 32),
        iconAnchor: L.point(16, 16)
    });
}

// Update markers on map
function updateMarkers() {
    if (!map || !markerClusterGroup) {
        console.warn('Map or cluster group not initialized');
        return;
    }
    
    const devices = window.APP_STATE?.devices || [];
    
    if (devices.length === 0) {
        console.warn('No devices available to display on map');
        return;
    }
    
    // Clear existing markers
    markerClusterGroup.clearLayers();
    vehicleMarkers = {};
    
    // Add updated markers
    devices.forEach(device => {
        const marker = L.marker([device.lat, device.lon], {
            icon: createDeviceIcon(device),
            riskLevel: device.riskLevel,
            deviceId: device.id,
            deviceType: device.type
        });
        
        marker.on('click', () => {
            showDeviceMapPopup(device);
        });
        
        vehicleMarkers[device.id] = marker;
        markerClusterGroup.addLayer(marker);
    });
    
    console.log(`✅ ${devices.length} cihaz haritaya eklendi (Araç: ${devices.filter(d => d.type === 'vehicle').length}, Robot: ${devices.filter(d => d.type === 'robot').length}, Bilgisayar: ${devices.filter(d => d.type === 'computer').length}, Ekipman: ${devices.filter(d => d.type === 'equipment').length})`);
}

// Show device details in bottom sheet when marker clicked
function showDeviceMapPopup(device) {
    const deviceThreats = window.APP_STATE?.threats.filter(t => t.deviceId === device.id) || [];
    
    if (typeof showDeviceDetails === 'function') {
        showDeviceDetails(device.id);
        return;
    }
    
    // Fallback if showDeviceDetails is not available
    const content = document.getElementById('bottom-sheet-content');
    const identifier = device.plate || device.serialNumber;
    
    content.innerHTML = `
        <h3 style="margin-bottom: 16px;">${identifier}</h3>
        <div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 24px;">
            <i class="fas ${device.icon}"></i>
            ${device.brand} ${device.model} - ${device.typeName}
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Güç</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.powerStatus || device.battery || 100}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Yük</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.load || 0}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Konum</div>
                <div style="font-size: 1rem; font-weight: 600;">${device.city}</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Risk</div>
                <span class="chip ${device.riskLevel}">${
                    device.riskLevel === 'low' ? 'Düşük' :
                    device.riskLevel === 'medium' ? 'Orta' :
                    device.riskLevel === 'high' ? 'Yüksek' : 'Kritik'
                }</span>
            </div>
        </div>
        
        <div style="margin-bottom: 24px;">
            <div style="font-weight: 700; margin-bottom: 8px;">Son Siber Olaylar (${deviceThreats.length})</div>
            ${deviceThreats.slice(0, 3).map(threat => `
                <div style="padding: 8px; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-size: 0.875rem; font-weight: 600;">${threat.type}</div>
                        <span class="chip ${threat.severity}" style="font-size: 0.625rem; padding: 2px 8px;">
                            ${threat.severity === 'low' ? 'Düşük' : threat.severity === 'medium' ? 'Orta' : threat.severity === 'high' ? 'Yüksek' : 'Kritik'}
                        </span>
                    </div>
                    <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">
                        ${new Date(threat.timestamp).toLocaleString('tr-TR')}
                    </div>
                </div>
            `).join('') || '<div style="font-size: 0.875rem; color: var(--text-secondary);">Olay bulunamadı</div>'}
        </div>
        
        <button class="btn btn-primary" style="width: 100%;" onclick="closeBottomSheet()">
            <i class="fas fa-times"></i>
            Kapat
        </button>
    `;
    
    openBottomSheet();
}

// Focus on specific device
function focusDevice(deviceId) {
    const marker = vehicleMarkers[deviceId];
    if (!marker || !map) return;
    
    const latlng = marker.getLatLng();
    map.setView(latlng, 13, { animate: true });
    
    setTimeout(() => {
        marker.fire('click');
    }, 500);
}

// Change map layer
function changeMapLayer(layerType) {
    if (!map || currentLayer === layerType) return;
    
    // Remove all tile layers
    map.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
            map.removeLayer(layer);
        }
    });
    
    // Add new tile layer
    const layerConfig = TILE_LAYERS[layerType] || TILE_LAYERS.light;
    L.tileLayer(layerConfig.url, {
        attribution: layerConfig.attribution,
        maxZoom: 18
    }).addTo(map);
    
    currentLayer = layerType;
}

// Realtime position updates
setInterval(() => {
    if (window.APP_STATE?.realtimeEnabled && map && markerClusterGroup) {
        // Update marker positions without recreating them
        const devices = window.APP_STATE.devices;
        
        devices.forEach(device => {
            const marker = vehicleMarkers[device.id];
            if (marker && device.online) {
                marker.setLatLng([device.lat, device.lon]);
                marker.setIcon(createDeviceIcon(device));
            }
        });
        
        // Refresh clusters
        markerClusterGroup.refreshClusters();
    }
}, 2000);

// Handle window resize
window.addEventListener('resize', () => {
    if (map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
});

// Initialize map when tab is first opened
document.addEventListener('DOMContentLoaded', () => {
    const mapTab = document.querySelector('[data-tab="map-view"]');
    if (mapTab) {
        mapTab.addEventListener('click', () => {
            if (!map) {
                setTimeout(initMap, 100);
            }
        });
    }
});

// Export for use in other scripts
window.initMap = initMap;
window.updateMarkers = updateMarkers;
window.focusDevice = focusDevice;
