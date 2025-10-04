// Singularity Dashboard Fixes and Enhancements
// This file contains fixes for dashboard functionality and mobile compatibility

// Global variables for dashboard state
let dashboardState = {
    currentTab: 'device-management',
    isMobile: false,
    mapInitialized: false,
    realTimeUpdates: null,
    vehicleTracking: null
};

// Initialize dashboard fixes
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboardFixes();
    setupMobileOptimizations();
    fixMapInitialization();
    enhanceDashboardInteractions();
    startRealTimeDataUpdates();
});

// Initialize dashboard fixes
function initializeDashboardFixes() {
    console.log('Initializing dashboard fixes...');
    
    // Check if mobile device
    dashboardState.isMobile = window.innerWidth <= 768;
    
    // Fix tab switching
    fixTabSwitching();
    
    // Fix dashboard content display
    fixDashboardContent();
    
    // Fix stat cards
    fixStatCards();
    
    // Fix map containers
    fixMapContainers();
}

// Fix tab switching functionality
function fixTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const dashboardContents = document.querySelectorAll('.dashboard-content');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            dashboardContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding dashboard content
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.style.display = 'block';
                setTimeout(() => {
                    targetContent.classList.add('active');
                }, 50);
            }
            
            // Update current tab state
            dashboardState.currentTab = tabId;
            
            // Initialize map if switching to map tab
            if (tabId === 'device-management' || tabId === 'cybersecurity') {
                setTimeout(() => {
                    initializeMapsForTab(tabId);
                }, 300);
            }
            
            // Show notification
            showNotification('info', 'Dashboard Değiştirildi', getTabDisplayName(tabId));
        });
    });
}

// Fix dashboard content display
function fixDashboardContent() {
    const dashboardContents = document.querySelectorAll('.dashboard-content');
    
    dashboardContents.forEach(content => {
        // Ensure proper initial display
        if (content.id === 'device-management') {
            content.style.display = 'block';
            content.classList.add('active');
        } else {
            content.style.display = 'none';
            content.classList.remove('active');
        }
        
        // Add proper styling
        content.style.opacity = '1';
        content.style.transform = 'none';
        content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// Fix stat cards functionality
function fixStatCards() {
    const statCards = document.querySelectorAll('.device-stat-card, .cyber-stat-card, .maintenance-stat-card');
    
    statCards.forEach(card => {
        // Add click interaction
        card.addEventListener('click', function() {
            const statName = this.querySelector('.stat-title')?.textContent || 'İstatistik';
            const statValue = this.querySelector('.stat-value')?.textContent || '0';
            
            // Add pulse animation
            this.style.animation = 'pulse 0.5s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            showNotification('info', statName, `Mevcut Değer: ${statValue}`);
        });
        
        // Ensure proper hover effects
        card.style.transition = 'all 0.3s ease';
    });
}

// Fix map containers
function fixMapContainers() {
    const deviceMap = document.getElementById('device-map');
    const threatMap = document.getElementById('threat-map');
    
    if (deviceMap) {
        deviceMap.style.height = dashboardState.isMobile ? '300px' : '350px';
        deviceMap.style.borderRadius = '12px';
        deviceMap.style.overflow = 'hidden';
    }
    
    if (threatMap) {
        threatMap.style.height = dashboardState.isMobile ? '300px' : '350px';
        threatMap.style.borderRadius = '12px';
        threatMap.style.overflow = 'hidden';
    }
}

// Setup mobile optimizations
function setupMobileOptimizations() {
    if (dashboardState.isMobile) {
        // Add mobile-specific styles
        document.body.classList.add('mobile-dashboard');
        
        // Optimize touch targets
        optimizeTouchTargets();
        
        // Add swipe gestures
        addSwipeGestures();
        
        // Optimize scrolling
        optimizeScrolling();
    }
    
    // Handle resize
    window.addEventListener('resize', debounce(handleResize, 250));
}

// Optimize touch targets for mobile
function optimizeTouchTargets() {
    const touchElements = document.querySelectorAll('.tab-btn, .demo-btn, .filter-btn, .control-btn');
    
    touchElements.forEach(element => {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
    });
}

// Add swipe gestures for tab switching
function addSwipeGestures() {
    const dashboardContainer = document.querySelector('.demo-container');
    if (!dashboardContainer) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    dashboardContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    dashboardContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const tabs = ['device-management', 'cybersecurity', 'predictive-maintenance'];
            const currentIndex = tabs.indexOf(dashboardState.currentTab);
            
            if (diff > 0 && currentIndex < tabs.length - 1) {
                // Swipe left - next tab
                switchToTab(tabs[currentIndex + 1]);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous tab
                switchToTab(tabs[currentIndex - 1]);
            }
        }
    }
}

// Switch to specific tab
function switchToTab(tabId) {
    const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (tabButton) {
        tabButton.click();
    }
}

// Optimize scrolling for mobile
function optimizeScrolling() {
    const dashboardContents = document.querySelectorAll('.dashboard-content');
    
    dashboardContents.forEach(content => {
        content.style.webkitOverflowScrolling = 'touch';
        content.style.overflowY = 'auto';
        content.style.maxHeight = 'calc(100vh - 200px)';
    });
}

// Fix map initialization
function fixMapInitialization() {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.warn('Leaflet not loaded, maps will not work');
        return;
    }
    
    // Initialize maps after a delay to ensure DOM is ready
    setTimeout(() => {
        initializeMapsForTab(dashboardState.currentTab);
    }, 1000);
}

