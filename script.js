// Main Application Logic

const APP_STATE = {
    devices: [],
    threats: [],
    maintenanceItems: [],
    currentTab: 'device-management',
    filters: {
        city: '',
        status: '',
        risk: '',
        deviceType: ''
    },
    realtimeEnabled: true
};

const CITIES = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 
    'Konya', 'Adana', 'Gaziantep', 'Kayseri', 'Diyarbakır',
    'Mersin', 'Eskişehir', 'Trabzon', 'Samsun', 'Erzurum'
];

const DEVICE_TYPES = {
    vehicle: {
        name: 'Araç',
        icon: 'fa-car',
        brands: ['Mercedes', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Toyota', 'Renault', 'Fiat'],
        models: ['Vito', 'Sprinter', '320d', 'A4', 'Passat', 'Transit', 'Corolla', 'Megane']
    },
    robot: {
        name: 'Robot',
        icon: 'fa-robot',
        brands: ['ABB', 'KUKA', 'Fanuc', 'Yaskawa', 'Universal Robots', 'Kawasaki'],
        models: ['IRB 6700', 'KR QUANTEC', 'M-20iD', 'GP180', 'UR10e', 'RS080N']
    },
    computer: {
        name: 'Bilgisayar',
        icon: 'fa-desktop',
        brands: ['Siemens', 'Allen-Bradley', 'Schneider', 'Mitsubishi', 'Dell', 'HP'],
        models: ['S7-1500', 'ControlLogix', 'Modicon M580', 'MELSEC', 'OptiPlex', 'ProDesk']
    },
    equipment: {
        name: 'Üretim Ekipmanı',
        icon: 'fa-industry',
        brands: ['Haas', 'DMG Mori', 'Mazak', 'Trumpf', 'Bosch', 'Schneider'],
        models: ['VF-2', 'DMU 50', 'Integrex i-200', 'TruLaser', 'Rexroth', 'TeSys']
    }
};

const THREAT_TYPES = {
    vehicle: [
        { name: 'CAN Flood', severity: ['medium', 'high', 'critical'] },
        { name: 'GPS Spoofing', severity: ['medium', 'high'] },
        { name: 'OTA Anomaly', severity: ['low', 'medium', 'high'] },
        { name: 'DoS Attack', severity: ['high', 'critical'] },
        { name: 'IDS Alert', severity: ['low', 'medium', 'high'] }
    ],
    robot: [
        { name: 'PLC Injection', severity: ['high', 'critical'] },
        { name: 'Motion Control Hijack', severity: ['critical'] },
        { name: 'Modbus Attack', severity: ['medium', 'high'] },
        { name: 'Safety System Override', severity: ['critical'] },
        { name: 'Firmware Tampering', severity: ['high', 'critical'] }
    ],
    computer: [
        { name: 'Ransomware', severity: ['critical'] },
        { name: 'SQL Injection', severity: ['high', 'critical'] },
        { name: 'Zero-Day Exploit', severity: ['critical'] },
        { name: 'Brute Force', severity: ['medium', 'high'] },
        { name: 'Malware Detection', severity: ['low', 'medium', 'high'] }
    ],
    equipment: [
        { name: 'SCADA Attack', severity: ['critical'] },
        { name: 'Sensor Manipulation', severity: ['high', 'critical'] },
        { name: 'HMI Compromise', severity: ['medium', 'high'] },
        { name: 'Industrial Protocol Abuse', severity: ['high', 'critical'] },
        { name: 'Operational Disruption', severity: ['medium', 'high', 'critical'] }
    ]
};

const WEATHER_RISKS = {
    'İstanbul': 'orta',
    'Ankara': 'düşük',
    'İzmir': 'düşük',
    'Bursa': 'orta',
    'Antalya': 'düşük',
    'Konya': 'yüksek',
    'Adana': 'düşük',
    'Gaziantep': 'orta',
    'Kayseri': 'yüksek',
    'Diyarbakır': 'orta',
    'Mersin': 'düşük',
    'Eskişehir': 'orta',
    'Trabzon': 'yüksek',
    'Samsun': 'orta',
    'Erzurum': 'yüksek'
};

// Risk Scoring Function (exported for testing)
function calculateRiskScore(device, threatCount = 0) {
    let score = 0;
    
    // Environmental risk contribution (0-30 points)
    if (device.type === 'vehicle') {
        const weatherRisk = WEATHER_RISKS[device.city] || 'düşük';
        if (weatherRisk === 'yüksek') score += 30;
        else if (weatherRisk === 'orta') score += 15;
        else score += 5;
    } else {
        // For industrial equipment, consider operational environment
        const envRisk = device.environmentRisk || 'düşük';
        if (envRisk === 'yüksek') score += 30;
        else if (envRisk === 'orta') score += 15;
        else score += 5;
    }
    
    // Performance/Load contribution (0-25 points)
    if (device.type === 'vehicle') {
        if (device.speed > 100) score += 25;
        else if (device.speed > 80) score += 15;
        else if (device.speed > 60) score += 8;
    } else {
        // For other devices, use CPU/load metrics
        const load = device.load || 0;
        if (load > 90) score += 25;
        else if (load > 75) score += 15;
        else if (load > 60) score += 8;
    }
    
    // Power/Battery contribution (0-20 points)
    const power = device.battery || device.powerStatus || 100;
    if (power < 20) score += 20;
    else if (power < 40) score += 10;
    else if (power < 60) score += 5;
    
    // Online status (0-15 points)
    if (!device.online) score += 15;
    
    // Threat count contribution (0-30 points)
    score += Math.min(threatCount * 10, 30);
    
    // Normalize to 0-100
    score = Math.min(score, 100);
    
    // Determine risk level
    if (score >= 75) return { score, level: 'critical' };
    if (score >= 50) return { score, level: 'high' };
    if (score >= 25) return { score, level: 'medium' };
    return { score, level: 'low' };
}

// Generate device data
function generateDevices(count = 40) {
    const devices = [];
    const plateLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'Y', 'Z'];
    const deviceTypeKeys = Object.keys(DEVICE_TYPES);
    
    for (let i = 0; i < count; i++) {
        const deviceType = deviceTypeKeys[Math.floor(Math.random() * deviceTypeKeys.length)];
        const typeConfig = DEVICE_TYPES[deviceType];
        const city = CITIES[Math.floor(Math.random() * CITIES.length)];
        
        let device = {
            id: `dev_${i + 1}`,
            type: deviceType,
            typeName: typeConfig.name,
            icon: typeConfig.icon,
            brand: typeConfig.brands[Math.floor(Math.random() * typeConfig.brands.length)],
            model: typeConfig.models[Math.floor(Math.random() * typeConfig.models.length)],
            online: Math.random() > 0.15,
            city,
            lat: 38 + Math.random() * 4,
            lon: 27 + Math.random() * 18,
            lastUpdate: new Date().toISOString()
        };
        
        // Add type-specific properties
        if (deviceType === 'vehicle') {
            const cityCode = ['34', '06', '35', '16', '07', '42', '01', '27', '38', '21', '33', '26', '61', '55', '25'][CITIES.indexOf(city)];
            device.plate = `${cityCode} ${plateLetters[Math.floor(Math.random() * plateLetters.length)]}${plateLetters[Math.floor(Math.random() * plateLetters.length)]}${plateLetters[Math.floor(Math.random() * plateLetters.length)]} ${Math.floor(Math.random() * 900) + 100}`;
            device.battery = Math.floor(Math.random() * 100);
            device.speed = Math.floor(Math.random() * 120);
            device.canData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
            device.weatherRisk = WEATHER_RISKS[city];
        } else if (deviceType === 'robot') {
            device.serialNumber = `RB-${city.substring(0, 3).toUpperCase()}-${1000 + i}`;
            device.powerStatus = Math.floor(Math.random() * 100);
            device.load = Math.floor(Math.random() * 100);
            device.cycleCount = Math.floor(Math.random() * 100000);
            device.temperature = 20 + Math.floor(Math.random() * 60);
            device.environmentRisk = ['düşük', 'orta', 'yüksek'][Math.floor(Math.random() * 3)];
            device.performanceData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
        } else if (deviceType === 'computer') {
            device.serialNumber = `PC-${city.substring(0, 3).toUpperCase()}-${2000 + i}`;
            device.powerStatus = Math.floor(Math.random() * 100);
            device.load = Math.floor(Math.random() * 100);
            device.cpuUsage = Math.floor(Math.random() * 100);
            device.memoryUsage = Math.floor(Math.random() * 100);
            device.diskUsage = Math.floor(Math.random() * 100);
            device.environmentRisk = ['düşük', 'orta'][Math.floor(Math.random() * 2)];
            device.networkTraffic = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
        } else if (deviceType === 'equipment') {
            device.serialNumber = `EQ-${city.substring(0, 3).toUpperCase()}-${3000 + i}`;
            device.powerStatus = Math.floor(Math.random() * 100);
            device.load = Math.floor(Math.random() * 100);
            device.operatingHours = Math.floor(Math.random() * 50000);
            device.efficiency = 60 + Math.floor(Math.random() * 40);
            device.environmentRisk = ['düşük', 'orta', 'yüksek'][Math.floor(Math.random() * 3)];
            device.productionData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
        }
        
        const threatCount = Math.floor(Math.random() * 3);
        const risk = calculateRiskScore(device, threatCount);
        device.riskScore = risk.score;
        device.riskLevel = risk.level;
        
        devices.push(device);
    }
    
    return devices;
}

