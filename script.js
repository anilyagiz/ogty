// Singularity Automotive IoT Security Platform - Interactive JavaScript

// DOM Elements
const notificationContainer = document.getElementById('notification-container');

// Map Elements
const deviceMapBtn = document.getElementById('device-map-view');
const deviceListBtn = document.getElementById('device-list-view');
const deviceMapRefreshBtn = document.getElementById('device-map-refresh');
const deviceMapContainer = document.getElementById('device-map');
const deviceListContainer = document.getElementById('device-list');

// Dashboard Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const dashboardContents = document.querySelectorAll('.dashboard-content');

// Demo Controls
const addVehicleBtn = document.getElementById('add-vehicle');
const simulateThreatBtn = document.getElementById('simulate-threat');
const clearThreatsBtn = document.getElementById('clear-threats');
const resetDemoBtn = document.getElementById('reset-demo');

// Demo Elements
const demoVehicles = document.querySelector('.demo-vehicles');
const threatVehicles = document.querySelector('.threat-vehicles');
const alertList = document.querySelector('.alert-list');
const threatList = document.querySelector('.threat-list');
const predictionList = document.querySelector('.prediction-list');

// Device Management Elements
const deviceStatCards = document.querySelectorAll('.device-stat-card .stat-value');
const categoryCards = document.querySelectorAll('.category-card');

// Cybersecurity Elements
const cyberStatCards = document.querySelectorAll('.cyber-stat-card .stat-value');
const activeVehiclesStat = document.querySelector('.cyber-stat-card:nth-child(1) .stat-value');
const threatsStat = document.querySelector('.cyber-stat-card:nth-child(2) .stat-value');
const blockedAttacksStat = document.querySelector('.cyber-stat-card:nth-child(3) .stat-value');
const systemStatusStat = document.querySelector('.cyber-stat-card:nth-child(4) .stat-value');

// Predictive Maintenance Elements
const maintenanceStatCards = document.querySelectorAll('.maintenance-stat-card .stat-value');
const chartButtons = document.querySelectorAll('.chart-btn');

// State Management
let vehicleCount = 5;
let threatCount = 3;
let blockedAttacksCount = 142;
let systemStatusValue = 98.7;
let vehicles = [];
let threats = [];
let alerts = [];
let currentDashboard = 'device-management';
let isAnimating = false;
let particleSystem = null;
let dataUpdateInterval = null;
let animationFrameId = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeDemo();
    initializeAdvancedFeatures();
    initializeInteractiveComponents();
    initializeMapControls();
    
    // Handle URL hash for initial tab selection
    handleInitialTabFromHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
});

// Initialize App
function initializeApp() {
    // Set initial vehicle positions
    initializeVehicles();
    
    // Set initial alerts
    initializeAlerts();
    
    // Start real-time updates
    startRealTimeUpdates();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup intersection observer for animations
    setupIntersectionObserver();
    
    // Initialize particle system
    initializeParticleSystem();
    
    // Initialize advanced animations
    initializeAdvancedAnimations();
}

// Initialize Advanced Features
function initializeAdvancedFeatures() {
    // Add hover effects to cards
    addCardHoverEffects();
    
    // Add click interactions to dashboard elements
    addDashboardInteractions();
    
    // Initialize data visualization enhancements
    enhanceDataVisualization();
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
}

// Setup Event Listeners
function setupEventListeners() {
    // Dashboard tab switching with enhanced animation
    tabButtons.forEach((button, index) => {
        // Set initial ARIA attributes
        button.setAttribute('id', `${button.getAttribute('data-tab')}-tab`);
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
        button.setAttribute('aria-controls', button.getAttribute('data-tab'));
        button.setAttribute('tabindex', button.classList.contains('active') ? '0' : '-1');
        
        // Handle both click and touch events for mobile compatibility
        const handleTabSwitch = (e) => {
            e.preventDefault();
            if (isAnimating) return;
            isAnimating = true;
            
            const tabId = button.getAttribute('data-tab');
            
            // Add ripple effect
            createRippleEffect(button, e);
            
            // Switch dashboard with animation
            switchDashboard(tabId);
            
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        };
        
        // Handle keyboard events for accessibility
        const handleKeyDown = (e) => {
            let targetButton = null;
            
            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    handleTabSwitch(e);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    targetButton = tabButtons[index - 1] || tabButtons[tabButtons.length - 1];
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    targetButton = tabButtons[index + 1] || tabButtons[0];
                    break;
                case 'Home':
                    e.preventDefault();
                    targetButton = tabButtons[0];
                    break;
                case 'End':
                    e.preventDefault();
                    targetButton = tabButtons[tabButtons.length - 1];
                    break;
            }
            
            if (targetButton) {
                targetButton.focus();
                targetButton.click();
            }
        };
        
        button.addEventListener('click', handleTabSwitch);
        button.addEventListener('touchend', handleTabSwitch);
        button.addEventListener('keydown', handleKeyDown);
        
        // Add visual feedback for touch devices
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', () => {
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
    
    // Demo controls with enhanced feedback
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', (e) => {
            createRippleEffect(addVehicleBtn, e);
            addVehicle();
        });
    }
    
    if (simulateThreatBtn) {
        simulateThreatBtn.addEventListener('click', (e) => {
            createRippleEffect(simulateThreatBtn, e);
            simulateThreat();
        });
    }
    
    if (clearThreatsBtn) {
        clearThreatsBtn.addEventListener('click', (e) => {
            createRippleEffect(clearThreatsBtn, e);
            clearThreats();
        });
    }
    
    if (resetDemoBtn) {
        resetDemoBtn.addEventListener('click', (e) => {
            createRippleEffect(resetDemoBtn, e);
            resetDemo();
        });
    }
    
    // Chart controls for predictive maintenance with animation
    chartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
            
            // Remove active class from all buttons
            chartButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update chart with animation
            animateChartTransition(button.textContent);
        });
    });
    
    // Predictive maintenance controls
    const scheduleMaintenanceBtn = document.getElementById('schedule-maintenance');
    const analyzePredictionsBtn = document.getElementById('analyze-predictions');
    const exportReportsBtn = document.getElementById('export-reports');
    
    if (scheduleMaintenanceBtn) {
        scheduleMaintenanceBtn.addEventListener('click', (e) => {
            createRippleEffect(scheduleMaintenanceBtn, e);
            showNotification('info', 'Bakım Planlandı', 'Yeni bakım görevi başarıyla planlandı');
        });
    }
    
    if (analyzePredictionsBtn) {
        analyzePredictionsBtn.addEventListener('click', (e) => {
            createRippleEffect(analyzePredictionsBtn, e);
            showNotification('info', 'Analiz Başlatıldı', 'Kestirimci bakım analizi başlatıldı');
        });
    }
    
    if (exportReportsBtn) {
        exportReportsBtn.addEventListener('click', (e) => {
            createRippleEffect(exportReportsBtn, e);
            showNotification('success', 'Rapor Dışa Aktarıldı', 'Bakım raporu başarıyla dışa aktarıldı');
        });
    }
    
    // Cybersecurity controls
    const scanThreatsBtn = document.getElementById('scan-threats');
    const blockThreatsBtn = document.getElementById('block-threats');
    const reportThreatsBtn = document.getElementById('report-threats');
    
    if (scanThreatsBtn) {
        scanThreatsBtn.addEventListener('click', (e) => {
            createRippleEffect(scanThreatsBtn, e);
            showNotification('info', 'Tehdit Taraması', 'Tehdit taraması başlatıldı');
        });
    }
    
    if (blockThreatsBtn) {
        blockThreatsBtn.addEventListener('click', (e) => {
            createRippleEffect(blockThreatsBtn, e);
            showNotification('success', 'Tehditler Engellendi', 'Tüm tehditler başarıyla engellendi');
        });
    }
    
    if (reportThreatsBtn) {
        reportThreatsBtn.addEventListener('click', (e) => {
            createRippleEffect(reportThreatsBtn, e);
            showNotification('info', 'Rapor Oluşturuldu', 'Tehdit raporu oluşturuldu');
        });
    }
    
    // Forecast buttons for predictive maintenance
    const forecastButtons = document.querySelectorAll('.forecast-btn');
    forecastButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
            
            // Remove active class from all buttons
            forecastButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            showNotification('info', 'Periyot Değiştirildi', `Bakım tahmin periyodu: ${button.textContent}`);
        });
    });
    
    // Filter buttons for predictions
    const predictionFilterButtons = document.querySelectorAll('.prediction-filter .filter-btn');
    predictionFilterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
            
            // Remove active class from all buttons
            predictionFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            showNotification('info', 'Filtre Değiştirildi', `Bakım öngörü filtresi: ${button.textContent}`);
        });
    });
    
    // Period buttons for performance metrics
    const performancePeriodButtons = document.querySelectorAll('.performance-period .period-btn');
    performancePeriodButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
            
            // Remove active class from all buttons
            performancePeriodButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            showNotification('info', 'Periyot Değiştirildi', `Performans periyodu: ${button.textContent}`);
        });
    });
    
    // Analysis buttons for cybersecurity
    const analysisButtons = document.querySelectorAll('.analysis-btn');
    analysisButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
            
            // Remove active class from all buttons
            analysisButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            showNotification('info', 'Analiz Türü Değiştirildi', `Tehdit analizi: ${button.textContent}`);
        });
    });
    
    // Event filter buttons for cybersecurity
    const eventsFilterButtons = document.querySelectorAll('.events-filter .filter-btn');
    eventsFilterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
            
            // Remove active class from all buttons
            eventsFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            showNotification('info', 'Filtre Değiştirildi', `Olay filtresi: ${button.textContent}`);
        });
    });
    
    // Action buttons for prediction items
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
            
            const predictionItem = button.closest('.prediction-item');
            const predictionTitle = predictionItem.querySelector('.prediction-title').textContent;
            
            if (button.textContent === 'Planla') {
                showNotification('success', 'Bakım Planlandı', `${predictionTitle} için bakım planlandı`);
            } else if (button.textContent === 'Detaylar') {
                showNotification('info', 'Bakım Detayları', `${predictionTitle} detayları görüntüleniyor`);
            }
        });
    });
    
    // Category buttons for device management
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            showNotification('info', 'Kategori Seçildi', `Cihaz kategorisi: ${button.textContent}`);
        });
    });
    
    // Period buttons for device performance
    const devicePerformanceButtons = document.querySelectorAll('.performance-period .period-btn');
    devicePerformanceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
            
            // Remove active class from all buttons
            devicePerformanceButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            showNotification('info', 'Periyot Değiştirildi', `Performans periyodu: ${button.textContent}`);
        });
    });
    
    // Device management controls
    const refreshDevicesBtn = document.getElementById('refresh-devices');
    const addDeviceBtn = document.getElementById('add-device');
    
    if (refreshDevicesBtn) {
        refreshDevicesBtn.addEventListener('click', (e) => {
            createRippleEffect(refreshDevicesBtn, e);
            showNotification('info', 'Cihazlar Yenilendi', 'Cihaz listesi başarıyla güncellendi');
        });
    }
    
    if (addDeviceBtn) {
        addDeviceBtn.addEventListener('click', (e) => {
            createRippleEffect(addDeviceBtn, e);
            showNotification('success', 'Cihaz Eklendi', 'Yeni cihaz başarıyla eklendi');
        });
    }
    
    // Window resize handler with debouncing
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Handle orientation change
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Add visibility change handler to pause animations when tab is not visible
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Add touch event handling for mobile swipe gestures on tabs
    setupTouchGestures();
}