// Initialize maps for specific tab
function initializeMapsForTab(tabId) {
    if (typeof L === 'undefined') return;
    
    if (tabId === 'device-management') {
        initializeDeviceMap();
    } else if (tabId === 'cybersecurity') {
        initializeThreatMap();
    }
}

// Initialize device map
function initializeDeviceMap() {
    const mapContainer = document.getElementById('device-map');
    if (!mapContainer || typeof L === 'undefined') return;
    
    // Destroy existing map if it exists
    if (window.deviceMapInstance) {
        window.deviceMapInstance.remove();
    }
    
    // Create new map
    window.deviceMapInstance = L.map('device-map').setView([39.0, 35.0], 6);
    
    // Add tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(window.deviceMapInstance);
    
    // Add sample markers
    addSampleDeviceMarkers();
    
    // Add controls
    if (dashboardState.isMobile) {
        window.deviceMapInstance.zoomControl.setPosition('bottomright');
    }
    
    console.log('Device map initialized');
}

// Initialize threat map
function initializeThreatMap() {
    const mapContainer = document.getElementById('threat-map');
    if (!mapContainer || typeof L === 'undefined') return;
    
    // Destroy existing map if it exists
    if (window.threatMapInstance) {
        window.threatMapInstance.remove();
    }
    
    // Create new map
    window.threatMapInstance = L.map('threat-map').setView([39.0, 35.0], 6);
    
    // Add tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(window.threatMapInstance);
    
    // Add sample threat markers
    addSampleThreatMarkers();
    
    // Add controls
    if (dashboardState.isMobile) {
        window.threatMapInstance.zoomControl.setPosition('bottomright');
    }
    
    console.log('Threat map initialized');
}