// Generate maintenance items
function generateMaintenanceItems() {
    const componentsByType = {
        vehicle: [
            { name: 'Batarya', issues: ['Kapasite düşüşü', 'Şarj sorunları', 'Hücre dengesizliği'] },
            { name: 'Fren Sistemi', issues: ['Balata aşınması', 'Disk eskimesi', 'ABS sensörü'] },
            { name: 'Motor Sensörleri', issues: ['Oksijen sensörü', 'MAF sensörü', 'Krank sensörü'] },
            { name: 'Süspansiyon', issues: ['Amortisör sızıntısı', 'Rot başı', 'Salıncak burcu'] },
            { name: 'Transmisyon', issues: ['Şanzıman yağı', 'Debriyaj diski', 'Vites kutusu'] }
        ],
        robot: [
            { name: 'Motor Sürücü', issues: ['Aşırı ısınma', 'Güç dalgalanması', 'Servo motor arızası'] },
            { name: 'Eklemler', issues: ['Rulman aşınması', 'Dişli takımı', 'Yağlama sistemi'] },
            { name: 'Sensörler', issues: ['Konum sensörü', 'Tork sensörü', 'Görüş sistemi'] },
            { name: 'Kontrol Ünitesi', issues: ['PLC arızası', 'İletişim hatası', 'Yazılım güncellemesi'] }
        ],
        computer: [
            { name: 'Disk', issues: ['SMART uyarıları', 'Yavaş okuma/yazma', 'Kötü sektörler'] },
            { name: 'Bellek', issues: ['RAM hataları', 'Bellek sızıntısı', 'Kapasite yetersizliği'] },
            { name: 'İşlemci', issues: ['Aşırı ısınma', 'Yüksek kullanım', 'Throttling'] },
            { name: 'Ağ', issues: ['Bağlantı sorunları', 'Yavaş transfer', 'Paket kaybı'] }
        ],
        equipment: [
            { name: 'Hidrolik Sistem', issues: ['Yağ sızıntısı', 'Pompa arızası', 'Basınç düşüşü'] },
            { name: 'Konveyör', issues: ['Kayış aşınması', 'Motor arızası', 'Hizalama sorunu'] },
            { name: 'Sensörler', issues: ['Kalibrasyon', 'Sinyal kaybı', 'Hassasiyet düşüşü'] },
            { name: 'Kontrol Paneli', issues: ['HMI arızası', 'Buton aşınması', 'Ekran sorunu'] }
        ]
    };
    
    const items = [];
    const deviceCount = APP_STATE.devices.length;
    
    for (let i = 0; i < 12; i++) {
        const device = APP_STATE.devices[Math.floor(Math.random() * deviceCount)];
        const components = componentsByType[device.type] || componentsByType.vehicle;
        const component = components[Math.floor(Math.random() * components.length)];
        const probability = 50 + Math.floor(Math.random() * 45);
        const daysUntil = Math.floor(Math.random() * 30) + 5;
        
        items.push({
            id: `maint_${i + 1}`,
            deviceId: device.id,
            deviceType: device.type,
            deviceName: device.plate || device.serialNumber || `${device.brand} ${device.model}`,
            component: component.name,
            issue: component.issues[Math.floor(Math.random() * component.issues.length)],
            probability,
            daysUntil,
            action: probability > 80 ? 'Acil bakım gerekli' : probability > 60 ? 'Yakın zamanda bakım planlayın' : 'İzlemeye devam edin'
        });
    }
    
    return items.sort((a, b) => b.probability - a.probability);
}