// Smooth Scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
            }
        });
    });
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .audience-card, .achievement, .arch-item');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize Demo
function initializeDemo() {
    updateStats();
    renderVehicles();
    renderAlerts();
    initializeDeviceManagement();
    initializeCybersecurity();
    initializePredictiveMaintenance();
}

// Dashboard Switching with Enhanced Animation
function switchDashboard(tabId) {
    // Prevent switching to the same tab
    if (currentDashboard === tabId) return;
    
    // Update tab buttons with animation and accessibility
    tabButtons.forEach(button => {
        const isActive = button.getAttribute('data-tab') === tabId;
        
        if (isActive) {
            button.classList.add('active');
            // Update ARIA attributes
            button.setAttribute('aria-selected', 'true');
            button.setAttribute('tabindex', '0');
            
            // Add pulse animation to active tab
            button.style.animation = 'pulse 0.5s ease-out';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        } else {
            button.classList.remove('active');
            // Update ARIA attributes
            button.setAttribute('aria-selected', 'false');
            button.setAttribute('tabindex', '-1');
        }
    });
    
    // Update dashboard content with enhanced animation and accessibility
    dashboardContents.forEach(content => {
        const isActive = content.id === tabId;
        
        if (isActive) {
            // First hide all contents
            content.style.display = 'none';
            content.classList.remove('active');
            content.setAttribute('hidden', '');
            
            // Then show the selected one with enhanced animation
            setTimeout(() => {
                content.style.display = 'block';
                content.removeAttribute('hidden');
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
                content.classList.add('active');
                
                // Add smooth transition
                content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }, 50);
            }, 100);
        } else {
            // Fade out the current dashboard with enhanced animation
            content.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            content.style.opacity = '0';
            content.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                content.classList.remove('active');
                content.style.display = 'none';
                content.setAttribute('hidden', '');
            }, 200);
        }
    });
    
    // Update current dashboard
    currentDashboard = tabId;
    
    // Announce to screen readers
    announceToScreenReader(`${getTabDisplayName(tabId)} sekmesi açıldı`);
    
    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Initialize dashboard-specific features with animation
    switch(tabId) {
        case 'device-management':
            setTimeout(() => {
                animateDashboardEntry('device-management');
                updateDeviceManagement();
                
                // Initialize map if switching to device management
                if (deviceMap) {
                    setTimeout(() => {
                        deviceMap.invalidateSize();
                    }, 300);
                }
            }, 200);
            break;
        case 'cybersecurity':
            setTimeout(() => {
                animateDashboardEntry('cybersecurity');
                updateCybersecurity();
                
                // Initialize threat map if switching to cybersecurity
                if (typeof initializeThreatMap === 'function') {
                    initializeThreatMap();
                    setTimeout(() => {
                        if (threatMap) {
                            threatMap.invalidateSize();
                        }
                    }, 300);
                }
            }, 200);
            break;
        case 'predictive-maintenance':
            setTimeout(() => {
                animateDashboardEntry('predictive-maintenance');
                updatePredictiveMaintenance();
            }, 200);
            break;
    }
    
    // Update URL hash for better navigation (but don't trigger hash change event)
    if (window.location.hash !== `#${tabId}`) {
        history.pushState(null, null, `#${tabId}`);
    }
    
    // Optimize tab scrolling for mobile after switch
    if (window.innerWidth <= 768) {
        optimizeTabScrolling();
    }
}

// Get display name for tab
function getTabDisplayName(tabId) {
    const tabNames = {
        'device-management': 'Cihaz Yönetimi',
        'cybersecurity': 'Siber Güvenlik',
        'predictive-maintenance': 'Kestirimci Bakım'
    };
    return tabNames[tabId] || tabId;
}

// Announce to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Initialize Vehicles
function initializeVehicles() {
    vehicles = [
        { id: 1, x: 20, y: 30, status: 'normal' },
        { id: 2, x: 60, y: 50, status: 'warning' },
        { id: 3, x: 40, y: 70, status: 'critical' },
        { id: 4, x: 75, y: 25, status: 'normal' },
        { id: 5, x: 30, y: 60, status: 'normal' }
    ];
}

// Initialize Alerts
function initializeAlerts() {
    alerts = [
        {
            id: 1,
            type: 'critical',
            title: 'Kritik: CAN Bus Saldırısı',
            description: 'Araç ID: TR-342 - Anormal veri akışı tespit edildi',
            time: '2 dakika önce'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Uyarı: Şifreleme Anomalisi',
            description: 'Araç ID: TR-189 - Zayıf şifreleme protokolü',
            time: '4 dakika önce'
        },
        {
            id: 3,
            type: 'info',
            title: 'Bilgi: Yazılım Güncellemesi',
            description: 'Araç ID: TR-567 - Güvenlik güncellemesi tamamlandı',
            time: '5 dakika önce'
        }
    ];
}

// Add Vehicle with Enhanced Animation
function addVehicle() {
    const newVehicle = {
        id: vehicles.length + 1,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        status: 'normal'
    };
    
    vehicles.push(newVehicle);
    vehicleCount++;
    
    // Also add to threat vehicles if in cybersecurity dashboard
    if (currentDashboard === 'cybersecurity') {
        const newThreat = {
            id: threats.length + 1,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            status: 'normal'
        };
        
        threats.push(newThreat);
        renderThreatVehicles();
    }
    
    // Animate vehicle addition
    animateVehicleAddition(newVehicle);
    
    renderVehicles();
    updateStats();
    
    // Create particle effect at vehicle position
    createParticleEffect(newVehicle.x, newVehicle.y, 'success');
    
    showNotification('success', 'Yeni Araç Eklendi', `Araç ID: TR-${newVehicle.id} sisteme eklendi`);
}