// Add sample device markers
function addSampleDeviceMarkers() {
    if (!window.deviceMapInstance) return;
    
    const locations = [
        { lat: 41.015137, lng: 28.979530, name: 'İstanbul', status: 'normal', count: 142 },
        { lat: 39.925533, lng: 32.866287, name: 'Ankara', status: 'normal', count: 87 },
        { lat: 38.423733, lng: 27.142826, name: 'İzmir', status: 'warning', count: 23 },
        { lat: 40.188453, lng: 29.061056, name: 'Bursa', status: 'normal', count: 56 },
        { lat: 36.884804, lng: 30.704044, name: 'Antalya', status: 'critical', count: 38 }
    ];
    
    locations.forEach(location => {
        const color = location.status === 'normal' ? '#00ff88' : 
                     location.status === 'warning' ? '#ffdd00' : '#ff5252';
        
        const marker = L.circleMarker([location.lat, location.lng], {
            radius: 8,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(window.deviceMapInstance);
        
        marker.bindPopup(`
            <div style="font-family: Arial, sans-serif;">
                <h4 style="margin: 0 0 10px 0; color: #333;">${location.name}</h4>
                <p style="margin: 5px 0;"><strong>Cihaz Sayısı:</strong> ${location.count}</p>
                <p style="margin: 5px 0;"><strong>Durum:</strong> <span style="color: ${color}">${location.status}</span></p>
            </div>
        `);
    });
}

// Add sample threat markers
function addSampleThreatMarkers() {
    if (!window.threatMapInstance) return;
    
    const threats = [
        { lat: 41.015137, lng: 28.979530, name: 'İstanbul', type: 'CAN Bus Saldırısı', level: 'critical' },
        { lat: 39.925533, lng: 32.866287, name: 'Ankara', type: 'Şifreleme Anomalisi', level: 'warning' },
        { lat: 38.423733, lng: 27.142826, name: 'İzmir', type: 'Yetkisiz Erişim', level: 'warning' },
        { lat: 40.188453, lng: 29.061056, name: 'Bursa', type: 'Sinyal Baskısı', level: 'normal' },
        { lat: 36.884804, lng: 30.704044, name: 'Antalya', type: 'Ağ Saldırısı', level: 'critical' }
    ];
    
    threats.forEach(threat => {
        const color = threat.level === 'critical' ? '#ff5252' : 
                     threat.level === 'warning' ? '#ffdd00' : '#00d4ff';
        
        const marker = L.marker([threat.lat, threat.lng], {
            icon: L.divIcon({
                html: `<div style="background: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff;"></div>`,
                className: 'custom-threat-marker',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        }).addTo(window.threatMapInstance);
        
        marker.bindPopup(`
            <div style="font-family: Arial, sans-serif;">
                <h4 style="margin: 0 0 10px 0; color: #333;">${threat.name}</h4>
                <p style="margin: 5px 0;"><strong>Tehdit Tipi:</strong> ${threat.type}</p>
                <p style="margin: 5px 0;"><strong>Seviye:</strong> <span style="color: ${color}">${threat.level}</span></p>
                <button onclick="respondToThreat('${threat.name}')" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-top: 10px;">Müdahale Et</button>
            </div>
        `);
    });
}

// Enhance dashboard interactions
function enhanceDashboardInteractions() {
    // Fix control buttons
    fixControlButtons();
    
    // Fix filter buttons
    fixFilterButtons();
    
    // Fix action buttons
    fixActionButtons();
    
    // Fix chart interactions
    fixChartInteractions();
}

// Fix control buttons
function fixControlButtons() {
    const controlButtons = document.querySelectorAll('.demo-btn, .control-btn');
    
    controlButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const icon = this.querySelector('i');
            const action = icon ? icon.className : 'action';
            
            // Add ripple effect
            createRippleEffect(this, e);
            
            // Handle different actions
            if (action.includes('refresh')) {
                refreshCurrentDashboard();
            } else if (action.includes('plus')) {
                addNewItem();
            } else if (action.includes('cog')) {
                showNotification('info', 'Ayarlar', 'Ayarlar paneli açılıyor');
            } else if (action.includes('expand')) {
                toggleFullscreen();
            } else {
                showNotification('info', 'İşlem', 'İşlem gerçekleştiriliyor');
            }
        });
    });
}

// Fix filter buttons
function fixFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn, .category-btn, .analysis-btn, .forecast-btn, .period-btn, .chart-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from siblings
            const siblings = this.parentElement.querySelectorAll('.filter-btn, .category-btn, .analysis-btn, .forecast-btn, .period-btn, .chart-btn');
            siblings.forEach(sibling => sibling.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show notification
            const filterName = this.textContent || 'Filtre';
            showNotification('info', 'Filtre Değiştirildi', filterName);
            
            // Update dashboard content
            updateDashboardContent(this);
        });
    });
}

// Fix action buttons
function fixActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.textContent || 'İşlem';
            const predictionItem = this.closest('.prediction-item');
            
            if (predictionItem) {
                const title = predictionItem.querySelector('.prediction-title')?.textContent;
                
                if (action === 'Planla') {
                    showNotification('success', 'Bakım Planlandı', `${title} için bakım planlandı`);
                } else if (action === 'Detaylar') {
                    showNotification('info', 'Bakım Detayları', `${title} detayları görüntüleniyor`);
                }
            }
            
            // Add ripple effect
            createRippleEffect(this, e);
        });
    });
}

// Fix chart interactions
function fixChartInteractions() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach(bar => {
        bar.addEventListener('click', function() {
            const value = this.querySelector('.bar-value')?.textContent || 'Değer';
            const label = this.querySelector('.bar-label')?.textContent || 'Etiket';
            
            showNotification('info', label, `Değer: ${value}`);
        });
    });
}

// Start real-time data updates
function startRealTimeDataUpdates() {
    // Update stats every 5 seconds
    dashboardState.realTimeUpdates = setInterval(() => {
        updateRandomStats();
        updateRandomAlerts();
        updateVehiclePositions();
    }, 5000);
}