// Tab Management
function initTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabName = item.dataset.tab;
            
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(tabName).classList.add('active');
            
            APP_STATE.currentTab = tabName;
            
            if (tabName === 'map-view' && typeof initMap === 'function') {
                setTimeout(() => {
                    if (window.map) {
                        window.map.invalidateSize();
                        // Update markers to show all devices
                        if (typeof updateMarkers === 'function') {
                            updateMarkers();
                        }
                    } else {
                        initMap();
                    }
                }, 100);
            }
        });
    });
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'warning' ? 'fa-exclamation-triangle' :
                 type === 'danger' ? 'fa-times-circle' : 'fa-info-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Render Device List
function renderDevices() {
    const container = document.getElementById('vehicle-list');
    let devices = APP_STATE.devices;
    
    // Apply filters
    if (APP_STATE.filters.city) {
        devices = devices.filter(v => v.city === APP_STATE.filters.city);
    }
    if (APP_STATE.filters.status) {
        devices = devices.filter(v => 
            APP_STATE.filters.status === 'online' ? v.online : !v.online
        );
    }
    if (APP_STATE.filters.risk) {
        devices = devices.filter(v => v.riskLevel === APP_STATE.filters.risk);
    }
    if (APP_STATE.filters.deviceType) {
        devices = devices.filter(v => v.type === APP_STATE.filters.deviceType);
    }
    
    container.innerHTML = devices.map(device => {
        let stats = '';
        let identifier = '';
        
        if (device.type === 'vehicle') {
            identifier = `<div class="vehicle-plate">${device.plate}</div>`;
            stats = `
                <div class="vehicle-stat">
                    <i class="fas fa-battery-three-quarters"></i>
                    <span>${device.battery}%</span>
                </div>
                <div class="vehicle-stat">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>${device.speed} km/h</span>
                </div>
                <div class="vehicle-stat">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${device.city}</span>
                </div>
                <div class="vehicle-stat">
                    <i class="fas fa-cloud"></i>
                    <span>${device.weatherRisk}</span>
                </div>
            `;
        } else {
            identifier = `<div class="vehicle-plate">${device.serialNumber}</div>`;
            stats = `
                <div class="vehicle-stat">
                    <i class="fas fa-bolt"></i>
                    <span>${device.powerStatus || device.battery}%</span>
                </div>
                <div class="vehicle-stat">
                    <i class="fas fa-microchip"></i>
                    <span>${device.load}% yük</span>
                </div>
                <div class="vehicle-stat">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${device.city}</span>
                </div>
                ${device.temperature ? `
                <div class="vehicle-stat">
                    <i class="fas fa-temperature-high"></i>
                    <span>${device.temperature}°C</span>
                </div>
                ` : `
                <div class="vehicle-stat">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>${device.environmentRisk || 'düşük'}</span>
                </div>
                `}
            `;
        }
        
        return `
        <div class="vehicle-card" data-vehicle-id="${device.id}">
            <div class="vehicle-header">
                ${identifier}
                <span class="chip ${device.online ? 'success' : 'danger'}">
                    <i class="fas ${device.online ? 'fa-circle' : 'fa-circle-slash'}"></i>
                    ${device.online ? 'Çevrimiçi' : 'Çevrimdışı'}
                </span>
            </div>
            <div class="vehicle-model">
                <i class="fas ${device.icon}"></i>
                ${device.brand} ${device.model}
            </div>
            <div class="vehicle-stats">
                ${stats}
            </div>
            <div style="margin-top: 8px; display: flex; gap: 8px; flex-wrap: wrap;">
                <span class="chip info">
                    <i class="fas ${device.icon}"></i>
                    ${device.typeName}
                </span>
                <span class="chip ${device.riskLevel}">
                    <i class="fas fa-shield-alt"></i>
                    ${device.riskLevel === 'low' ? 'Düşük' : device.riskLevel === 'medium' ? 'Orta' : device.riskLevel === 'high' ? 'Yüksek' : 'Kritik'}
                </span>
            </div>
        </div>
        `;
    }).join('');
    
    // Add click handlers
    container.querySelectorAll('.vehicle-card').forEach(card => {
        card.addEventListener('click', () => {
            const deviceId = card.dataset.vehicleId;
            showDeviceDetails(deviceId);
        });
    });
}