// Simulate Threat with Enhanced Animation
function simulateThreat() {
    if (currentDashboard === 'cybersecurity') {
        // Use threat vehicles for cybersecurity dashboard
        if (threats.length === 0) {
            showNotification('warning', 'Araç Bulunamadı', 'Önce bir araç ekleyin');
            return;
        }
        
        // Select random threat vehicle
        const randomIndex = Math.floor(Math.random() * threats.length);
        const threat = threats[randomIndex];
        
        // Change vehicle status to threat
        const threatTypes = ['warning', 'critical'];
        const newStatus = threatTypes[Math.floor(Math.random() * threatTypes.length)];
        
        // Animate status change
        animateThreatDetection(threat, newStatus);
        
        // Create new alert
        const alertTypes = {
            warning: {
                title: 'Uyarı: Anormallik Tespiti',
                description: `Araç ID: TR-${threat.id} - Şüpheli aktivite tespit edildi`
            },
            critical: {
                title: 'Kritik: Saldırı Tespiti',
                description: `Araç ID: TR-${threat.id} - Siber saldırı tespit edildi`
            }
        };
        
        const newAlert = {
            id: alerts.length + 1,
            type: newStatus,
            title: alertTypes[newStatus].title,
            description: alertTypes[newStatus].description,
            time: 'Az önce'
        };
        
        alerts.unshift(newAlert);
        threatCount++;
        
        // Create particle effect at threat position
        createParticleEffect(threat.x, threat.y, newStatus);
        
        // Simulate blocking the attack after a delay with animation
        setTimeout(() => {
            if (threat.status === 'critical' || threat.status === 'warning') {
                animateThreatResolution(threat);
                
                threat.status = 'normal';
                blockedAttacksCount++;
                
                // Add success alert
                const successAlert = {
                    id: alerts.length + 1,
                    type: 'success',
                    title: 'Başarılı: Saldırı Engellendi',
                    description: `Araç ID: TR-${threat.id} - Saldırı başarıyla engellendi`,
                    time: 'Az önce'
                };
                
                alerts.unshift(successAlert);
                
                renderThreatVehicles();
                renderAlerts();
                updateStats();
                
                // Create success particle effect
                createParticleEffect(threat.x, threat.y, 'success');
                
                showNotification('success', 'Saldırı Engellendi', `Araç ID: TR-${threat.id} için saldırı engellendi`);
            }
        }, 3000);
        
        renderThreatVehicles();
        renderAlerts();
        updateStats();
        
        showNotification('danger', 'Tehdit Tespit Edildi', alertTypes[newStatus].description);
    } else {
        // Original implementation for other dashboards
        if (vehicles.length === 0) {
            showNotification('warning', 'Araç Bulunamadı', 'Önce bir araç ekleyin');
            return;
        }
        
        // Select random vehicle
        const randomIndex = Math.floor(Math.random() * vehicles.length);
        const vehicle = vehicles[randomIndex];
        
        // Change vehicle status to threat
        const threatTypes = ['warning', 'critical'];
        const newStatus = threatTypes[Math.floor(Math.random() * threatTypes.length)];
        
        // Animate status change
        animateThreatDetection(vehicle, newStatus);
        
        // Create new alert
        const alertTypes = {
            warning: {
                title: 'Uyarı: Anormallik Tespiti',
                description: `Araç ID: TR-${vehicle.id} - Şüpheli aktivite tespit edildi`
            },
            critical: {
                title: 'Kritik: Saldırı Tespiti',
                description: `Araç ID: TR-${vehicle.id} - Siber saldırı tespit edildi`
            }
        };
        
        const newAlert = {
            id: alerts.length + 1,
            type: newStatus,
            title: alertTypes[newStatus].title,
            description: alertTypes[newStatus].description,
            time: 'Az önce'
        };
        
        alerts.unshift(newAlert);
        threatCount++;
        
        // Create particle effect at threat position
        createParticleEffect(vehicle.x, vehicle.y, newStatus);
        
        // Simulate blocking the attack after a delay with animation
        setTimeout(() => {
            if (vehicle.status === 'critical' || vehicle.status === 'warning') {
                animateThreatResolution(vehicle);
                
                vehicle.status = 'normal';
                blockedAttacksCount++;
                
                // Add success alert
                const successAlert = {
                    id: alerts.length + 1,
                    type: 'success',
                    title: 'Başarılı: Saldırı Engellendi',
                    description: `Araç ID: TR-${vehicle.id} - Saldırı başarıyla engellendi`,
                    time: 'Az önce'
                };
                
                alerts.unshift(successAlert);
                
                renderVehicles();
                renderAlerts();
                updateStats();
                
                // Create success particle effect
                createParticleEffect(vehicle.x, vehicle.y, 'success');
                
                showNotification('success', 'Saldırı Engellendi', `Araç ID: TR-${vehicle.id} için saldırı engellendi`);
            }
        }, 3000);
        
        renderVehicles();
        renderAlerts();
        updateStats();
        
        showNotification('danger', 'Tehdit Tespit Edildi', alertTypes[newStatus].description);
    }
}

// Clear Threats
function clearThreats() {
    if (currentDashboard === 'cybersecurity') {
        threats.forEach(threat => {
            if (threat.status === 'warning' || threat.status === 'critical') {
                threat.status = 'normal';
                blockedAttacksCount++;
            }
        });
        
        renderThreatVehicles();
    } else {
        vehicles.forEach(vehicle => {
            if (vehicle.status === 'warning' || vehicle.status === 'critical') {
                vehicle.status = 'normal';
                blockedAttacksCount++;
            }
        });
        
        renderVehicles();
    }
    
    threatCount = 0;
    
    // Add system alert
    const clearAlert = {
        id: alerts.length + 1,
        type: 'info',
        title: 'Sistem Temizlendi',
        description: 'Tüm tehditler temizlendi, sistem normal durumda',
        time: 'Az önce'
    };
    
    alerts.unshift(clearAlert);
    renderAlerts();
    updateStats();
    
    showNotification('info', 'Tehditler Temizlendi', 'Tüm araçlar güvenli durumda');
}

// Reset Demo
function resetDemo() {
    initializeVehicles();
    initializeThreatVehicles();
    initializeAlerts();
    
    vehicleCount = 5;
    threatCount = 3;
    blockedAttacksCount = 142;
    systemStatusValue = 98.7;
    
    renderVehicles();
    renderThreatVehicles();
    renderAlerts();
    updateStats();
    
    // Reset all dashboards
    initializeDeviceManagement();
    initializeCybersecurity();
    initializePredictiveMaintenance();
    
    showNotification('info', 'Demo Sıfırlandı', 'Tüm değerler başlangıç durumuna getirildi');
}

// Render Vehicles
function renderVehicles() {
    if (!demoVehicles) return;
    
    demoVehicles.innerHTML = '';
    
    vehicles.forEach(vehicle => {
        const vehicleElement = document.createElement('div');
        vehicleElement.className = `demo-vehicle ${vehicle.status}`;
        vehicleElement.style.top = `${vehicle.y}%`;
        vehicleElement.style.left = `${vehicle.x}%`;
        vehicleElement.setAttribute('data-id', vehicle.id);
        
        const pulseElement = document.createElement('div');
        pulseElement.className = 'vehicle-pulse';
        
        vehicleElement.appendChild(pulseElement);
        demoVehicles.appendChild(vehicleElement);
    });
}