// Update random stats
function updateRandomStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const currentValue = stat.textContent;
        
        // Only update numeric values
        if (/^\d+/.test(currentValue)) {
            const numValue = parseInt(currentValue.replace(/[^\d]/g, ''));
            const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
            const newValue = Math.max(0, numValue + change);
            
            // Add animation
            stat.style.animation = 'pulse 0.5s ease-out';
            setTimeout(() => {
                stat.textContent = newValue.toLocaleString('tr-TR');
                stat.style.animation = '';
            }, 250);
        }
    });
}

// Update random alerts
function updateRandomAlerts() {
    const alertList = document.querySelector('.alert-list, .threat-list, .prediction-list');
    
    if (alertList && Math.random() > 0.7) { // 30% chance to add new alert
        const alertTypes = ['info', 'warning', 'critical'];
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        const newAlert = document.createElement('div');
        newAlert.className = `alert-item ${alertType}`;
        newAlert.style.opacity = '0';
        newAlert.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-${alertType === 'critical' ? 'exclamation-circle' : alertType === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            </div>
            <div class="alert-content">
                <div class="alert-title">Yeni Bildirim</div>
                <div class="alert-desc">Sistem otomatik olarak güncellendi</div>
                <div class="alert-time">Az önce</div>
            </div>
        `;
        
        alertList.insertBefore(newAlert, alertList.firstChild);
        
        // Animate in
        setTimeout(() => {
            newAlert.style.transition = 'opacity 0.5s ease';
            newAlert.style.opacity = '1';
        }, 100);
        
        // Remove old alerts if too many
        const alerts = alertList.querySelectorAll('.alert-item');
        if (alerts.length > 5) {
            alerts[alerts.length - 1].remove();
        }
    }
}

// Update vehicle positions
function updateVehiclePositions() {
    if (!window.deviceMapInstance) return;
    
    // This would normally update real vehicle positions
    // For demo purposes, we'll just show a notification
    if (Math.random() > 0.8) { // 20% chance
        showNotification('info', 'Araç Hareketi', 'Araç konumları güncellendi');
    }
}

// Refresh current dashboard
function refreshCurrentDashboard() {
    const currentTab = dashboardState.currentTab;
    
    // Show loading state
    const dashboardContent = document.getElementById(currentTab);
    if (dashboardContent) {
        dashboardContent.style.opacity = '0.5';
    }
    
    setTimeout(() => {
        // Reinitialize maps if needed
        if (currentTab === 'device-management') {
            initializeDeviceMap();
        } else if (currentTab === 'cybersecurity') {
            initializeThreatMap();
        }
        
        // Update stats
        updateRandomStats();
        
        // Restore opacity
        if (dashboardContent) {
            dashboardContent.style.opacity = '1';
        }
        
        showNotification('success', 'Dashboard Yenilendi', `${getTabDisplayName(currentTab)} güncellendi`);
    }, 1000);
}

// Add new item
function addNewItem() {
    const currentTab = dashboardState.currentTab;
    
    if (currentTab === 'device-management') {
        showNotification('success', 'Cihaz Eklendi', 'Yeni cihaz başarıyla eklendi');
        updateRandomStats();
    } else if (currentTab === 'cybersecurity') {
        showNotification('warning', 'Tehdit Simülasyonu', 'Yeni tehdit simülasyonu oluşturuldu');
        updateRandomAlerts();
    } else if (currentTab === 'predictive-maintenance') {
        showNotification('info', 'Bakım Planı', 'Yeni bakım planı oluşturuldu');
        updateRandomAlerts();
    }
}

// Toggle fullscreen
function toggleFullscreen() {
    const dashboardContainer = document.querySelector('.demo-container');
    
    if (!document.fullscreenElement) {
        dashboardContainer.requestFullscreen().then(() => {
            showNotification('info', 'Tam Ekran', 'Tam ekran modu aktif');
        }).catch(err => {
            showNotification('error', 'Hata', 'Tam ekran modu açılamadı');
        });
    } else {
        document.exitFullscreen().then(() => {
            showNotification('info', 'Tam Ekran', 'Tam ekran modu kapatıldı');
        });
    }
}

// Update dashboard content based on filter
function updateDashboardContent(button) {
    const filterType = button.className;
    const currentTab = dashboardState.currentTab;
    
    // Add loading animation
    const dashboardContent = document.getElementById(currentTab);
    if (dashboardContent) {
        const cards = dashboardContent.querySelectorAll('.device-stat-card, .cyber-stat-card, .maintenance-stat-card, .category-card');
        cards.forEach(card => {
            card.style.animation = 'pulse 0.5s ease-out';
        });
    }
    
    setTimeout(() => {
        // Remove animations
        const cards = dashboardContent.querySelectorAll('.device-stat-card, .cyber-stat-card, .maintenance-stat-card, .category-card');
        cards.forEach(card => {
            card.style.animation = '';
        });
    }, 500);
}

// Handle window resize
function handleResize() {
    const wasMobile = dashboardState.isMobile;
    dashboardState.isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== dashboardState.isMobile) {
        // Mobile state changed
        if (dashboardState.isMobile) {
            setupMobileOptimizations();
        } else {
            // Remove mobile optimizations
            document.body.classList.remove('mobile-dashboard');
        }
        
        // Reinitialize maps
        initializeMapsForTab(dashboardState.currentTab);
    }
    
    // Update map sizes
    const deviceMap = document.getElementById('device-map');
    const threatMap = document.getElementById('threat-map');
    
    if (deviceMap) {
        deviceMap.style.height = dashboardState.isMobile ? '300px' : '350px';
        if (window.deviceMapInstance) {
            setTimeout(() => {
                window.deviceMapInstance.invalidateSize();
            }, 100);
        }
    }
    
    if (threatMap) {
        threatMap.style.height = dashboardState.isMobile ? '300px' : '350px';
        if (window.threatMapInstance) {
            setTimeout(() => {
                window.threatMapInstance.invalidateSize();
            }, 100);
        }
    }
}

// Get tab display name
function getTabDisplayName(tabId) {
    const names = {
        'device-management': 'Cihaz Yönetimi',
        'cybersecurity': 'Siber Güvenlik',
        'predictive-maintenance': 'Kestirimci Bakım'
    };
    return names[tabId] || tabId;
}

// Create ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show notification (reusing existing function if available)
function showNotification(type, title, message) {
    if (window.showNotification) {
        window.showNotification(type, title, message);
        return;
    }
    
    // Fallback notification system
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconClass = {
        info: 'fas fa-info-circle',
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-exclamation-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${iconClass[type] || iconClass.info}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global function for threat response
window.respondToThreat = function(threatName) {
    showNotification('success', 'Tehdit Müdahalesi', `${threatName} için müdahale başarılı`);
    
    // Update threat markers if map exists
    if (window.threatMapInstance) {
        // This would update the specific threat marker
        console.log('Threat responded:', threatName);
    }
};

// Add CSS for new animations and styles
const dashboardFixesStyles = document.createElement('style');
dashboardFixesStyles.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .mobile-dashboard {
        touch-action: manipulation;
    }
    
    .mobile-dashboard .dashboard-content {
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(10px);
        border-left: 4px solid var(--accent);
        border-radius: 8px;
        padding: 15px 20px;
        min-width: 300px;
        max-width: 450px;
        display: flex;
        align-items: flex-start;
        gap: 15px;
        box-shadow: var(--shadow);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.info { border-left-color: var(--info); }
    .notification.success { border-left-color: var(--success); }
    .notification.warning { border-left-color: var(--warning); }
    .notification.error { border-left-color: var(--danger); }
    
    .notification-icon {
        font-size: 1.5rem;
        color: var(--accent);
    }
    
    .notification.info .notification-icon { color: var(--info); }
    .notification.success .notification-icon { color: var(--success); }
    .notification.warning .notification-icon { color: var(--warning); }
    .notification.error .notification-icon { color: var(--danger); }
    
    .notification-content {
        flex: 1;
    }
    
    .notification-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-light);
        margin-bottom: 5px;
    }
    
    .notification-message {
        font-size: 0.85rem;
        color: var(--text-muted);
        line-height: 1.4;
    }
    
    .notification-close {
        color: var(--text-muted);
        font-size: 0.9rem;
        line-height: 1;
        padding: 5px;
        background: none;
        border: none;
        cursor: pointer;
        align-self: flex-start;
        margin-left: auto;
    }
    
    .notification-close:hover {
        color: var(--text-light);
    }
    
    @media (max-width: 767px) {
        .notification {
            bottom: 10px;
            right: 10px;
            left: 10px;
            min-width: auto;
            max-width: none;
        }
    }
`;

document.head.appendChild(dashboardFixesStyles);

console.log('Dashboard fixes loaded successfully');