// Show Device Details in Bottom Sheet
function showDeviceDetails(deviceId) {
    const device = APP_STATE.devices.find(v => v.id === deviceId);
    if (!device) return;
    
    const deviceThreats = APP_STATE.threats.filter(t => t.deviceId === deviceId);
    
    const content = document.getElementById('bottom-sheet-content');
    
    let statsHTML = '';
    let dataVisualization = '';
    const identifier = device.plate || device.serialNumber;
    
    if (device.type === 'vehicle') {
        statsHTML = `
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Batarya</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.battery}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Hız</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.speed} km/h</div>
            </div>
        `;
        dataVisualization = `
            <div style="margin-bottom: 16px;">
                <div style="font-weight: 700; margin-bottom: 8px;">CAN Bus Verileri</div>
                <div style="display: flex; gap: 2px; height: 40px; align-items: flex-end;">
                    ${device.canData.map(val => `
                        <div style="flex: 1; background: var(--primary); opacity: ${val / 100}; border-radius: 2px 2px 0 0;"></div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (device.type === 'robot') {
        statsHTML = `
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Güç</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.powerStatus}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Yük</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.load}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Sıcaklık</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.temperature}°C</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Çevrim</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.cycleCount.toLocaleString()}</div>
            </div>
        `;
        dataVisualization = `
            <div style="margin-bottom: 16px;">
                <div style="font-weight: 700; margin-bottom: 8px;">Performans Verileri</div>
                <div style="display: flex; gap: 2px; height: 40px; align-items: flex-end;">
                    ${device.performanceData.map(val => `
                        <div style="flex: 1; background: var(--primary); opacity: ${val / 100}; border-radius: 2px 2px 0 0;"></div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (device.type === 'computer') {
        statsHTML = `
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">CPU</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.cpuUsage}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Bellek</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.memoryUsage}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Disk</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.diskUsage}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Yük</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.load}%</div>
            </div>
        `;
        dataVisualization = `
            <div style="margin-bottom: 16px;">
                <div style="font-weight: 700; margin-bottom: 8px;">Ağ Trafiği</div>
                <div style="display: flex; gap: 2px; height: 40px; align-items: flex-end;">
                    ${device.networkTraffic.map(val => `
                        <div style="flex: 1; background: var(--primary); opacity: ${val / 100}; border-radius: 2px 2px 0 0;"></div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (device.type === 'equipment') {
        statsHTML = `
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Güç</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.powerStatus}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Verimlilik</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.efficiency}%</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Çalışma S.</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.operatingHours.toLocaleString()}</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Yük</div>
                <div style="font-size: 1.5rem; font-weight: 700;">${device.load}%</div>
            </div>
        `;
        dataVisualization = `
            <div style="margin-bottom: 16px;">
                <div style="font-weight: 700; margin-bottom: 8px;">Üretim Verileri</div>
                <div style="display: flex; gap: 2px; height: 40px; align-items: flex-end;">
                    ${device.productionData.map(val => `
                        <div style="flex: 1; background: var(--primary); opacity: ${val / 100}; border-radius: 2px 2px 0 0;"></div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    content.innerHTML = `
        <h3 style="margin-bottom: 16px;">${identifier}</h3>
        <div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 24px;">
            <i class="fas ${device.icon}"></i>
            ${device.brand} ${device.model} - ${device.typeName}
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
            ${statsHTML}
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Konum</div>
                <div style="font-size: 1rem; font-weight: 600;">${device.city}</div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 4px;">Risk</div>
                <span class="chip ${device.riskLevel}">${device.riskLevel === 'low' ? 'Düşük' : device.riskLevel === 'medium' ? 'Orta' : device.riskLevel === 'high' ? 'Yüksek' : 'Kritik'}</span>
            </div>
        </div>
        
        ${dataVisualization}
        
        <div style="margin-bottom: 24px;">
            <div style="font-weight: 700; margin-bottom: 8px;">Son Siber Olaylar (${deviceThreats.length})</div>
            ${deviceThreats.slice(0, 3).map(threat => `
                <div style="padding: 8px; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 8px;">
                    <div style="font-size: 0.875rem; font-weight: 600;">${threat.type}</div>
                    <div style="font-size: 0.75rem; color: var(--text-tertiary);">${new Date(threat.timestamp).toLocaleTimeString('tr-TR')}</div>
                </div>
            `).join('') || '<div style="font-size: 0.875rem; color: var(--text-secondary);">Olay bulunamadı</div>'}
        </div>
        
        <button class="btn btn-primary" style="width: 100%;" onclick="showOnMap('${device.id}')">
            <i class="fas fa-map"></i>
            Haritada Göster
        </button>
    `;
    
    openBottomSheet();
}

// Bottom Sheet Control
function openBottomSheet() {
    document.getElementById('bottom-sheet').classList.add('open');
}

function closeBottomSheet() {
    document.getElementById('bottom-sheet').classList.remove('open');
}

// Show device on map
window.showOnMap = function(deviceId) {
    closeBottomSheet();
    document.querySelector('[data-tab="map-view"]').click();
    
    setTimeout(() => {
        if (window.map && typeof focusDevice === 'function') {
            focusDevice(deviceId);
        }
    }, 300);
};

// Update Stats
function updateStats() {
    const activeCount = APP_STATE.devices.filter(v => v.online).length;
    const offlineCount = APP_STATE.devices.filter(v => !v.online).length;
    const alertsCount = APP_STATE.threats.length;
    const otaJobs = Math.floor(Math.random() * 5) + 2;
    
    document.getElementById('active-vehicles').textContent = activeCount;
    document.getElementById('offline-vehicles').textContent = offlineCount;
    document.getElementById('alerts-count').textContent = alertsCount;
    document.getElementById('ota-jobs').textContent = otaJobs;
}

// Simulate Threat
function simulateThreat() {
    const btn = document.getElementById('simulate-threat');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simüle Ediliyor...';
    
    // Animate pipeline
    animatePipeline(() => {
        // Generate threat after pipeline animation
        const device = APP_STATE.devices[Math.floor(Math.random() * APP_STATE.devices.length)];
        const deviceThreats = THREAT_TYPES[device.type] || THREAT_TYPES.vehicle;
        const threatType = deviceThreats[Math.floor(Math.random() * deviceThreats.length)];
        const severity = threatType.severity[Math.floor(Math.random() * threatType.severity.length)];
        
        const threat = {
            id: `threat_${Date.now()}`,
            type: threatType.name,
            severity,
            deviceId: device.id,
            deviceName: device.plate || device.serialNumber,
            deviceType: device.type,
            timestamp: new Date().toISOString()
        };
        
        APP_STATE.threats.unshift(threat);
        if (APP_STATE.threats.length > 20) APP_STATE.threats.pop();
        
        renderThreats();
        updateStats();
        
        showToast(`Yeni tehdit tespit edildi: ${threat.type}`, 'warning');
        
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-bolt"></i> Tehdit Simüle Et';
    });
}

// Animate Pipeline
function animatePipeline(callback) {
    const steps = ['collection', 'anonymization', 'analysis', 'anomaly', 'decision', 'event', 'response'];
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep > 0) {
            document.querySelector(`[data-step="${steps[currentStep - 1]}"]`).classList.remove('active');
        }
        
        if (currentStep < steps.length) {
            document.querySelector(`[data-step="${steps[currentStep]}"]`).classList.add('active');
            currentStep++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                document.querySelector(`[data-step="${steps[steps.length - 1]}"]`).classList.remove('active');
                callback();
            }, 300);
        }
    }, 100);
}