// Render Alerts
function renderAlerts() {
    if (!alertList) return;
    
    alertList.innerHTML = '';
    
    // Show only the first 5 alerts
    const recentAlerts = alerts.slice(0, 5);
    
    recentAlerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert-item ${alert.type}`;
        
        const iconClass = {
            critical: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle',
            success: 'fas fa-check-circle'
        };
        
        alertElement.innerHTML = `
            <div class="alert-icon">
                <i class="${iconClass[alert.type]}"></i>
            </div>
            <div class="alert-content">
                <div class="alert-title">${alert.title}</div>
                <div class="alert-desc">${alert.description}</div>
                <div class="alert-time">${alert.time}</div>
            </div>
        `;
        
        alertList.appendChild(alertElement);
    });
}

// Update Stats
function updateStats() {
    if (activeVehiclesStat) {
        activeVehiclesStat.textContent = vehicleCount.toLocaleString('tr-TR');
    }
    
    if (threatsStat) {
        threatsStat.textContent = threatCount;
    }
    
    if (blockedAttacksStat) {
        blockedAttacksStat.textContent = blockedAttacksCount.toLocaleString('tr-TR');
    }
    
    if (systemStatusStat) {
        systemStatusStat.textContent = `${systemStatusValue}%`;
    }
}

// Show Notification with Enhanced Animation
function showNotification(type, title, message) {
    if (!notificationContainer) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconClass = {
        info: 'fas fa-info-circle',
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-exclamation-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${iconClass[type]}"></i>
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
    
    // Add close functionality with animation
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        animateNotificationExit(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        animateNotificationExit(notification);
    }, 5000);
    
    // Show notification with enhanced animation
    setTimeout(() => {
        notification.classList.add('show');
        notification.style.transform = 'translateX(0) scale(1)';
    }, 10);
}

// Animate Notification Exit
function animateNotificationExit(notification) {
    notification.style.transform = 'translateX(120%) scale(0.8)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Remove Notification
function removeNotification(notification) {
    notification.classList.remove('show');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Start Real-time Updates
function startRealTimeUpdates() {
    // Update system status periodically
    setInterval(() => {
        // Small random fluctuation in system status
        const fluctuation = (Math.random() - 0.5) * 0.2;
        systemStatusValue = Math.max(95, Math.min(99.9, systemStatusValue + fluctuation));
        
        if (systemStatusStat) {
            systemStatusStat.textContent = `${systemStatusValue.toFixed(1)}%`;
        }
    }, 5000);
    
    // Random vehicle movement
    setInterval(() => {
        if (vehicles.length > 0) {
            const randomIndex = Math.floor(Math.random() * vehicles.length);
            const vehicle = vehicles[randomIndex];
            
            // Small random movement
            vehicle.x = Math.max(5, Math.min(95, vehicle.x + (Math.random() - 0.5) * 5));
            vehicle.y = Math.max(5, Math.min(95, vehicle.y + (Math.random() - 0.5) * 5));
            
            renderVehicles();
        }
    }, 3000);
    
    // Random threat vehicle movement
    setInterval(() => {
        if (threats.length > 0) {
            const randomIndex = Math.floor(Math.random() * threats.length);
            const threat = threats[randomIndex];
            
            // Small random movement
            threat.x = Math.max(5, Math.min(95, threat.x + (Math.random() - 0.5) * 5));
            threat.y = Math.max(5, Math.min(95, threat.y + (Math.random() - 0.5) * 5));
            
            renderThreatVehicles();
        }
    }, 3000);
    
    // Update dashboard data periodically
    setInterval(() => {
        if (currentDashboard === 'device-management') {
            updateDeviceManagement();
        } else if (currentDashboard === 'cybersecurity') {
            updateCybersecurity();
        } else if (currentDashboard === 'predictive-maintenance') {
            updatePredictiveMaintenance();
        }
    }, 10000);
    
    // Simulate random device status changes
    setInterval(() => {
        if (Math.random() > 0.7) {
            simulateDeviceStatusChange();
        }
    }, 15000);
    
    // Simulate random maintenance predictions
    setInterval(() => {
        if (Math.random() > 0.8) {
            addNewMaintenancePrediction();
        }
    }, 20000);
}

// Handle Resize
function handleResize() {
    // Adjust layout for different screen sizes
    if (window.innerWidth < 768) {
        // Mobile adjustments
        document.body.classList.add('mobile-view');
    } else {
        // Desktop adjustments
        document.body.classList.remove('mobile-view');
    }
}

// Handle Orientation Change
function handleOrientationChange() {
    // Add orientation change handling if needed
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
}


// Performance optimization for mobile
function optimizeForMobile() {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Reduce animations for better performance
        document.body.classList.add('mobile-device');
        
        // Optimize scrolling
        document.body.style.touchAction = 'pan-y';
        
        // Disable hover effects on touch devices
        document.body.classList.add('touch-device');
    }
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', optimizeForMobile);

// Accessibility improvements
function setupAccessibility() {
    // Add keyboard navigation for demo controls
    const controlButtons = document.querySelectorAll('.control-btn');
    
    controlButtons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
        
        // Add focus indicator
        button.addEventListener('focus', () => {
            button.setAttribute('aria-pressed', 'false');
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', setupAccessibility);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showNotification('danger', 'Sistem Hatası', 'Beklenmedik bir hata oluştu');
});

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Device Management Dashboard Functions
function initializeDeviceManagement() {
    // Initialize device stats
    updateDeviceStats();
    
    // Initialize device categories
    updateDeviceCategories();
    
    // Initialize device alerts
    updateDeviceAlerts();
}

function updateDeviceManagement() {
    updateDeviceStats();
    updateDeviceCategories();
    updateDeviceAlerts();
}

function updateDeviceStats() {
    const deviceStats = [
        { value: 3428, change: 156, positive: true },
        { value: 3287, change: 98.9, positive: true },
        { value: 47, change: 12, positive: false },
        { value: 94, change: 8, positive: false }
    ];
    
    deviceStatCards.forEach((card, index) => {
        if (card && deviceStats[index]) {
            card.textContent = deviceStats[index].value.toLocaleString('tr-TR');
        }
    });
}

function updateDeviceCategories() {
    const categories = [
        { name: 'Araç ECU\'ları', count: 1847, active: 1792, percentage: 97 },
        { name: 'Telematik Birimleri', count: 892, active: 876, percentage: 98.2 },
        { name: 'Şarj İstasyonları', count: 423, active: 401, percentage: 94.8 },
        { name: 'Üretim IoT Cihazları', count: 266, active: 218, percentage: 82 }
    ];
    
    categoryCards.forEach((card, index) => {
        if (card && categories[index]) {
            const countElement = card.querySelector('.count');
            const statusElement = card.querySelector('.status');
            const progressBar = card.querySelector('.progress');
            
            if (countElement) {
                countElement.textContent = categories[index].count.toLocaleString('tr-TR');
            }
            
            if (statusElement) {
                statusElement.textContent = `${categories[index].active.toLocaleString('tr-TR')} Aktif`;
            }
            
            if (progressBar) {
                progressBar.style.width = `${categories[index].percentage}%`;
            }
        }
    });
}

function updateDeviceAlerts() {
    const deviceAlerts = [
        {
            type: 'warning',
            title: 'Cihaz Bağlantı Kopukluğu',
            description: 'Telematik Cihaz ID: TL-892 - Sinyal zayıflaması',
            time: '3 dakika önce'
        },
        {
            type: 'info',
            title: 'Yazılım Güncellemesi',
            description: 'ECU ID: ECU-342 - Güncelleme başarıyla tamamlandı',
            time: '7 dakika önce'
        },
        {
            type: 'critical',
            title: 'Cihaz Arızası',
            description: 'Şarj İstasyonu ID: SH-123 - Şarj portu arızası',
            time: '9 dakika önce'
        }
    ];
    
    const deviceAlertList = document.querySelector('#device-management .alert-list');
    if (deviceAlertList) {
        deviceAlertList.innerHTML = '';
        
        deviceAlerts.forEach(alert => {
            const alertElement = createAlertElement(alert);
            deviceAlertList.appendChild(alertElement);
        });
    }
}

// Cybersecurity Dashboard Functions
function initializeCybersecurity() {
    // Initialize threat vehicles
    initializeThreatVehicles();
    
    // Initialize cybersecurity stats
    updateCybersecurityStats();
    
    // Initialize threat intelligence
    updateThreatIntelligence();
}

function updateCybersecurity() {
    updateCybersecurityStats();
    updateThreatIntelligence();
    renderThreatVehicles();
}

function initializeThreatVehicles() {
    threats = [
        { id: 1, x: 30, y: 25, status: 'normal' },
        { id: 2, x: 65, y: 45, status: 'warning' },
        { id: 3, x: 35, y: 65, status: 'critical' },
        { id: 4, x: 80, y: 35, status: 'normal' },
        { id: 5, x: 25, y: 55, status: 'normal' }
    ];
}

function renderThreatVehicles() {
    if (!threatVehicles) return;
    
    threatVehicles.innerHTML = '';
    
    threats.forEach(vehicle => {
        const vehicleElement = document.createElement('div');
        vehicleElement.className = `threat-vehicle ${vehicle.status}`;
        vehicleElement.style.top = `${vehicle.y}%`;
        vehicleElement.style.left = `${vehicle.x}%`;
        vehicleElement.setAttribute('data-id', vehicle.id);
        
        const pulseElement = document.createElement('div');
        pulseElement.className = 'vehicle-pulse';
        
        vehicleElement.appendChild(pulseElement);
        threatVehicles.appendChild(vehicleElement);
    });
}

function updateCybersecurityStats() {
    const cyberStats = [
        { value: 2847, change: 12, positive: true },
        { value: 23, change: 8, positive: false },
        { value: 142, change: 24, positive: true },
        { value: 98.7, change: 0.3, positive: true }
    ];
    
    cyberStatCards.forEach((card, index) => {
        if (card && cyberStats[index]) {
            if (index === 3) {
                card.textContent = `${cyberStats[index].value}%`;
            } else {
                card.textContent = cyberStats[index].value.toLocaleString('tr-TR');
            }
        }
    });
}

function updateThreatIntelligence() {
    const threatAlerts = [
        {
            type: 'critical',
            title: 'Kritik: CAN Bus Saldırısı',
            description: 'Araç ID: TR-342 - Anormal veri akışı tespit edildi',
            time: '2 dakika önce'
        },
        {
            type: 'warning',
            title: 'Uyarı: Şifreleme Anomalisi',
            description: 'Araç ID: TR-189 - Zayıf şifreleme protokolü',
            time: '4 dakika önce'
        },
        {
            type: 'info',
            title: 'Bilgi: Yazılım Güncellemesi',
            description: 'Araç ID: TR-567 - Güvenlik güncellemesi tamamlandı',
            time: '5 dakika önce'
        }
    ];
    
    if (threatList) {
        threatList.innerHTML = '';
        
        threatAlerts.forEach(alert => {
            const alertElement = createThreatElement(alert);
            threatList.appendChild(alertElement);
        });
    }
}

function createThreatElement(alert) {
    const alertElement = document.createElement('div');
    alertElement.className = `threat-item ${alert.type}`;
    
    const iconClass = {
        critical: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    alertElement.innerHTML = `
        <div class="threat-icon">
            <i class="${iconClass[alert.type]}"></i>
        </div>
        <div class="threat-content">
            <div class="threat-title">${alert.title}</div>
            <div class="threat-desc">${alert.description}</div>
            <div class="threat-time">${alert.time}</div>
        </div>
    `;
    
    return alertElement;
}

// Predictive Maintenance Dashboard Functions
function initializePredictiveMaintenance() {
    // Initialize maintenance stats
    updateMaintenanceStats();
    
    // Initialize maintenance predictions
    updateMaintenancePredictions();
    
    // Initialize maintenance chart
    updateMaintenanceChart('Haftalık');
}

function updatePredictiveMaintenance() {
    updateMaintenanceStats();
    updateMaintenancePredictions();
}

function updateMaintenanceStats() {
    const maintenanceStats = [
        { value: 127, change: 15, positive: true },
        { value: 18, change: 3, positive: false },
        { value: 342, change: 28, positive: true },
        { value: '€47.2K', change: 12, positive: true }
    ];
    
    maintenanceStatCards.forEach((card, index) => {
        if (card && maintenanceStats[index]) {
            card.textContent = maintenanceStats[index].value;
        }
    });
}

function updateMaintenancePredictions() {
    const predictions = [
        {
            type: 'critical',
            title: 'Fren Sistemi Bakımı',
            description: 'Araç ID: TR-342 - Fren diskleri %85 kullanıldı',
            time: 'Öngörülen: 7 gün içinde'
        },
        {
            type: 'warning',
            title: 'Akü Değişimi',
            description: 'Araç ID: TR-189 - Akü verimliliği düştü',
            time: 'Öngörülen: 14 gün içinde'
        },
        {
            type: 'info',
            title: 'Yağ Değişimi',
            description: 'Araç ID: TR-567 - Motor yağı ömrü dolmak üzere',
            time: 'Öngörülen: 30 gün içinde'
        }
    ];
    
    if (predictionList) {
        predictionList.innerHTML = '';
        
        predictions.forEach(prediction => {
            const predictionElement = createPredictionElement(prediction);
            predictionList.appendChild(predictionElement);
        });
    }
}

function createPredictionElement(prediction) {
    const predictionElement = document.createElement('div');
    predictionElement.className = `prediction-item ${prediction.type}`;
    
    const iconClass = {
        critical: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    predictionElement.innerHTML = `
        <div class="prediction-icon">
            <i class="${iconClass[prediction.type]}"></i>
        </div>
        <div class="prediction-content">
            <div class="prediction-title">${prediction.title}</div>
            <div class="prediction-desc">${prediction.description}</div>
            <div class="prediction-time">${prediction.time}</div>
        </div>
    `;
    
    return predictionElement;
}

function updateMaintenanceChart(period) {
    const chartData = {
        'Haftalık': [
            { day: 'Pzt', completed: 70, planned: 0, urgent: 0 },
            { day: 'Sal', completed: 85, planned: 0, urgent: 0 },
            { day: 'Çar', completed: 0, planned: 60, urgent: 0 },
            { day: 'Per', completed: 90, planned: 0, urgent: 0 },
            { day: 'Cum', completed: 0, planned: 0, urgent: 40 },
            { day: 'Cmt', completed: 75, planned: 0, urgent: 0 },
            { day: 'Paz', completed: 0, planned: 50, urgent: 0 }
        ],
        'Aylık': [
            { day: '1', completed: 65, planned: 0, urgent: 0 },
            { day: '2', completed: 80, planned: 0, urgent: 0 },
            { day: '3', completed: 0, planned: 70, urgent: 0 },
            { day: '4', completed: 85, planned: 0, urgent: 0 },
            { day: '5', completed: 0, planned: 0, urgent: 35 },
            { day: '6', completed: 70, planned: 0, urgent: 0 },
            { day: '7', completed: 0, planned: 55, urgent: 0 }
        ],
        'Yıllık': [
            { day: 'Oca', completed: 75, planned: 0, urgent: 0 },
            { day: 'Şub', completed: 82, planned: 0, urgent: 0 },
            { day: 'Mar', completed: 0, planned: 65, urgent: 0 },
            { day: 'Nis', completed: 88, planned: 0, urgent: 0 },
            { day: 'May', completed: 0, planned: 0, urgent: 30 },
            { day: 'Haz', completed: 78, planned: 0, urgent: 0 },
            { day: 'Tem', completed: 0, planned: 60, urgent: 0 }
        ]
    };
    
    const chartBars = document.querySelector('.chart-bars');
    if (chartBars && chartData[period]) {
        chartBars.innerHTML = '';
        
        chartData[period].forEach(data => {
            const chartBar = document.createElement('div');
            chartBar.className = 'chart-bar';
            
            // Create bars for each type
            if (data.completed > 0) {
                const completedBar = document.createElement('div');
                completedBar.className = 'bar completed';
                completedBar.style.height = `${data.completed}%`;
                chartBar.appendChild(completedBar);
            }
            
            if (data.planned > 0) {
                const plannedBar = document.createElement('div');
                plannedBar.className = 'bar planned';
                plannedBar.style.height = `${data.planned}%`;
                chartBar.appendChild(plannedBar);
            }
            
            if (data.urgent > 0) {
                const urgentBar = document.createElement('div');
                urgentBar.className = 'bar urgent';
                urgentBar.style.height = `${data.urgent}%`;
                chartBar.appendChild(urgentBar);
            }
            
            // Add day label
            const barLabel = document.createElement('span');
            barLabel.className = 'bar-label';
            barLabel.textContent = data.day;
            chartBar.appendChild(barLabel);
            
            chartBars.appendChild(chartBar);
        });
    }
}

// Helper function to create alert elements
function createAlertElement(alert) {
    const alertElement = document.createElement('div');
    alertElement.className = `alert-item ${alert.type}`;
    
    const iconClass = {
        critical: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
        success: 'fas fa-check-circle'
    };
    
    alertElement.innerHTML = `
        <div class="alert-icon">
            <i class="${iconClass[alert.type]}"></i>
        </div>
        <div class="alert-content">
            <div class="alert-title">${alert.title}</div>
            <div class="alert-desc">${alert.description}</div>
            <div class="alert-time">${alert.time}</div>
        </div>
    `;
    
    return alertElement;
}

// Simulation Functions for Dashboard Updates
function simulateDeviceStatusChange() {
    const deviceTypes = ['Araç ECU\'ları', 'Telematik Birimleri', 'Şarj İstasyonları', 'Üretim IoT Cihazları'];
    const randomType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
    
    const statusChangeTypes = [
        {
            type: 'warning',
            title: 'Cihaz Bağlantı Zayıflaması',
            description: `${randomType} - Sinyal kalitesinde düşüş tespit edildi`
        },
        {
            type: 'info',
            title: 'Yazılım Güncellemesi',
            description: `${randomType} - Otomatik güncelleme tamamlandı`
        },
        {
            type: 'critical',
            title: 'Cihaz Arızası',
            description: `${randomType} - Bakım gerektiren arıza tespit edildi`
        }
    ];
    
    const randomChange = statusChangeTypes[Math.floor(Math.random() * statusChangeTypes.length)];
    
    const newAlert = {
        type: randomChange.type,
        title: randomChange.title,
        description: randomChange.description,
        time: 'Az önce'
    };
    
    // Add to device alerts
    const deviceAlertList = document.querySelector('#device-management .alert-list');
    if (deviceAlertList) {
        const alertElement = createAlertElement(newAlert);
        deviceAlertList.insertBefore(alertElement, deviceAlertList.firstChild);
        
        // Keep only the latest 5 alerts
        while (deviceAlertList.children.length > 5) {
            deviceAlertList.removeChild(deviceAlertList.lastChild);
        }
    }
    
    // Show notification
    showNotification(newAlert.type, newAlert.title, newAlert.description);
}

function addNewMaintenancePrediction() {
    const vehicleId = Math.floor(Math.random() * 1000) + 1;
    const maintenanceTypes = [
        {
            type: 'critical',
            title: 'Fren Sistemi Kontrolü',
            description: `Araç ID: TR-${vehicleId} - Fren balatalarında aşınma tespit edildi`,
            time: 'Öngörülen: 5 gün içinde'
        },
        {
            type: 'warning',
            title: 'Lastik Basınç Kontrolü',
            description: `Araç ID: TR-${vehicleId} - Lastik basınçlarında düşüş tespit edildi`,
            time: 'Öngörülen: 10 gün içinde'
        },
        {
            type: 'info',
            title: 'Periyodik Bakım',
            description: `Araç ID: TR-${vehicleId} - Planlı bakım zamanı approaching`,
            time: 'Öngörülen: 30 gün içinde'
        }
    ];
    
    const randomMaintenance = maintenanceTypes[Math.floor(Math.random() * maintenanceTypes.length)];
    
    const newPrediction = {
        type: randomMaintenance.type,
        title: randomMaintenance.title,
        description: randomMaintenance.description,
        time: randomMaintenance.time
    };
    
    // Add to maintenance predictions
    if (predictionList) {
        const predictionElement = createPredictionElement(newPrediction);
        predictionList.insertBefore(predictionElement, predictionList.firstChild);
        
        // Keep only the latest 5 predictions
        while (predictionList.children.length > 5) {
            predictionList.removeChild(predictionList.lastChild);
        }
    }
    
    // Show notification
    showNotification(newPrediction.type, 'Yeni Bakım Öngörüsü', newPrediction.description);
}

// Enhanced Animation Functions

// Create Ripple Effect
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

// Initialize Particle System
function initializeParticleSystem() {
    particleSystem = {
        particles: [],
        maxParticles: 50,
        container: document.createElement('div')
    };
    
    particleSystem.container.className = 'particle-container';
    particleSystem.container.style.position = 'fixed';
    particleSystem.container.style.top = '0';
    particleSystem.container.style.left = '0';
    particleSystem.container.style.width = '100%';
    particleSystem.container.style.height = '100%';
    particleSystem.container.style.pointerEvents = 'none';
    particleSystem.container.style.zIndex = '9999';
    
    document.body.appendChild(particleSystem.container);
}

// Create Particle Effect
function createParticleEffect(x, y, type) {
    if (!particleSystem) return;
    
    const colors = {
        success: ['#00ff88', '#00ffaa'],
        warning: ['#ffdd00', '#ffee44'],
        danger: ['#ff5252', '#ff7a7a'],
        info: ['#00d4ff', '#3d5ce6']
    };
    
    const particleColors = colors[type] || colors.info;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = Math.random() * 2 + 1;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.opacity = '1';
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        particleSystem.container.appendChild(particle);
        
        // Animate particle
        let opacity = 1;
        let posX = x;
        let posY = y;
        
        const animateParticle = () => {
            posX += Math.cos(angle) * velocity;
            posY += Math.sin(angle) * velocity;
            opacity -= 0.02;
            
            particle.style.left = posX + '%';
            particle.style.top = posY + '%';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animateParticle);
    }
}

// Animate Vehicle Addition
function animateVehicleAddition(vehicle) {
    if (!demoVehicles) return;
    
    const vehicleElement = document.createElement('div');
    vehicleElement.className = `demo-vehicle ${vehicle.status} vehicle-adding`;
    vehicleElement.style.top = `${vehicle.y}%`;
    vehicleElement.style.left = `${vehicle.x}%`;
    vehicleElement.setAttribute('data-id', vehicle.id);
    vehicleElement.style.transform = 'scale(0)';
    
    const pulseElement = document.createElement('div');
    pulseElement.className = 'vehicle-pulse';
    
    vehicleElement.appendChild(pulseElement);
    demoVehicles.appendChild(vehicleElement);
    
    // Animate vehicle appearance
    setTimeout(() => {
        vehicleElement.style.transform = 'scale(1)';
        vehicleElement.classList.remove('vehicle-adding');
    }, 100);
}

// Animate Threat Detection
function animateThreatDetection(vehicle, newStatus) {
    const vehicleElement = document.querySelector(`.demo-vehicle[data-id="${vehicle.id}"]`) ||
                          document.querySelector(`.threat-vehicle[data-id="${vehicle.id}"]`);
    
    if (!vehicleElement) return;
    
    // Add detection animation
    vehicleElement.classList.add('threat-detected');
    
    setTimeout(() => {
        vehicleElement.classList.remove('threat-detected');
        vehicle.className = vehicle.className.replace(/normal|warning|critical/g, '');
        vehicleElement.classList.add(newStatus);
    }, 500);
}

// Animate Threat Resolution
function animateThreatResolution(vehicle) {
    const vehicleElement = document.querySelector(`.demo-vehicle[data-id="${vehicle.id}"]`) ||
                          document.querySelector(`.threat-vehicle[data-id="${vehicle.id}"]`);
    
    if (!vehicleElement) return;
    
    // Add resolution animation
    vehicleElement.classList.add('threat-resolved');
    
    setTimeout(() => {
        vehicleElement.classList.remove('threat-resolved');
        vehicle.className = vehicle.className.replace(/normal|warning|critical/g, '');
        vehicleElement.classList.add('normal');
    }, 500);
}

// Animate Dashboard Entry
function animateDashboardEntry(dashboardId) {
    const dashboard = document.getElementById(dashboardId);
    if (!dashboard) return;
    
    const cards = dashboard.querySelectorAll('.device-stat-card, .cyber-stat-card, .maintenance-stat-card, .category-card, .threat-item, .prediction-item');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Animate Chart Transition
function animateChartTransition(period) {
    const chartBars = document.querySelector('.chart-bars');
    if (!chartBars) return;
    
    // Fade out current chart
    chartBars.style.opacity = '0';
    
    setTimeout(() => {
        updateMaintenanceChart(period);
        
        // Fade in new chart
        chartBars.style.opacity = '1';
    }, 300);
}

// Add Card Hover Effects
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.device-stat-card, .cyber-stat-card, .maintenance-stat-card, .category-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });
}

// Add Dashboard Interactions
function addDashboardInteractions() {
    // Add click interactions to vehicle elements
    document.addEventListener('click', (e) => {
        if (e.target.closest('.demo-vehicle, .threat-vehicle')) {
            const vehicleElement = e.target.closest('.demo-vehicle, .threat-vehicle');
            const vehicleId = vehicleElement.getAttribute('data-id');
            
            // Show vehicle details
            showVehicleDetails(vehicleId);
        }
        
        // Add click interactions to stat cards
        if (e.target.closest('.device-stat-card, .cyber-stat-card, .maintenance-stat-card')) {
            const card = e.target.closest('.device-stat-card, .cyber-stat-card, .maintenance-stat-card');
            
            // Add pulse animation
            card.style.animation = 'pulse 0.5s ease-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 500);
        }
    });
}

// Show Vehicle Details
function showVehicleDetails(vehicleId) {
    const vehicle = vehicles.find(v => v.id == vehicleId) || threats.find(t => t.id == vehicleId);
    
    if (!vehicle) return;
    
    const statusText = {
        normal: 'Normal',
        warning: 'Uyarı',
        critical: 'Kritik'
    };
    
    showNotification('info', `Araç ID: TR-${vehicleId}`, `Durum: ${statusText[vehicle.status]}`);
}

// Enhance Data Visualization
function enhanceDataVisualization() {
    // Add animated counters
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('tr-TR');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('tr-TR');
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Setup Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Tab switching with number keys
        if (e.key >= '1' && e.key <= '3') {
            const tabIndex = parseInt(e.key) - 1;
            if (tabButtons[tabIndex]) {
                tabButtons[tabIndex].click();
            }
        }
        
        // Demo controls with keyboard
        if (e.key === 'a' || e.key === 'A') {
            if (addVehicleBtn) addVehicleBtn.click();
        }
        
        if (e.key === 's' || e.key === 'S') {
            if (simulateThreatBtn) simulateThreatBtn.click();
        }
        
        if (e.key === 'c' || e.key === 'C') {
            if (clearThreatsBtn) clearThreatsBtn.click();
        }
        
        if (e.key === 'r' || e.key === 'R') {
            if (resetDemoBtn) resetDemoBtn.click();
        }
    });
}

// Initialize Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor frame rate
    let lastTime = performance.now();
    let frames = 0;
    
    const monitorFPS = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round((frames * 1000) / (currentTime - lastTime));
            
            // Reduce animations if FPS is too low
            if (fps < 30) {
                document.body.classList.add('reduce-animations');
            } else {
                document.body.classList.remove('reduce-animations');
            }
            
            frames = 0;
            lastTime = currentTime;
        }
        
        animationFrameId = requestAnimationFrame(monitorFPS);
    };
    
    monitorFPS();
}

// Initialize Advanced Animations
function initializeAdvancedAnimations() {
    // Add CSS for new animations
    const style = document.createElement('style');
    style.textContent = `
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
        
        .vehicle-adding {
            animation: vehicle-adding 0.5s ease-out;
        }
        
        @keyframes vehicle-adding {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(360deg);
                opacity: 1;
            }
        }
        
        .threat-detected {
            animation: threat-detected 0.5s ease-out;
        }
        
        @keyframes threat-detected {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.3);
                filter: brightness(1.5);
            }
        }
        
        .threat-resolved {
            animation: threat-resolved 0.5s ease-out;
        }
        
        @keyframes threat-resolved {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
                filter: brightness(1.5) hue-rotate(120deg);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .reduce-animations * {
            animation-duration: 0.01s !important;
            transition-duration: 0.01s !important;
        }
        
        .dashboard-content {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .particle {
            pointer-events: none;
        }
    `;
    
    document.head.appendChild(style);
}

// Handle Visibility Change
function handleVisibilityChange() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        if (dataUpdateInterval) {
            clearInterval(dataUpdateInterval);
        }
    } else {
        // Resume animations when tab is visible
        initializePerformanceMonitoring();
        startRealTimeUpdates();
    }
}

// Debounce Function
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

// Initialize Interactive Components
function initializeInteractiveComponents() {
    // Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h4').textContent;
            showNotification('info', 'Kategori Seçildi', `${categoryName} kategorisi seçildi`);
            
            // Add animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'var(--shadow-lg)';
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
    
    // Alert Items
    const alertItems = document.querySelectorAll('.alert-item');
    alertItems.forEach(item => {
        item.addEventListener('click', function() {
            const alertTitle = this.querySelector('.alert-title').textContent;
            showNotification('warning', 'Alarm Detayları', alertTitle);
            
            // Add animation effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Threat Items
    const threatItems = document.querySelectorAll('.threat-item');
    threatItems.forEach(item => {
        item.addEventListener('click', function() {
            const threatType = this.querySelector('.threat-title').textContent;
            showNotification('error', 'Tehdit Analizi', threatType);
            
            // Add animation effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Prediction Items
    const predictionItems = document.querySelectorAll('.prediction-item');
    predictionItems.forEach(item => {
        item.addEventListener('click', function() {
            const predictionTitle = this.querySelector('.prediction-title').textContent;
            showNotification('info', 'Tahmin Detayları', predictionTitle);
            
            // Add animation effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Stat Cards
    const statCards = document.querySelectorAll('.device-stat-card, .cyber-stat-card, .maintenance-stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            const statName = this.querySelector('h3').textContent;
            const statValue = this.querySelector('.stat-value').textContent;
            showNotification('info', statName, `Mevcut Değer: ${statValue}`);
            
            // Add animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Initialize Map Controls
function initializeMapControls() {
    if (deviceMapBtn && deviceListBtn && deviceMapContainer && deviceListContainer) {
        // Map View Button
        deviceMapBtn.addEventListener('click', function() {
            deviceMapContainer.style.display = 'block';
            deviceListContainer.style.display = 'none';
            deviceMapBtn.classList.add('active');
            deviceListBtn.classList.remove('active');
            
            // Initialize map if not already done
            if (typeof initializeDeviceMap === 'function') {
                initializeDeviceMap();
            }
        });
        
        // List View Button
        deviceListBtn.addEventListener('click', function() {
            deviceMapContainer.style.display = 'none';
            deviceListContainer.style.display = 'block';
            deviceListBtn.classList.add('active');
            deviceMapBtn.classList.remove('active');
            
            // Load device list
            loadDeviceList();
        });
        
        // Refresh Button
        if (deviceMapRefreshBtn) {
            deviceMapRefreshBtn.addEventListener('click', function() {
                this.style.animation = 'spin 1s linear';
                
                // Refresh map data
                if (typeof refreshDeviceMap === 'function') {
                    refreshDeviceMap();
                } else {
                    showNotification('info', 'Harita Güncelleniyor', 'Harita verileri güncelleniyor...');
                }
                
                setTimeout(() => {
                    this.style.animation = '';
                }, 1000);
            });
        }
    }
}

// Load Device List
function loadDeviceList() {
    if (!deviceListContainer) return;
    
    // Clear existing content
    deviceListContainer.innerHTML = '';
    
    // Create device list items
    const devices = [
        { id: '001', name: 'Binek Aracı', status: 'active', location: 'İstanbul', battery: '85%' },
        { id: '002', name: 'Kamyon', status: 'active', location: 'Ankara', battery: '92%' },
        { id: '003', name: 'Servis Aracı', status: 'idle', location: 'İzmir', battery: '67%' },
        { id: '004', name: 'Motosiklet', status: 'maintenance', location: 'Bursa', battery: '45%' },
        { id: '005', name: 'Tır', status: 'active', location: 'Kocaeli', battery: '78%' }
    ];
    
    devices.forEach(device => {
        const deviceItem = document.createElement('div');
        deviceItem.className = 'device-item';
        deviceItem.innerHTML = `
            <div class="device-info">
                <h4>${device.name} (${device.id})</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${device.location}</p>
                <p><i class="fas fa-battery-three-quarters"></i> ${device.battery}</p>
            </div>
            <div class="device-status ${device.status}">
                <span class="status-indicator"></span>
                <span class="status-text">${getStatusText(device.status)}</span>
            </div>
        `;
        
        deviceItem.addEventListener('click', function() {
            showNotification('info', 'Cihaz Seçildi', `${device.name} seçildi`);
        });
        
        deviceListContainer.appendChild(deviceItem);
    });
}

// Get Status Text
function getStatusText(status) {
    const statusMap = {
        'active': 'Aktif',
        'idle': 'Boşta',
        'maintenance': 'Bakımda',
        'offline': 'Çevrimdışı'
    };
    return statusMap[status] || status;
}

// Add device list styles
const deviceListStyles = document.createElement('style');
deviceListStyles.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .device-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .device-item:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }
    
    .device-info h4 {
        margin: 0 0 5px 0;
        color: var(--primary-color);
    }
    
    .device-info p {
        margin: 3px 0;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .device-info i {
        margin-right: 5px;
        width: 12px;
    }
    
    .device-status {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .device-status.active {
        background: rgba(76, 175, 80, 0.2);
        color: #4CAF50;
    }
    
    .device-status.idle {
        background: rgba(255, 193, 7, 0.2);
        color: #FFC107;
    }
    
    .device-status.maintenance {
        background: rgba(244, 67, 54, 0.2);
        color: #F44336;
    }
    
    .device-status.offline {
        background: rgba(158, 158, 158, 0.2);
        color: #9E9E9E;
    }
    
    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: currentColor;
    }
    
    /* Enhanced mobile styles for device list */
    @media (max-width: 767px) {
        .device-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 12px;
        }
        
        .device-status {
            align-self: flex-end;
        }
    }
`;
document.head.appendChild(deviceListStyles);


// Setup Touch Gestures for Mobile
function setupTouchGestures() {
    const tabContainer = document.querySelector('.dashboard-tabs');
    if (!tabContainer) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let currentTabIndex = 0;
    let isSwiping = false;
    let touchStartTime = 0;
    
    // Get current active tab index
    const getCurrentTabIndex = () => {
        for (let i = 0; i < tabButtons.length; i++) {
            if (tabButtons[i].classList.contains('active')) {
                return i;
            }
        }
        return 0;
    };
    
    // Handle touch start
    tabContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        currentTabIndex = getCurrentTabIndex();
        isSwiping = false;
        touchStartTime = Date.now();
    }, { passive: true });
    
    // Handle touch move
    tabContainer.addEventListener('touchmove', (e) => {
        // Only consider it a swipe if moved at least 10px
        const moveX = Math.abs(e.changedTouches[0].screenX - touchStartX);
        const moveY = Math.abs(e.changedTouches[0].screenY - touchStartY);
        
        if (moveX > 10 || moveY > 10) {
            isSwiping = true;
        }
    }, { passive: true });
    
    // Handle touch end
    tabContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        const touchDuration = Date.now() - touchStartTime;
        
        // Only handle swipe if it was actually a swipe and not too long (to avoid conflicts with scrolling)
        if (isSwiping && touchDuration < 500) {
            handleSwipeGesture();
        }
    }, { passive: true });
    
    // Handle swipe gesture
    const handleSwipeGesture = () => {
        const swipeThreshold = 50;
        const swipeVerticalThreshold = 100; // Prevent vertical swipes
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Make sure it's more horizontal than vertical
        if (Math.abs(diffY) > swipeVerticalThreshold) return;
        
        // Swipe left - go to next tab
        if (diffX > swipeThreshold && currentTabIndex < tabButtons.length - 1) {
            tabButtons[currentTabIndex + 1].click();
            
            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
        
        // Swipe right - go to previous tab
        if (diffX < -swipeThreshold && currentTabIndex > 0) {
            tabButtons[currentTabIndex - 1].click();
            
            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
    };
    
    // Also add swipe gestures to dashboard content areas
    const dashboardContents = document.querySelectorAll('.dashboard-content');
    dashboardContents.forEach(content => {
        let contentTouchStartX = 0;
        let contentTouchEndX = 0;
        let contentTouchStartY = 0;
        let contentTouchEndY = 0;
        let contentIsSwiping = false;
        let contentTouchStartTime = 0;
        
        content.addEventListener('touchstart', (e) => {
            contentTouchStartX = e.changedTouches[0].screenX;
            contentTouchStartY = e.changedTouches[0].screenY;
            contentIsSwiping = false;
            contentTouchStartTime = Date.now();
        }, { passive: true });
        
        content.addEventListener('touchmove', (e) => {
            const moveX = Math.abs(e.changedTouches[0].screenX - contentTouchStartX);
            const moveY = Math.abs(e.changedTouches[0].screenY - contentTouchStartY);
            
            // Only consider it a swipe if moved horizontally more than vertically
            if (moveX > 10 && moveX > moveY) {
                contentIsSwiping = true;
            }
        }, { passive: true });
        
        content.addEventListener('touchend', (e) => {
            contentTouchEndX = e.changedTouches[0].screenX;
            contentTouchEndY = e.changedTouches[0].screenY;
            const touchDuration = Date.now() - contentTouchStartTime;
            
            if (contentIsSwiping && touchDuration < 500) {
                const contentSwipeThreshold = 80;
                const contentDiffX = contentTouchStartX - contentTouchEndX;
                const contentDiffY = contentTouchStartY - contentTouchEndY;
                const currentContentIndex = getCurrentTabIndex();
                
                // Make sure it's more horizontal than vertical
                if (Math.abs(contentDiffY) > Math.abs(contentDiffX)) return;
                
                // Swipe left - go to next tab
                if (contentDiffX > contentSwipeThreshold && currentContentIndex < tabButtons.length - 1) {
                    tabButtons[currentContentIndex + 1].click();
                    
                    // Add haptic feedback
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                }
                
                // Swipe right - go to previous tab
                if (contentDiffX < -contentSwipeThreshold && currentContentIndex > 0) {
                    tabButtons[currentContentIndex - 1].click();
                    
                    // Add haptic feedback
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                }
            }
        }, { passive: true });
    });
}

// Enhanced mobile dashboard initialization
function initializeMobileDashboard() {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Add mobile-specific classes
        document.body.classList.add('mobile-dashboard');
        
        // Optimize dashboard for mobile
        const dashboardContents = document.querySelectorAll('.dashboard-content');
        dashboardContents.forEach(content => {
            content.classList.add('mobile-optimized');
        });
        
        // Add mobile-specific event listeners
        addMobileEventListeners();
        
        // Optimize tab scrolling for mobile
        optimizeTabScrolling();
        
        // Add mobile-specific swipe indicators
        addSwipeIndicators();
    } else {
        // Remove mobile classes if not mobile
        document.body.classList.remove('mobile-dashboard');
        const dashboardContents = document.querySelectorAll('.dashboard-content');
        dashboardContents.forEach(content => {
            content.classList.remove('mobile-optimized');
        });
    }
}