// Render Threats
function renderThreats() {
    const container = document.getElementById('threat-list');
    
    container.innerHTML = APP_STATE.threats.map(threat => {
        const deviceIcon = threat.deviceType ? (DEVICE_TYPES[threat.deviceType]?.icon || 'fa-microchip') : 'fa-car';
        return `
        <div class="threat-card">
            <div class="threat-header">
                <div>
                    <div class="threat-type">${threat.type}</div>
                    <div class="threat-time">${new Date(threat.timestamp).toLocaleString('tr-TR')}</div>
                </div>
                <span class="chip ${threat.severity}">${
                    threat.severity === 'low' ? 'Düşük' :
                    threat.severity === 'medium' ? 'Orta' :
                    threat.severity === 'high' ? 'Yüksek' : 'Kritik'
                }</span>
            </div>
            <div class="threat-target">
                <i class="fas ${deviceIcon}"></i>
                Hedef: ${threat.deviceName || threat.plate || 'Bilinmiyor'}
            </div>
        </div>
        `;
    }).join('');
}

// Render Maintenance
function renderMaintenance() {
    const container = document.getElementById('maintenance-list');
    
    container.innerHTML = APP_STATE.maintenanceItems.map(item => {
        const deviceIcon = item.deviceType ? (DEVICE_TYPES[item.deviceType]?.icon || 'fa-microchip') : 'fa-wrench';
        return `
        <div class="maintenance-card" data-maintenance-id="${item.id}">
            <div class="maintenance-header">
                <div>
                    <div class="maintenance-component">${item.component}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">
                        <i class="fas ${deviceIcon}"></i>
                        ${item.deviceName} - ${item.issue}
                    </div>
                </div>
            </div>
            <div class="maintenance-probability">${item.probability}%</div>
            <div class="maintenance-action">
                <i class="fas fa-wrench"></i>
                ${item.action}
            </div>
            <div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-tertiary);">
                <i class="fas fa-clock"></i>
                Tahmini ${item.daysUntil} gün içinde
            </div>
        </div>
        `;
    }).join('');
    
    // Add click handlers
    container.querySelectorAll('.maintenance-card').forEach(card => {
        card.addEventListener('click', () => {
            const maintenanceId = card.dataset.maintenanceId;
            scheduleMaintenance(maintenanceId);
        });
    });
}

// Schedule Maintenance
function scheduleMaintenance(maintenanceId) {
    const item = APP_STATE.maintenanceItems.find(m => m.id === maintenanceId);
    if (!item) return;
    
    showToast(`${item.deviceName} için ${item.component} bakımı planlandı`, 'success');
}

// Initialize Filters
function initFilters() {
    // Populate city filter
    const cityFilter = document.getElementById('city-filter');
    CITIES.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
    
    // Populate device type filter
    const deviceTypeFilter = document.getElementById('device-type-filter');
    if (deviceTypeFilter) {
        Object.keys(DEVICE_TYPES).forEach(typeKey => {
            const option = document.createElement('option');
            option.value = typeKey;
            option.textContent = DEVICE_TYPES[typeKey].name;
            deviceTypeFilter.appendChild(option);
        });
    }
    
    // Add filter listeners
    cityFilter.addEventListener('change', (e) => {
        APP_STATE.filters.city = e.target.value;
        renderDevices();
    });
    
    document.getElementById('status-filter').addEventListener('change', (e) => {
        APP_STATE.filters.status = e.target.value;
        renderDevices();
    });
    
    document.getElementById('risk-filter').addEventListener('change', (e) => {
        APP_STATE.filters.risk = e.target.value;
        renderDevices();
    });
    
    if (deviceTypeFilter) {
        deviceTypeFilter.addEventListener('change', (e) => {
            APP_STATE.filters.deviceType = e.target.value;
            renderDevices();
        });
    }
}