// Add mobile-specific event listeners
function addMobileEventListeners() {
    // Handle mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }
    
    // Handle mobile dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('touchstart', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('mobile-open');
        });
    });
}

// Optimize tab scrolling for mobile
function optimizeTabScrolling() {
    const tabContainer = document.querySelector('.dashboard-tabs');
    if (!tabContainer) return;
    
    // Add smooth scrolling to tabs
    tabContainer.style.scrollBehavior = 'smooth';
    
    // Ensure active tab is visible
    const activeTab = tabContainer.querySelector('.tab-btn.active');
    if (activeTab) {
        setTimeout(() => {
            activeTab.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }, 300);
    }
}

// Add swipe indicators for mobile
function addSwipeIndicators() {
    const dashboardContents = document.querySelectorAll('.dashboard-content');
    
    dashboardContents.forEach((content, index) => {
        // Only add indicators if not already added
        if (content.querySelector('.swipe-indicators')) return;
        
        const indicatorContainer = document.createElement('div');
        indicatorContainer.className = 'swipe-indicators';
        
        // Create indicators for each tab
        for (let i = 0; i < dashboardContents.length; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'swipe-indicator';
            if (i === index) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                tabButtons[i].click();
            });
            indicatorContainer.appendChild(indicator);
        }
        
        content.appendChild(indicatorContainer);
    });
    
    // Update indicators when tab changes
    const originalSwitchDashboard = switchDashboard;
    switchDashboard = function(tabId) {
        originalSwitchDashboard(tabId);
        
        // Update indicators
        const indicators = document.querySelectorAll('.swipe-indicator');
        indicators.forEach((indicator, index) => {
            const tabButton = tabButtons[index];
            if (tabButton && tabButton.getAttribute('data-tab') === tabId) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    };
}

// Enhanced mobile dashboard initialization with better performance
function initializeMobileDashboard() {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Add mobile-specific classes
        document.body.classList.add('mobile-dashboard');
        
        // Optimize dashboard for mobile
        const dashboardContents = document.querySelectorAll('.dashboard-content');
        dashboardContents.forEach(content => {
            content.classList.add('mobile-optimized');
        });
        
        // Add mobile-specific event listeners
        addMobileEventListeners();
        
        // Optimize tab scrolling for mobile
        optimizeTabScrolling();
        
        // Add mobile-specific swipe indicators
        addSwipeIndicators();
        
        // Add mobile navigation hints
        addMobileNavigationHints();
        
        // Optimize performance for mobile
        optimizeMobilePerformance();
    } else {
        // Remove mobile classes if not mobile
        document.body.classList.remove('mobile-dashboard');
        const dashboardContents = document.querySelectorAll('.dashboard-content');
        dashboardContents.forEach(content => {
            content.classList.remove('mobile-optimized');
        });
    }
}