// Realtime Updates
function startRealtimeUpdates() {
    setInterval(() => {
        if (!APP_STATE.realtimeEnabled) return;
        
        // Update device positions and data
        APP_STATE.devices.forEach(device => {
            if (device.online) {
                device.lat += (Math.random() - 0.5) * 0.01;
                device.lon += (Math.random() - 0.5) * 0.01;
                
                if (device.type === 'vehicle') {
                    device.speed = Math.max(0, device.speed + (Math.random() - 0.5) * 10);
                    device.battery = Math.max(0, Math.min(100, device.battery + (Math.random() - 0.5) * 2));
                    device.canData = device.canData.map(val => 
                        Math.max(0, Math.min(100, val + (Math.random() - 0.5) * 10))
                    );
                } else {
                    device.load = Math.max(0, Math.min(100, device.load + (Math.random() - 0.5) * 5));
                    device.powerStatus = Math.max(0, Math.min(100, (device.powerStatus || 100) + (Math.random() - 0.5) * 2));
                    
                    if (device.performanceData) {
                        device.performanceData = device.performanceData.map(val => 
                            Math.max(0, Math.min(100, val + (Math.random() - 0.5) * 10))
                        );
                    }
                    if (device.networkTraffic) {
                        device.networkTraffic = device.networkTraffic.map(val => 
                            Math.max(0, Math.min(100, val + (Math.random() - 0.5) * 10))
                        );
                    }
                    if (device.productionData) {
                        device.productionData = device.productionData.map(val => 
                            Math.max(0, Math.min(100, val + (Math.random() - 0.5) * 10))
                        );
                    }
                    if (device.temperature) {
                        device.temperature = Math.max(20, Math.min(80, device.temperature + (Math.random() - 0.5) * 2));
                    }
                }
            }
        });
        
        if (APP_STATE.currentTab === 'device-management') {
            renderDevices();
        }
        
        if (window.map && typeof updateMarkers === 'function') {
            updateMarkers();
        }
    }, 1000);
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Generate initial data
    APP_STATE.devices = generateDevices(40);
    APP_STATE.maintenanceItems = generateMaintenanceItems();
    
    // Initialize UI
    initTabs();
    initFilters();
    renderDevices();
    renderThreats();
    renderMaintenance();
    updateStats();
    startRealtimeUpdates();
    
    // Pre-initialize map for faster loading
    setTimeout(() => {
        if (typeof initMap === 'function' && !window.map) {
            initMap();
        }
    }, 1000);
    
    // Event listeners
    document.getElementById('refresh-vehicles').addEventListener('click', () => {
        renderDevices();
        showToast('Cihaz listesi güncellendi', 'success');
    });
    
    document.getElementById('simulate-threat').addEventListener('click', simulateThreat);
    
    document.getElementById('refresh-maintenance').addEventListener('click', () => {
        renderMaintenance();
        showToast('Bakım listesi güncellendi', 'success');
    });
    
    document.getElementById('toggle-realtime').addEventListener('click', function() {
        APP_STATE.realtimeEnabled = !APP_STATE.realtimeEnabled;
        this.innerHTML = APP_STATE.realtimeEnabled 
            ? '<i class="fas fa-pause"></i><span id="realtime-text">Gerçek Zamanı Durdur</span>'
            : '<i class="fas fa-play"></i><span id="realtime-text">Gerçek Zamanı Başlat</span>';
        showToast(APP_STATE.realtimeEnabled ? 'Gerçek zamanlı güncelleme başlatıldı' : 'Gerçek zamanlı güncelleme durduruldu', 'info');
    });
    
    // Bottom sheet close on handle click
    document.querySelector('.bottom-sheet-handle').addEventListener('click', closeBottomSheet);
    
    // Close bottom sheet on background click
    document.getElementById('bottom-sheet').addEventListener('click', (e) => {
        if (e.target.id === 'bottom-sheet') {
            closeBottomSheet();
        }
    });
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateRiskScore };
}