// Add mobile navigation hints
function addMobileNavigationHints() {
    // Only add hints once
    if (document.querySelector('.mobile-navigation-hint')) return;
    
    const hint = document.createElement('div');
    hint.className = 'mobile-navigation-hint';
    hint.innerHTML = `
        <div class="hint-content">
            <i class="fas fa-hand-point-left"></i>
            <p>Sekmeler arasında geçiş yapmak için kaydırın</p>
            <button class="hint-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    document.body.appendChild(hint);
    
    // Auto-hide hint after 5 seconds
    setTimeout(() => {
        hint.classList.add('hide-hint');
        setTimeout(() => {
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        }, 500);
    }, 5000);
    
    // Manual close button
    const closeBtn = hint.querySelector('.hint-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hint.classList.add('hide-hint');
            setTimeout(() => {
                if (hint.parentNode) {
                    hint.parentNode.removeChild(hint);
                }
            }, 500);
        });
    }
}

// Optimize performance for mobile
function optimizeMobilePerformance() {
    // Reduce animations on low-end devices
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    if (isLowEnd) {
        document.body.classList.add('low-end-device');
    }
    
    // Optimize scrolling performance
    document.body.style.touchAction = 'pan-y';
    
    // Add CSS for performance optimization
    const performanceStyles = document.createElement('style');
    performanceStyles.textContent = `
        .mobile-dashboard {
            -webkit-overflow-scrolling: touch;
            overflow-scrolling: touch;
        }
        
        .mobile-dashboard .dashboard-content {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
        }
        
        .low-end-device * {
            animation-duration: 0.01s !important;
            transition-duration: 0.01s !important;
        }
        
        .mobile-navigation-hint {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-size: 14px;
            text-align: center;
            max-width: 90%;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .mobile-navigation-hint.hide-hint {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        
        .hint-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .hint-close {
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: 10px;
            padding: 0;
        }
        
        @media (max-width: 767px) {
            .mobile-navigation-hint {
                bottom: 10px;
                font-size: 12px;
                padding: 10px 15px;
            }
            
            .hint-content {
                flex-direction: column;
                gap: 5px;
            }
            
            .hint-close {
                position: absolute;
                top: 5px;
                right: 5px;
                margin-left: 0;
            }
        }
    `;
    document.head.appendChild(performanceStyles);
}

// Handle URL hash for initial tab selection
function handleInitialTabFromHash() {
    const hash = window.location.hash.substring(1); // Remove the # character
    
    // Check if hash corresponds to a valid tab
    const validTabs = ['device-management', 'cybersecurity', 'predictive-maintenance'];
    
    if (hash && validTabs.includes(hash)) {
        // Switch to the tab specified in the hash
        setTimeout(() => {
            const targetTab = document.querySelector(`[data-tab="${hash}"]`);
            if (targetTab) {
                targetTab.click();
            }
        }, 100);
    }
}

// Handle hash change events
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    
    // Check if hash corresponds to a valid tab
    const validTabs = ['device-management', 'cybersecurity', 'predictive-maintenance'];
    
    if (hash && validTabs.includes(hash)) {
        // Only switch if it's a different tab
        if (currentDashboard !== hash) {
            const targetTab = document.querySelector(`[data-tab="${hash}"]`);
            if (targetTab) {
                targetTab.click();
            }
        }
    }
}

// Initialize mobile dashboard on load
document.addEventListener('DOMContentLoaded', initializeMobileDashboard);

// Re-initialize on resize
window.addEventListener('resize', debounce(initializeMobileDashboard, 250));
