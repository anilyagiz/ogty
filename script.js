// Singularity AI SOC - Vehicle Security Operations Center Dashboard
// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Handle loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Initialize responsive navigation
    initializeResponsiveNavigation();
    
    // Initialize mobile touch optimizations
    initializeMobileTouchOptimizations();
    
    // Initialize orientation change handling
    initializeOrientationChangeHandling();
    
    // Add system status indicator to header
    addSystemStatusIndicator();
    
    // Initialize dashboard after a delay to simulate loading
    setTimeout(() => {
        // Initialize dashboard components
        initializeMap();
        initializeVehicleSystemsMonitor();
        initializeSecurityIncidents();
        initializeComplianceScores();
        initializeAILearningMetrics();
        initializeSecurityAgents();
        initializeAttackVectorChart();
        initializeCANBusAnalysis();
        initializeThreatFeed();
        initializeWeatherIntelligence();
        
        // Initialize new Data Flow components
        initializeBinaryAnimation();
        initializeDataFlowAnimations();
        initializeDataFlowStatistics();

        // Add interactive functionality to dashboard controls
        setupDashboardControls();
        
        // Setup animations
        setupAnimations();
        
        // Hide loading overlay
        loadingOverlay.classList.add('hidden');
        
        // Initialize notification system and show welcome notification
        initializeNotificationSystem();
        
        // Update real-time data every 5 seconds
        setInterval(updateLiveData, 5000);
        
        // Periodically show threat notifications
        setInterval(showRandomThreatNotification, 45000);
        
        // Initialize responsive data visualization handlers
        initializeResponsiveDataVisualizationHandlers();
        
        // Apply Turkish formatting classes
        applyTurkishFormattingClasses();
        
        // Update existing numbers to Turkish formatting
        updateExistingNumbersToTurkish();
        
        // Initialize responsive and localization features
        initializeResponsiveAndLocalizationFeatures();
        
        // Initialize performance monitoring
        initializePerformanceMonitoring();
    }, 2000);
});

// Initialize performance monitoring and optimization
function initializePerformanceMonitoring() {
    // Monitor frame rate and adjust animations accordingly
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;
    
    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            frameCount = 0;
            lastTime = currentTime;
            
            // Adjust performance based on FPS
            if (fps < 30) {
                document.body.classList.add('low-performance');
                // Reduce animation complexity
                reduceAnimationComplexity();
            } else if (fps > 50) {
                document.body.classList.remove('low-performance');
            }
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    requestAnimationFrame(measureFPS);
    
    // Monitor memory usage if available
    if (performance.memory) {
        setInterval(() => {
            const memoryUsage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
            
            if (memoryUsage > 0.8) {
                // High memory usage - optimize
                optimizeForLowMemory();
            }
        }, 10000);
    }
    
    // Monitor network conditions
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        function updateNetworkOptimizations() {
            const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                                   connection.effectiveType === '2g' || 
                                   connection.saveData;
            
            if (isSlowConnection) {
                document.body.classList.add('slow-connection');
                // Reduce update frequency
                clearInterval(window.liveDataInterval);
                window.liveDataInterval = setInterval(updateLiveData, 10000); // Slower updates
            } else {
                document.body.classList.remove('slow-connection');
            }
        }
        
        connection.addEventListener('change', updateNetworkOptimizations);
        updateNetworkOptimizations();
    }
}

// Reduce animation complexity for low-performance devices
function reduceAnimationComplexity() {
    const style = document.createElement('style');
    style.innerHTML = `
        .low-performance * {
            animation-duration: 0.1s !important;
            transition-duration: 0.1s !important;
        }
        
        .low-performance .loading-spinner,
        .low-performance .marker-pulse {
            animation: none !important;
        }
        
        .low-performance .data-stream {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Optimize for low memory conditions
function optimizeForLowMemory() {
    // Clear unused chart data
    const charts = document.querySelectorAll('canvas');
    charts.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        if (ctx && ctx.clearRect) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });
    
    // Reduce DOM complexity
    const nonEssentialElements = document.querySelectorAll('.data-stream, .binary-animation');
    nonEssentialElements.forEach(element => {
        element.style.display = 'none';
    });
    
    // Force garbage collection if available
    if (window.gc) {
        window.gc();
    }
}

// Initialize Binary Animation for Anonymization Stage
function initializeBinaryAnimation() {
    const binaryDiv = document.getElementById('binary-animation');
    if (!binaryDiv) return;

    // Generate binary content
    let binaryContent = '';
    for (let i = 0; i < 500; i++) {
        binaryContent += Math.random() > 0.5 ? '1' : '0';
        if (i % 8 === 7) binaryContent += ' ';
    }
    binaryDiv.textContent = binaryContent;

    // Create scrolling animation effect
    let position = 0;
    setInterval(() => {
        position += 1;
        if (position > binaryContent.length / 2) {
            position = 0;
        }
        
        let newContent = '';
        for (let i = 0; i < 500; i++) {
            const index = (position + i) % binaryContent.length;
            newContent += binaryContent[index];
        }
        binaryDiv.textContent = newContent;
    }, 100);
}

// Initialize Data Flow Animations
function initializeDataFlowAnimations() {
    // Get data flow elements
    const dataStreams = document.querySelectorAll('.data-stream');
    if (dataStreams.length === 0) return;
    
    // Add additional animation elements for stages
    animateStageConnections();
}

// Animate connections between stages
function animateStageConnections() {
    const stages = document.querySelectorAll('.processing-stage');
    if (stages.length === 0) return;
    
    // Add animated connector lines between stages
    stages.forEach((stage, index) => {
        if (index < stages.length - 1) {
            const stageRect = stage.getBoundingClientRect();
            const nextStageRect = stages[index + 1].getBoundingClientRect();
            
            const connector = document.createElement('div');
            connector.className = 'stage-connector';
            connector.style.position = 'absolute';
            connector.style.top = `${stageRect.top + stageRect.height / 2}px`;
            connector.style.left = `${stageRect.right}px`;
            connector.style.width = `${nextStageRect.left - stageRect.right}px`;
            connector.style.height = '4px';
            connector.style.background = 'linear-gradient(90deg, rgba(0, 194, 255, 0.5), rgba(0, 194, 255, 0.2))';
            connector.style.zIndex = '5';
            
            document.querySelector('.data-flow-container').appendChild(connector);
            
            // Add animation particle
            setInterval(() => {
                const particle = document.createElement('div');
                particle.className = 'connector-particle';
                particle.style.position = 'absolute';
                particle.style.top = '-3px';
                particle.style.left = '0';
                particle.style.width = '10px';
                particle.style.height = '10px';
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = 'rgba(0, 194, 255, 0.8)';
                particle.style.animation = 'particleFlow 1.5s linear forwards';
                
                connector.appendChild(particle);
                
                // Remove particle after animation completes
                setTimeout(() => {
                    if (particle.parentNode === connector) {
                        connector.removeChild(particle);
                    }
                }, 1500);
            }, 3000);
        }
    });
    
    // Add keyframes for particle animation
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes particleFlow {
            0% { transform: translateX(0); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Initialize Data Flow Statistics with animated counters
function initializeDataFlowStatistics() {
    animateDataFlowCounter('data-sources-count', 0, 3642, 2000);
    animateDataFlowCounter('events-processed', 0, 12.8, 2000, 'M');
    animateDataFlowCounter('ml-accuracy', 90, 99.7, 2000, '%');
    animateDataFlowCounter('threats-identified', 0, 142, 2000);
}

// Animated counter function
function animateDataFlowCounter(elementId, start, end, duration, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    let current = start;
    const timer = setInterval(() => {
        current += range / 100;
        
        if ((range > 0 && current >= end) || (range < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        // Handle different formatting based on the type of number using Turkish formatting
        if (suffix === '%') {
            element.textContent = formatTurkishPercentage(current, 1);
        } else if (suffix === 'M') {
            element.textContent = formatTurkishDecimal(current, 1) + ' M';
        } else {
            element.textContent = formatTurkishNumber(Math.floor(current)) + suffix;
        }
    }, stepTime);
}

// Initialize mobile touch optimizations for dashboard components
function initializeMobileTouchOptimizations() {
    // Add touch feedback for dashboard items
    const dashboardItems = document.querySelectorAll('.dashboard-item');
    dashboardItems.forEach(item => {
        // Add touch start/end events for visual feedback
        item.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
            this.classList.add('touch-active');
        }, { passive: true });
        
        item.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
            this.classList.remove('touch-active');
        }, { passive: true });
        
        item.addEventListener('touchcancel', function(e) {
            this.style.transform = 'scale(1)';
            this.classList.remove('touch-active');
        }, { passive: true });
    });
    
    // Optimize scrollable containers for mobile
    const scrollableContainers = document.querySelectorAll(
        '.threat-list, .ai-agent-metrics, .log-analysis-container, ' +
        '.weather-container, .compliance-container, .timeline-container, ' +
        '.ai-learning-container, .performance-metrics'
    );
    
    scrollableContainers.forEach(container => {
        // Add momentum scrolling for iOS
        container.style.webkitOverflowScrolling = 'touch';
        container.style.scrollBehavior = 'smooth';
        
        // Add scroll indicators
        addScrollIndicators(container);
        
        // Optimize scroll performance with passive listeners
        let scrollTimeout;
        let isScrolling = false;
        
        container.addEventListener('scroll', function() {
            if (!isScrolling) {
                isScrolling = true;
                this.classList.add('scrolling');
                requestAnimationFrame(() => {
                    isScrolling = false;
                });
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.classList.remove('scrolling');
            }, 150);
        }, { passive: true });
        
        // Add smooth scrolling with momentum
        addSmoothScrolling(container);
    });
    
    // Add touch-friendly interactions for control buttons
    const controlButtons = document.querySelectorAll('.control-buttons button, .btn-primary, .btn-secondary, .hamburger-menu');
    controlButtons.forEach(button => {
        // Ensure minimum touch target size
        const rect = button.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            button.style.minWidth = '44px';
            button.style.minHeight = '44px';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        }
        
        // Add haptic-like feedback with proper event handling
        button.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
            this.style.backgroundColor = getComputedStyle(this).backgroundColor.replace(')', ', 0.3)').replace('rgb', 'rgba');
            this.classList.add('touch-active');
            
            // Provide haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }, { passive: true });
        
        button.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '';
            this.classList.remove('touch-active');
            
            // Trigger click after touch feedback for better UX
            if (!this.disabled) {
                setTimeout(() => {
                    this.click();
                }, 50);
            }
        }, { passive: true });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '';
            this.classList.remove('touch-active');
        }, { passive: true });
    });
    
    // Add pull-to-refresh functionality for threat feed
    const threatFeed = document.getElementById('threat-feed');
    if (threatFeed) {
        addPullToRefresh(threatFeed);
    }
    
    // Optimize font sizes based on device pixel ratio
    optimizeFontSizesForDevice();
    
    // Initialize image lazy loading
    initializeLazyLoading();
    
    // Add focus management for mobile accessibility
    initializeMobileFocusManagement();
    
    // Optimize touch interactions for charts and visualizations
    optimizeVisualizationTouchInteractions();
}

// Add scroll indicators to show scrollable content
function addScrollIndicators(container) {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.style.position = 'absolute';
    indicator.style.right = '2px';
    indicator.style.top = '50%';
    indicator.style.transform = 'translateY(-50%)';
    indicator.style.width = '4px';
    indicator.style.height = '20px';
    indicator.style.background = 'rgba(75, 107, 220, 0.3)';
    indicator.style.borderRadius = '2px';
    indicator.style.opacity = '0';
    indicator.style.transition = 'opacity 0.3s ease';
    indicator.style.pointerEvents = 'none';
    
    container.style.position = 'relative';
    container.appendChild(indicator);
    
    // Show indicator when scrollable content is available
    function updateIndicator() {
        const hasScroll = container.scrollHeight > container.clientHeight;
        indicator.style.opacity = hasScroll ? '1' : '0';
    }
    
    // Update on content changes
    const observer = new MutationObserver(updateIndicator);
    observer.observe(container, { childList: true, subtree: true });
    
    // Update on scroll with passive listener
    container.addEventListener('scroll', () => {
        indicator.style.opacity = '0.6';
        clearTimeout(indicator.fadeTimeout);
        indicator.fadeTimeout = setTimeout(() => {
            indicator.style.opacity = '0.3';
        }, 1000);
    }, { passive: true });
    
    updateIndicator();
}

// Initialize lazy loading for images and heavy content
function initializeLazyLoading() {
    // Create intersection observer for lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Handle image lazy loading
                if (element.tagName === 'IMG' && element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                    element.classList.remove('lazy-load');
                    observer.unobserve(element);
                }
                
                // Handle canvas lazy initialization
                if (element.tagName === 'CANVAS' && element.dataset.lazyInit) {
                    initializeCanvasVisualization(element);
                    element.removeAttribute('data-lazy-init');
                    observer.unobserve(element);
                }
                
                // Handle heavy content sections
                if (element.classList.contains('lazy-content')) {
                    element.classList.add('loaded');
                    observer.unobserve(element);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Observe all lazy-loadable elements
    const lazyElements = document.querySelectorAll('img[data-src], canvas[data-lazy-init], .lazy-content');
    lazyElements.forEach(element => {
        lazyLoadObserver.observe(element);
    });
    
    // Preload critical images for better performance
    preloadCriticalImages();
    
    // Optimize image loading based on connection speed
    optimizeImageLoadingByConnection();
}

// Preload critical images that are immediately visible
function preloadCriticalImages() {
    const criticalImages = [
        // Add paths to critical images that should load immediately
        'images/icon-192.png'
    ];
    
    criticalImages.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });
}

// Optimize image loading based on network connection
function optimizeImageLoadingByConnection() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                               connection.effectiveType === '2g' || 
                               connection.saveData;
        
        if (isSlowConnection) {
            // Reduce image quality for slow connections
            document.documentElement.classList.add('slow-connection');
            
            // Delay non-critical image loading
            setTimeout(() => {
                const nonCriticalImages = document.querySelectorAll('img[data-src]:not(.critical)');
                nonCriticalImages.forEach(img => {
                    if (img.dataset.srcLowQuality) {
                        img.dataset.src = img.dataset.srcLowQuality;
                    }
                });
            }, 2000);
        }
    }
}

// Initialize canvas visualization when it becomes visible
function initializeCanvasVisualization(canvas) {
    const canvasId = canvas.id;
    
    switch (canvasId) {
        case 'attack-vector-chart':
            setupResponsiveCanvas(canvas);
            addChartTouchInteractions(canvas, 'attack-vector');
            // Initialize the actual chart rendering
            if (typeof initializeAttackVectorChart === 'function') {
                initializeAttackVectorChart();
            }
            break;
        case 'ai-learning-metrics':
            setupResponsiveCanvas(canvas);
            addChartTouchInteractions(canvas, 'ai-learning');
            break;
        case 'network-anomaly-map':
            setupResponsiveCanvas(canvas);
            addChartTouchInteractions(canvas, 'vehicle-systems');
            break;
    }
}

// Initialize mobile focus management for accessibility
function initializeMobileFocusManagement() {
    let lastFocusedElement = null;
    let isUsingKeyboard = false;
    
    // Detect keyboard vs touch interaction
    document.addEventListener('keydown', () => {
        isUsingKeyboard = true;
    });
    
    document.addEventListener('touchstart', () => {
        isUsingKeyboard = false;
    }, { passive: true });
    
    // Manage focus for mobile navigation
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function() {
            const isMenuOpen = navMenu.classList.contains('active');
            
            if (!isMenuOpen) {
                // Store the last focused element before opening menu
                lastFocusedElement = document.activeElement;
                
                // Focus the first menu item after animation
                setTimeout(() => {
                    const firstMenuItem = navMenu.querySelector('a');
                    if (firstMenuItem && isUsingKeyboard) {
                        firstMenuItem.focus();
                    }
                }, 300);
            } else {
                // Return focus to the hamburger menu or last focused element
                if (lastFocusedElement && isUsingKeyboard) {
                    lastFocusedElement.focus();
                } else if (isUsingKeyboard) {
                    hamburgerMenu.focus();
                }
            }
        });
    }
    
    // Handle focus trapping in modal-like elements
    const modalElements = document.querySelectorAll('.nav-menu, .chart-tooltip');
    modalElements.forEach(modal => {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                trapFocus(e, this);
            }
            
            if (e.key === 'Escape') {
                closeModal(this);
            }
        });
    });
    
    // Improve focus visibility for mobile users
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            if (isUsingKeyboard) {
                this.classList.add('keyboard-focus');
            }
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });
    
    // Handle focus for dynamically created elements
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const focusableChildren = node.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    
                    focusableChildren.forEach(child => {
                        child.addEventListener('focus', function() {
                            if (isUsingKeyboard) {
                                this.classList.add('keyboard-focus');
                            }
                        });
                        
                        child.addEventListener('blur', function() {
                            this.classList.remove('keyboard-focus');
                        });
                    });
                }
            });
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Manage focus for dashboard items
    const dashboardItems = document.querySelectorAll('.dashboard-item');
    dashboardItems.forEach(item => {
        // Make dashboard items focusable for keyboard navigation
        if (!item.hasAttribute('tabindex')) {
            item.setAttribute('tabindex', '0');
        }
        
        item.addEventListener('focus', function() {
            if (isUsingKeyboard) {
                this.classList.add('keyboard-focus');
                // Scroll into view if needed
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
        
        item.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
        
        // Handle Enter key activation
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Simulate click for keyboard users
                this.click();
            }
        });
    });
}

// Trap focus within a modal element
function trapFocus(event, modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
        if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        }
    } else {
        if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
}

// Close modal and return focus
function closeModal(modal) {
    if (modal.classList.contains('nav-menu')) {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        if (hamburgerMenu) {
            hamburgerMenu.click();
        }
    }
    
    // Remove any tooltips
    if (modal.classList.contains('chart-tooltip')) {
        modal.remove();
    }
}

// Optimize touch interactions for charts and visualizations
function optimizeVisualizationTouchInteractions() {
    // Optimize all canvas elements for touch
    const canvasElements = document.querySelectorAll('canvas');
    canvasElements.forEach(canvas => {
        // Prevent default touch behaviors that interfere with chart interactions
        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        canvas.addEventListener('touchend', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        // Add visual feedback for touch interactions
        canvas.addEventListener('touchstart', function() {
            this.style.filter = 'brightness(1.1)';
        }, { passive: true });
        
        canvas.addEventListener('touchend', function() {
            this.style.filter = 'brightness(1)';
        }, { passive: true });
    });
    
    // Optimize map interactions for touch
    const mapContainer = document.getElementById('threat-map');
    if (mapContainer) {
        // Improve touch responsiveness for map
        mapContainer.style.touchAction = 'manipulation';
        
        // Add touch feedback for map interactions
        let mapTouchTimeout;
        mapContainer.addEventListener('touchstart', function() {
            clearTimeout(mapTouchTimeout);
            this.classList.add('map-interacting');
        }, { passive: true });
        
        mapContainer.addEventListener('touchend', function() {
            mapTouchTimeout = setTimeout(() => {
                this.classList.remove('map-interacting');
            }, 300);
        }, { passive: true });
    }
    
    // Optimize scrollable data visualizations
    const dataContainers = document.querySelectorAll(
        '.threat-list, .timeline-container, .log-analysis-container, .performance-metrics'
    );
    
    dataContainers.forEach(container => {
        // Add touch-friendly scrolling indicators
        const scrollThumb = document.createElement('div');
        scrollThumb.className = 'touch-scroll-thumb';
        scrollThumb.style.position = 'absolute';
        scrollThumb.style.right = '0';
        scrollThumb.style.top = '0';
        scrollThumb.style.width = '4px';
        scrollThumb.style.backgroundColor = 'rgba(75, 107, 220, 0.5)';
        scrollThumb.style.borderRadius = '2px';
        scrollThumb.style.opacity = '0';
        scrollThumb.style.transition = 'opacity 0.3s ease';
        scrollThumb.style.pointerEvents = 'none';
        scrollThumb.style.zIndex = '10';
        
        container.style.position = 'relative';
        container.appendChild(scrollThumb);
        
        // Update scroll thumb position and visibility
        function updateScrollThumb() {
            const scrollPercentage = container.scrollTop / (container.scrollHeight - container.clientHeight);
            const thumbHeight = Math.max(20, (container.clientHeight / container.scrollHeight) * container.clientHeight);
            const thumbTop = scrollPercentage * (container.clientHeight - thumbHeight);
            
            scrollThumb.style.height = thumbHeight + 'px';
            scrollThumb.style.transform = `translateY(${thumbTop}px)`;
            scrollThumb.style.opacity = container.scrollHeight > container.clientHeight ? '0.7' : '0';
        }
        
        container.addEventListener('scroll', updateScrollThumb, { passive: true });
        
        // Show thumb during touch interactions
        container.addEventListener('touchstart', function() {
            scrollThumb.style.opacity = '1';
        }, { passive: true });
        
        container.addEventListener('touchend', function() {
            setTimeout(() => {
                updateScrollThumb();
            }, 500);
        }, { passive: true });
        
        // Initial update
        updateScrollThumb();
        
        // Update on resize
        window.addEventListener('resize', updateScrollThumb, { passive: true });
    });
    
    // Add haptic feedback for important interactions
    const importantButtons = document.querySelectorAll(
        '.btn-primary, .btn-secondary, .control-buttons button[title*="expand"], .hamburger-menu'
    );
    
    importantButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            // Provide haptic feedback for important actions
            if (navigator.vibrate) {
                navigator.vibrate(15);
            }
        }, { passive: true });
    });
}

// Add smooth scrolling with momentum for mobile devices
function addSmoothScrolling(container) {
    let isScrolling = false;
    let scrollVelocity = 0;
    let lastScrollTop = 0;
    let lastScrollTime = 0;
    
    // Track scroll velocity for momentum
    container.addEventListener('scroll', function() {
        const currentTime = Date.now();
        const currentScrollTop = this.scrollTop;
        
        if (lastScrollTime > 0) {
            const timeDelta = currentTime - lastScrollTime;
            const scrollDelta = currentScrollTop - lastScrollTop;
            scrollVelocity = scrollDelta / timeDelta;
        }
        
        lastScrollTop = currentScrollTop;
        lastScrollTime = currentTime;
        
        isScrolling = true;
        clearTimeout(this.scrollEndTimeout);
        this.scrollEndTimeout = setTimeout(() => {
            isScrolling = false;
            scrollVelocity = 0;
        }, 150);
    }, { passive: true });
    
    // Add momentum scrolling for touch devices
    let touchStartY = 0;
    let touchStartTime = 0;
    let touchVelocity = 0;
    
    container.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        touchVelocity = 0;
        
        // Stop any ongoing momentum
        if (this.momentumAnimation) {
            cancelAnimationFrame(this.momentumAnimation);
            this.momentumAnimation = null;
        }
    }, { passive: true });
    
    container.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        const currentTime = Date.now();
        const timeDelta = currentTime - touchStartTime;
        const touchDelta = currentY - touchStartY;
        
        if (timeDelta > 0) {
            touchVelocity = touchDelta / timeDelta;
        }
    }, { passive: true });
    
    container.addEventListener('touchend', function(e) {
        // Apply momentum scrolling if velocity is significant
        if (Math.abs(touchVelocity) > 0.5) {
            applyMomentumScrolling(this, touchVelocity);
        }
    }, { passive: true });
}

// Apply momentum scrolling animation
function applyMomentumScrolling(container, velocity) {
    const friction = 0.95;
    const minVelocity = 0.1;
    
    function animate() {
        velocity *= friction;
        
        if (Math.abs(velocity) < minVelocity) {
            container.momentumAnimation = null;
            return;
        }
        
        container.scrollTop -= velocity * 10;
        container.momentumAnimation = requestAnimationFrame(animate);
    }
    
    container.momentumAnimation = requestAnimationFrame(animate);
}

// Add pull-to-refresh functionality
function addPullToRefresh(container) {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    let isPulling = false;
    let refreshThreshold = 60;
    
    const refreshIndicator = document.createElement('div');
    refreshIndicator.className = 'pull-refresh-indicator';
    refreshIndicator.style.position = 'absolute';
    refreshIndicator.style.top = '-60px';
    refreshIndicator.style.left = '50%';
    refreshIndicator.style.transform = 'translateX(-50%)';
    refreshIndicator.style.width = '40px';
    refreshIndicator.style.height = '40px';
    refreshIndicator.style.background = 'rgba(75, 107, 220, 0.8)';
    refreshIndicator.style.borderRadius = '50%';
    refreshIndicator.style.display = 'flex';
    refreshIndicator.style.alignItems = 'center';
    refreshIndicator.style.justifyContent = 'center';
    refreshIndicator.style.color = 'white';
    refreshIndicator.style.fontSize = '1.2rem';
    refreshIndicator.style.transition = 'transform 0.3s ease';
    refreshIndicator.innerHTML = '<i class="fas fa-arrow-down"></i>';
    
    container.style.position = 'relative';
    container.appendChild(refreshIndicator);
    
    container.addEventListener('touchstart', (e) => {
        if (container.scrollTop === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!isPulling) return;
        
        currentY = e.touches[0].clientY;
        pullDistance = Math.max(0, currentY - startY);
        
        if (pullDistance > 0) {
            e.preventDefault();
            const translateY = Math.min(pullDistance * 0.5, refreshThreshold);
            refreshIndicator.style.transform = `translateX(-50%) translateY(${translateY}px)`;
            
            if (pullDistance > refreshThreshold) {
                refreshIndicator.innerHTML = '<i class="fas fa-sync-alt"></i>';
                refreshIndicator.style.background = 'rgba(0, 230, 118, 0.8)';
            } else {
                refreshIndicator.innerHTML = '<i class="fas fa-arrow-down"></i>';
                refreshIndicator.style.background = 'rgba(75, 107, 220, 0.8)';
            }
        }
    });
    
    container.addEventListener('touchend', () => {
        if (isPulling && pullDistance > refreshThreshold) {
            // Trigger refresh
            refreshIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            refreshIndicator.style.background = 'rgba(0, 194, 255, 0.8)';
            
            // Simulate refresh (update threat feed)
            setTimeout(() => {
                updateThreatFeed();
                refreshIndicator.style.transform = 'translateX(-50%) translateY(-60px)';
                refreshIndicator.innerHTML = '<i class="fas fa-check"></i>';
                refreshIndicator.style.background = 'rgba(0, 230, 118, 0.8)';
                
                setTimeout(() => {
                    refreshIndicator.innerHTML = '<i class="fas fa-arrow-down"></i>';
                    refreshIndicator.style.background = 'rgba(75, 107, 220, 0.8)';
                }, 1000);
            }, 1500);
        } else {
            refreshIndicator.style.transform = 'translateX(-50%) translateY(-60px)';
        }
        
        isPulling = false;
        pullDistance = 0;
    });
}

// Optimize font sizes based on device characteristics
function optimizeFontSizesForDevice() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const screenWidth = window.screen.width;
    const isHighDPI = devicePixelRatio > 1.5;
    const isSmallScreen = screenWidth < 375;
    
    if (isSmallScreen || isHighDPI) {
        // Add CSS custom properties for device-specific optimizations
        const root = document.documentElement;
        
        if (isSmallScreen) {
            root.style.setProperty('--mobile-font-scale', '0.9');
        } else if (isHighDPI) {
            root.style.setProperty('--mobile-font-scale', '1.1');
        }
        
        // Apply font scaling
        const style = document.createElement('style');
        style.innerHTML = `
            @media (max-width: 767px) {
                .dashboard-item * {
                    font-size: calc(var(--base-font-size, 1rem) * var(--mobile-font-scale, 1));
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Set up responsive canvas sizing
function setupResponsiveCanvas(canvas) {
    const container = canvas.parentElement;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Set canvas display size (CSS pixels)
    canvas.style.width = containerWidth + 'px';
    canvas.style.height = containerHeight + 'px';
    
    // Set canvas actual size (device pixels for crisp rendering)
    canvas.width = containerWidth * devicePixelRatio;
    canvas.height = containerHeight * devicePixelRatio;
    
    // Scale the drawing context to match device pixel ratio
    const ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // Ensure canvas is responsive
    canvas.style.maxWidth = '100%';
    canvas.style.maxHeight = '100%';
    canvas.style.display = 'block';
}

// Add touch-friendly interactions to charts
function addChartTouchInteractions(canvas, chartType) {
    let isInteracting = false;
    let lastTouchTime = 0;
    
    // Touch start handler
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        isInteracting = true;
        
        // Add visual feedback
        canvas.style.transform = 'scale(0.98)';
        canvas.style.transition = 'transform 0.1s ease';
        
        // Handle chart-specific interactions
        handleChartInteraction(e, chartType, 'start');
    }, { passive: false });
    
    // Touch move handler for gestures
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if (!isInteracting) return;
        
        handleChartInteraction(e, chartType, 'move');
    }, { passive: false });
    
    // Touch end handler
    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        isInteracting = false;
        
        // Remove visual feedback
        canvas.style.transform = 'scale(1)';
        
        // Handle double-tap for zoom
        const currentTime = Date.now();
        if (currentTime - lastTouchTime < 300) {
            handleChartInteraction(e, chartType, 'doubletap');
        }
        lastTouchTime = currentTime;
        
        handleChartInteraction(e, chartType, 'end');
    }, { passive: false });
    
    // Mouse interactions for desktop
    canvas.addEventListener('mousedown', function(e) {
        canvas.style.transform = 'scale(0.98)';
        canvas.style.transition = 'transform 0.1s ease';
    });
    
    canvas.addEventListener('mouseup', function(e) {
        canvas.style.transform = 'scale(1)';
    });
    
    canvas.addEventListener('mouseleave', function(e) {
        canvas.style.transform = 'scale(1)';
    });
    
    // Add hover effects for desktop
    canvas.addEventListener('mousemove', function(e) {
        handleChartInteraction(e, chartType, 'hover');
    });
}

// Handle chart-specific interactions
function handleChartInteraction(event, chartType, interactionType) {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    
    // Get interaction coordinates
    let x, y;
    if (event.touches && event.touches.length > 0) {
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
    } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }
    
    // Scale coordinates for device pixel ratio
    const devicePixelRatio = window.devicePixelRatio || 1;
    x *= devicePixelRatio;
    y *= devicePixelRatio;
    
    switch (chartType) {
        case 'attack-vector':
            handleAttackVectorInteraction(canvas, x, y, interactionType);
            break;
        case 'ai-learning':
            handleAILearningInteraction(canvas, x, y, interactionType);
            break;
        case 'vehicle-systems':
            handleVehicleSystemsInteraction(canvas, x, y, interactionType);
            break;
    }
}

// Handle attack vector chart interactions
function handleAttackVectorInteraction(canvas, x, y, interactionType) {
    if (interactionType === 'doubletap') {
        // Show detailed attack vector information
        showAttackVectorDetails();
    } else if (interactionType === 'hover' || interactionType === 'start') {
        // Show tooltip with attack vector information
        showChartTooltip(canvas, x, y, getAttackVectorAtPosition(x, y));
    }
}

// Handle AI learning chart interactions
function handleAILearningInteraction(canvas, x, y, interactionType) {
    if (interactionType === 'doubletap') {
        // Show detailed AI metrics
        showAILearningDetails();
    } else if (interactionType === 'hover' || interactionType === 'start') {
        // Show data point information
        showChartTooltip(canvas, x, y, getAILearningDataAtPosition(x, y));
    }
}

// Handle vehicle systems interactions
function handleVehicleSystemsInteraction(canvas, x, y, interactionType) {
    if (interactionType === 'doubletap') {
        // Show detailed system information
        showVehicleSystemDetails();
    } else if (interactionType === 'hover' || interactionType === 'start') {
        // Show system status information
        showChartTooltip(canvas, x, y, getVehicleSystemAtPosition(x, y));
    }
}

// Show chart tooltip
function showChartTooltip(canvas, x, y, data) {
    if (!data) return;
    
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.chart-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-title">${data.title}</div>
        <div class="tooltip-content">${data.content}</div>
    `;
    
    // Position tooltip
    const rect = canvas.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.left = (rect.left + x) + 'px';
    tooltip.style.top = (rect.top + y - 60) + 'px';
    tooltip.style.zIndex = '1000';
    tooltip.style.background = 'rgba(27, 33, 58, 0.95)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '12px';
    tooltip.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.maxWidth = '200px';
    
    document.body.appendChild(tooltip);
    
    // Auto-remove tooltip after delay
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 3000);
}

// Get attack vector data at position
function getAttackVectorAtPosition(x, y) {
    // This would calculate which slice of the pie chart was touched
    // For now, return sample data
    return {
        title: 'Saldırı Vektörü',
        content: 'CAN Enjeksiyonu: Tespit edilen saldırıların ' + formatTurkishPercentage(35, 0)
    };
}

// Get AI learning data at position
function getAILearningDataAtPosition(x, y) {
    return {
        title: 'YZ Performansı',
        content: 'Tespit doğruluğu zaman içinde iyileşiyor'
    };
}

// Get vehicle system at position
function getVehicleSystemAtPosition(x, y) {
    return {
        title: 'Araç Sistemi',
        content: 'Sistem durumu: Normal çalışma'
    };
}

// Show detailed attack vector information
function showAttackVectorDetails() {
    showNotification({
        type: 'info',
        icon: 'fa-chart-pie',
        title: 'Saldırı Vektörü Analizi',
        message: 'CAN Bus enjeksiyon girişimleri en yaygın saldırı vektörüdür ve tespit edilen tüm tehditlerin ' + formatTurkishPercentage(35, 0) + '\'ini oluşturur.',
        duration: 5000
    });
}

// Show detailed AI learning information
function showAILearningDetails() {
    showNotification({
        type: 'info',
        icon: 'fa-brain',
        title: 'YZ Öğrenme İlerlemesi',
        message: 'Makine öğrenmesi modelleri son 9 ayda tespit doğruluğunu ' + formatTurkishPercentage(90, 0) + '\'dan ' + formatTurkishPercentage(99.7, 1) + '\'ye yükseltti.',
        duration: 5000
    });
}

// Show detailed vehicle system information
function showVehicleSystemDetails() {
    showNotification({
        type: 'info',
        icon: 'fa-car',
        title: 'Araç Sistemleri Durumu',
        message: 'Tüm kritik araç sistemleri normal çalışıyor. ADAS sistemi küçük uyarılar gösteriyor.',
        duration: 5000
    });
}

// Initialize orientation change handling
function initializeOrientationChangeHandling() {
    let currentOrientation = screen.orientation ? screen.orientation.angle : window.orientation || 0;
    let orientationChangeTimeout;
    let isTransitioning = false;
    
    // Store initial viewport dimensions
    let initialViewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    // Handle orientation change events
    function handleOrientationChange() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        const newOrientation = screen.orientation ? screen.orientation.angle : window.orientation || 0;
        
        // Add transitioning class to body
        document.body.classList.add('orientation-transitioning');
        
        // Clear any existing timeout
        clearTimeout(orientationChangeTimeout);
        
        // Wait for orientation change to complete and viewport to stabilize
        orientationChangeTimeout = setTimeout(() => {
            try {
                // Update current orientation
                currentOrientation = newOrientation;
                
                // Determine orientation type
                const isLandscape = Math.abs(currentOrientation) === 90;
                const isPortrait = currentOrientation === 0 || currentOrientation === 180;
                
                // Update body classes for orientation-specific styling
                document.body.classList.remove('portrait-mode', 'landscape-mode');
                document.body.classList.add(isLandscape ? 'landscape-mode' : 'portrait-mode');
                
                // Adapt dashboard layout
                adaptDashboardForOrientation(isLandscape, isPortrait);
                
                // Adapt navigation for orientation
                adaptNavigationForOrientation(isLandscape, isPortrait);
                
                // Update map and visualizations
                updateVisualizationsForOrientation(isLandscape, isPortrait);
                
                // Maintain scroll position and functionality
                maintainFunctionalityDuringTransition();
                
                // Update viewport dimensions
                initialViewport = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
                
                // Trigger custom orientation change event
                const orientationEvent = new CustomEvent('orientationAdapted', {
                    detail: {
                        orientation: isLandscape ? 'landscape' : 'portrait',
                        angle: currentOrientation,
                        dimensions: initialViewport
                    }
                });
                document.dispatchEvent(orientationEvent);
                
            } catch (error) {
                console.warn('Error during orientation change handling:', error);
            } finally {
                // Remove transitioning class
                document.body.classList.remove('orientation-transitioning');
                isTransitioning = false;
            }
        }, 300); // Wait for orientation change to complete
    }
    
    // Listen for orientation change events
    if (screen.orientation) {
        screen.orientation.addEventListener('change', handleOrientationChange);
    } else {
        // Fallback for older browsers
        window.addEventListener('orientationchange', handleOrientationChange);
    }
    
    // Also listen for resize events that might indicate orientation change
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            
            // Check if this is likely an orientation change
            const aspectRatioChanged = (
                (initialViewport.width > initialViewport.height) !== (newWidth > newHeight)
            );
            
            if (aspectRatioChanged && Math.abs(newWidth - initialViewport.height) < 50) {
                handleOrientationChange();
            }
        }, 100);
    });
    
    // Initialize with current orientation
    const isLandscape = window.innerWidth > window.innerHeight;
    document.body.classList.add(isLandscape ? 'landscape-mode' : 'portrait-mode');
}

// Adapt dashboard layout for orientation changes
function adaptDashboardForOrientation(isLandscape, isPortrait) {
    const dashboardGrid = document.querySelector('.dashboard-grid');
    const dashboardItems = document.querySelectorAll('.dashboard-item');
    
    if (!dashboardGrid) return;
    
    // Remove existing orientation classes
    dashboardGrid.classList.remove('landscape-layout', 'portrait-layout');
    
    if (isLandscape) {
        dashboardGrid.classList.add('landscape-layout');
        
        // Adjust grid based on screen size
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) {
            // Desktop landscape - 3 columns
            dashboardGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else if (screenWidth >= 768) {
            // Tablet landscape - 2 columns
            dashboardGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            // Mobile landscape - 1 column with reduced heights
            dashboardGrid.style.gridTemplateColumns = '1fr';
            dashboardItems.forEach(item => {
                item.style.minHeight = '180px';
                item.style.maxHeight = '300px';
            });
        }
    } else if (isPortrait) {
        dashboardGrid.classList.add('portrait-layout');
        
        // Portrait mode - always single column
        dashboardGrid.style.gridTemplateColumns = '1fr';
        dashboardItems.forEach(item => {
            item.style.minHeight = '200px';
            item.style.maxHeight = '400px';
        });
    }
    
    // Ensure world map spans appropriately
    const worldMap = document.querySelector('.world-map');
    if (worldMap) {
        if (isLandscape && window.innerWidth >= 768) {
            worldMap.style.gridColumn = 'span 2';
        } else {
            worldMap.style.gridColumn = 'span 1';
        }
    }
}

// Adapt navigation for orientation changes
function adaptNavigationForOrientation(isLandscape, isPortrait) {
    const navMenu = document.querySelector('.nav-menu');
    const navList = document.querySelector('.nav-menu ul');
    
    if (!navMenu || !navList) return;
    
    // Remove existing orientation classes
    navMenu.classList.remove('landscape-nav', 'portrait-nav');
    
    if (isLandscape && window.innerWidth <= 767) {
        // Mobile landscape - horizontal navigation
        navMenu.classList.add('landscape-nav');
        navList.style.flexDirection = 'row';
        navList.style.flexWrap = 'wrap';
        navList.style.justifyContent = 'center';
        navList.style.padding = '10px';
        
        // Adjust nav item styling
        const navItems = navList.querySelectorAll('li');
        navItems.forEach((item, index) => {
            const link = item.querySelector('a');
            if (link) {
                link.style.padding = '12px 15px';
                link.style.fontSize = '0.9rem';
            }
            
            // Add right border except for last item
            item.style.borderBottom = 'none';
            item.style.borderRight = index < navItems.length - 1 ? 
                '1px solid rgba(75, 107, 220, 0.1)' : 'none';
        });
    } else {
        // Portrait or larger screens - vertical navigation
        navMenu.classList.add('portrait-nav');
        navList.style.flexDirection = 'column';
        navList.style.flexWrap = 'nowrap';
        navList.style.justifyContent = 'flex-start';
        navList.style.padding = '20px 0';
        
        // Reset nav item styling
        const navItems = navList.querySelectorAll('li');
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                link.style.padding = '18px 25px';
                link.style.fontSize = '1rem';
            }
            
            item.style.borderRight = 'none';
            item.style.borderBottom = '1px solid rgba(75, 107, 220, 0.1)';
        });
    }
}

// Update visualizations for orientation changes
function updateVisualizationsForOrientation(isLandscape, isPortrait) {
    // Update map container
    const mapContainer = document.getElementById('threat-map');
    if (mapContainer) {
        // Trigger map resize
        setTimeout(() => {
            if (window.threatMap) {
                window.threatMap.invalidateSize();
            }
        }, 100);
    }
    
    // Update all canvas-based visualizations
    updateAllDataVisualizations();
    
    // Update chart containers
    const chartContainers = document.querySelectorAll(
        '.attack-vector-container, .ai-learning-container, .network-anomaly-container'
    );
    
    chartContainers.forEach(container => {
        const canvas = container.querySelector('canvas');
        if (canvas) {
            // Adjust canvas height based on orientation
            if (isLandscape && window.innerWidth <= 767) {
                canvas.style.maxHeight = '150px';
            } else if (isPortrait) {
                canvas.style.maxHeight = '200px';
            } else {
                canvas.style.maxHeight = '';
            }
        }
    });
    
    // Update scrollable containers
    const scrollableContainers = document.querySelectorAll(
        '.threat-list, .performance-metrics, .log-analysis-container'
    );
    
    scrollableContainers.forEach(container => {
        if (isLandscape && window.innerWidth <= 767) {
            // Reduce height for mobile landscape
            if (container.classList.contains('threat-list')) {
                container.style.height = '200px';
            } else if (container.classList.contains('performance-metrics')) {
                container.style.height = '220px';
            }
        } else if (isPortrait) {
            // Standard height for portrait
            if (container.classList.contains('threat-list')) {
                container.style.height = '300px';
            } else if (container.classList.contains('performance-metrics')) {
                container.style.height = '320px';
            }
        } else {
            // Reset to default for larger screens
            container.style.height = '';
        }
    });
}

// Maintain functionality during orientation transitions
function maintainFunctionalityDuringTransition() {
    // Preserve scroll positions
    const scrollableElements = document.querySelectorAll(
        '.threat-list, .log-analysis-container, .nav-menu'
    );
    
    scrollableElements.forEach(element => {
        const scrollTop = element.scrollTop;
        setTimeout(() => {
            element.scrollTop = scrollTop;
        }, 50);
    });
    
    // Ensure interactive elements remain accessible
    const interactiveElements = document.querySelectorAll(
        'button, a, input, .dashboard-item'
    );
    
    interactiveElements.forEach(element => {
        // Temporarily disable pointer events during transition
        element.style.pointerEvents = 'none';
        setTimeout(() => {
            element.style.pointerEvents = '';
        }, 300);
    });
    
    // Update focus management
    const activeElement = document.activeElement;
    if (activeElement && activeElement !== document.body) {
        setTimeout(() => {
            if (activeElement.focus) {
                activeElement.focus();
            }
        }, 350);
    }
    
    // Refresh any active tooltips or modals
    const tooltips = document.querySelectorAll('.chart-tooltip, .notification');
    tooltips.forEach(tooltip => {
        // Reposition tooltips after orientation change
        if (tooltip.style.position === 'absolute') {
            setTimeout(() => {
                // Trigger reposition logic
                const rect = tooltip.getBoundingClientRect();
                if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
                    tooltip.style.left = Math.max(10, window.innerWidth - rect.width - 10) + 'px';
                    tooltip.style.top = Math.max(10, window.innerHeight - rect.height - 10) + 'px';
                }
            }, 100);
        }
    });
}

// Initialize responsive data visualization handlers
function initializeResponsiveDataVisualizationHandlers() {
    let resizeTimeout;
    
    // Handle window resize with debouncing
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateAllDataVisualizations();
            handleResponsiveBreakpointChange();
        }, 250);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        // Wait for orientation change to complete
        setTimeout(() => {
            updateAllDataVisualizations();
            handleResponsiveBreakpointChange();
        }, 500);
    });
    
    // Handle visibility change (when tab becomes active/inactive)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Refresh visualizations when tab becomes active
            setTimeout(() => {
                updateAllDataVisualizations();
            }, 100);
        }
    });
    
    // Listen for custom orientation adapted event
    document.addEventListener('orientationAdapted', (event) => {
        console.log('Orientation adapted:', event.detail);
        // Additional handling if needed
        updateAllDataVisualizations();
        handleResponsiveBreakpointChange();
    });
    
    // Initialize responsive breakpoint detection
    initializeResponsiveBreakpointDetection();
}

// Update all data visualizations for responsive behavior
function updateAllDataVisualizations() {
    // Update attack vector chart
    const attackVectorCanvas = document.getElementById('attack-vector-chart');
    if (attackVectorCanvas) {
        setupResponsiveCanvas(attackVectorCanvas);
        const ctx = attackVectorCanvas.getContext('2d');
        drawAttackVectorPieChart(ctx, attackVectorCanvas.width, attackVectorCanvas.height);
    }
    
    // Update AI learning chart
    const aiLearningCanvas = document.getElementById('ai-learning-canvas');
    if (aiLearningCanvas) {
        setupResponsiveCanvas(aiLearningCanvas);
        const ctx = aiLearningCanvas.getContext('2d');
        drawAILearningCurve(ctx, aiLearningCanvas.width, aiLearningCanvas.height);
    }
    
    // Update vehicle systems chart
    const vehicleSystemsCanvas = document.getElementById('vehicle-systems-canvas');
    if (vehicleSystemsCanvas) {
        setupResponsiveCanvas(vehicleSystemsCanvas);
        const ctx = vehicleSystemsCanvas.getContext('2d');
        drawVehicleOutline(ctx, vehicleSystemsCanvas.width, vehicleSystemsCanvas.height);
        drawVehicleSystems(ctx, vehicleSystemsCanvas.width, vehicleSystemsCanvas.height);
    }
    
    // Remove any existing tooltips during resize
    const existingTooltips = document.querySelectorAll('.chart-tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());
}

// Add performance monitoring for data visualizations
function monitorVisualizationPerformance() {
    const canvases = document.querySelectorAll('canvas');
    
    canvases.forEach(canvas => {
        // Monitor frame rate for smooth animations
        let lastFrameTime = performance.now();
        let frameCount = 0;
        
        const checkPerformance = () => {
            const currentTime = performance.now();
            frameCount++;
            
            if (currentTime - lastFrameTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastFrameTime = currentTime;
                
                // If FPS is too low, reduce animation complexity
                if (fps < 30) {
                    canvas.classList.add('low-performance');
                } else {
                    canvas.classList.remove('low-performance');
                }
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    });
}

// Initialize performance monitoring
setTimeout(() => {
    monitorVisualizationPerformance();
}, 3000);

// Responsive legend positioning helper
function getResponsiveLegendPosition(width, height, itemCount) {
    const isMobile = width < 400;
    const isTablet = width >= 400 && width < 768;
    
    if (isMobile) {
        // Horizontal legend at bottom for mobile
        return {
            type: 'horizontal',
            x: width / 2,
            y: height - 30,
            itemWidth: width / itemCount,
            itemHeight: 25,
            fontSize: 9
        };
    } else if (isTablet) {
        // Compact vertical legend for tablet
        return {
            type: 'vertical',
            x: 10,
            y: height - (itemCount * 18) - 10,
            itemWidth: 120,
            itemHeight: 18,
            fontSize: 10
        };
    } else {
        // Full vertical legend for desktop
        return {
            type: 'vertical',
            x: 10,
            y: height - (itemCount * 22) - 10,
            itemWidth: 150,
            itemHeight: 22,
            fontSize: 12
        };
    }
}

// Enhanced canvas scaling for different device pixel ratios
function setupEnhancedCanvasScaling(canvas) {
    const container = canvas.parentElement;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
    
    // Get container dimensions
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Set canvas display size (CSS pixels)
    canvas.style.width = containerWidth + 'px';
    canvas.style.height = containerHeight + 'px';
    
    // Set canvas actual size (device pixels for crisp rendering)
    canvas.width = containerWidth * devicePixelRatio;
    canvas.height = containerHeight * devicePixelRatio;
    
    // Scale the drawing context to match device pixel ratio
    const ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // Enable anti-aliasing for smoother graphics
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    return { width: containerWidth, height: containerHeight, devicePixelRatio };
}

// Responsive breakpoint configuration
const responsiveBreakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
};

// Current breakpoint state
let currentBreakpoint = getCurrentBreakpoint();

// Get current breakpoint based on window width
function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width < responsiveBreakpoints.mobile) {
        return 'mobile';
    } else if (width < responsiveBreakpoints.tablet) {
        return 'tablet';
    } else if (width < responsiveBreakpoints.desktop) {
        return 'desktop';
    } else {
        return 'large-desktop';
    }
}

// Initialize responsive breakpoint detection
function initializeResponsiveBreakpointDetection() {
    // Set initial breakpoint class on body
    document.body.classList.add(`breakpoint-${currentBreakpoint}`);
    
    // Create media query listeners for each breakpoint
    const mediaQueries = {
        mobile: window.matchMedia(`(max-width: ${responsiveBreakpoints.mobile - 1}px)`),
        tablet: window.matchMedia(`(min-width: ${responsiveBreakpoints.mobile}px) and (max-width: ${responsiveBreakpoints.tablet - 1}px)`),
        desktop: window.matchMedia(`(min-width: ${responsiveBreakpoints.tablet}px) and (max-width: ${responsiveBreakpoints.desktop - 1}px)`),
        largeDesktop: window.matchMedia(`(min-width: ${responsiveBreakpoints.desktop}px)`)
    };
    
    // Add listeners for breakpoint changes
    Object.keys(mediaQueries).forEach(breakpoint => {
        mediaQueries[breakpoint].addListener((mq) => {
            if (mq.matches) {
                handleBreakpointChange(breakpoint);
            }
        });
    });
}

// Handle breakpoint changes
function handleBreakpointChange(newBreakpoint) {
    if (newBreakpoint !== currentBreakpoint) {
        // Remove old breakpoint class
        document.body.classList.remove(`breakpoint-${currentBreakpoint}`);
        
        // Add new breakpoint class
        document.body.classList.add(`breakpoint-${newBreakpoint}`);
        
        // Update current breakpoint
        const oldBreakpoint = currentBreakpoint;
        currentBreakpoint = newBreakpoint;
        
        // Trigger breakpoint change event
        const breakpointEvent = new CustomEvent('breakpointChanged', {
            detail: {
                from: oldBreakpoint,
                to: newBreakpoint,
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
        document.dispatchEvent(breakpointEvent);
        
        // Handle responsive changes
        handleResponsiveBreakpointChange();
    }
}

// Handle responsive breakpoint changes
function handleResponsiveBreakpointChange() {
    // Update dashboard grid layout
    updateDashboardGridForBreakpoint();
    
    // Update navigation layout
    updateNavigationForBreakpoint();
    
    // Update chart and visualization layouts
    updateVisualizationsForBreakpoint();
    
    // Update font sizes and spacing
    updateTypographyForBreakpoint();
    
    // Update touch targets for mobile
    updateTouchTargetsForBreakpoint();
}

// Update dashboard grid layout for current breakpoint
function updateDashboardGridForBreakpoint() {
    const dashboardGrid = document.querySelector('.dashboard-grid');
    if (!dashboardGrid) return;
    
    // Remove existing breakpoint classes
    dashboardGrid.classList.remove('mobile-layout', 'tablet-layout', 'desktop-layout', 'large-desktop-layout');
    
    // Add current breakpoint class
    dashboardGrid.classList.add(`${currentBreakpoint}-layout`);
    
    // Apply specific grid configurations
    switch (currentBreakpoint) {
        case 'mobile':
            dashboardGrid.style.gridTemplateColumns = '1fr';
            dashboardGrid.style.gap = '15px';
            break;
        case 'tablet':
            dashboardGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            dashboardGrid.style.gap = '20px';
            break;
        case 'desktop':
            dashboardGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            dashboardGrid.style.gap = '25px';
            break;
        case 'large-desktop':
            dashboardGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            dashboardGrid.style.gap = '30px';
            break;
    }
    
    // Update specific dashboard items for mobile
    if (currentBreakpoint === 'mobile') {
        const worldMap = document.querySelector('.world-map');
        if (worldMap) {
            worldMap.style.gridColumn = 'span 1';
            worldMap.style.minHeight = '250px';
        }
    }
}

// Update navigation layout for current breakpoint
function updateNavigationForBreakpoint() {
    const navigation = document.querySelector('.main-nav');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navigation || !hamburgerMenu || !navMenu) return;
    
    if (currentBreakpoint === 'mobile') {
        // Show hamburger menu for mobile
        hamburgerMenu.style.display = 'flex';
        navMenu.classList.add('mobile-nav');
        navigation.classList.add('mobile-navigation');
    } else {
        // Hide hamburger menu for larger screens
        hamburgerMenu.style.display = 'none';
        navMenu.classList.remove('mobile-nav', 'active');
        navigation.classList.remove('mobile-navigation');
        
        // Close mobile menu if it's open
        const navOverlay = document.getElementById('nav-overlay');
        if (navOverlay) {
            navOverlay.classList.remove('active');
        }
    }
}

// Update visualizations for current breakpoint
function updateVisualizationsForBreakpoint() {
    // Update all canvas-based charts
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        setupResponsiveCanvas(canvas);
        
        // Adjust chart complexity based on screen size
        if (currentBreakpoint === 'mobile') {
            canvas.classList.add('mobile-chart');
        } else {
            canvas.classList.remove('mobile-chart');
        }
    });
    
    // Update chart legends and labels
    updateChartLegendsForBreakpoint();
    
    // Update data visualization containers
    const vizContainers = document.querySelectorAll(
        '.attack-vector-container, .ai-learning-container, .network-anomaly-container'
    );
    
    vizContainers.forEach(container => {
        container.classList.remove('mobile-viz', 'tablet-viz', 'desktop-viz');
        container.classList.add(`${currentBreakpoint}-viz`);
    });
}

// Update chart legends for current breakpoint
function updateChartLegendsForBreakpoint() {
    const legends = document.querySelectorAll('.chart-legend');
    
    legends.forEach(legend => {
        if (currentBreakpoint === 'mobile') {
            legend.style.fontSize = '10px';
            legend.style.flexDirection = 'column';
            legend.style.alignItems = 'flex-start';
        } else if (currentBreakpoint === 'tablet') {
            legend.style.fontSize = '11px';
            legend.style.flexDirection = 'row';
            legend.style.flexWrap = 'wrap';
        } else {
            legend.style.fontSize = '12px';
            legend.style.flexDirection = 'row';
            legend.style.flexWrap = 'nowrap';
        }
    });
}

// Update typography for current breakpoint
function updateTypographyForBreakpoint() {
    const root = document.documentElement;
    
    switch (currentBreakpoint) {
        case 'mobile':
            root.style.setProperty('--base-font-size', '14px');
            root.style.setProperty('--heading-scale', '0.9');
            root.style.setProperty('--line-height', '1.4');
            break;
        case 'tablet':
            root.style.setProperty('--base-font-size', '15px');
            root.style.setProperty('--heading-scale', '1.0');
            root.style.setProperty('--line-height', '1.5');
            break;
        case 'desktop':
            root.style.setProperty('--base-font-size', '16px');
            root.style.setProperty('--heading-scale', '1.1');
            root.style.setProperty('--line-height', '1.6');
            break;
        case 'large-desktop':
            root.style.setProperty('--base-font-size', '17px');
            root.style.setProperty('--heading-scale', '1.2');
            root.style.setProperty('--line-height', '1.6');
            break;
    }
}

// Update touch targets for current breakpoint
function updateTouchTargetsForBreakpoint() {
    const interactiveElements = document.querySelectorAll(
        'button, .dashboard-item, .nav-menu a, .control-buttons button'
    );
    
    interactiveElements.forEach(element => {
        if (currentBreakpoint === 'mobile') {
            // Ensure minimum touch target size for mobile
            const rect = element.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                element.style.minWidth = '44px';
                element.style.minHeight = '44px';
                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            }
        } else {
            // Reset touch target adjustments for larger screens
            element.style.minWidth = '';
            element.style.minHeight = '';
        }
    });
}

// Update threat feed with new data using Turkish localization
function updateThreatFeed() {
    const threatFeed = document.getElementById('threat-feed');
    if (!threatFeed) return;
    
    // Generate a random new threat with Turkish localization
    const currentTime = new Date();
    const threatTypes = [
        {
            type: turkishLocalization.threatCategories.can_bus,
            details: 'Yeni CAN Bus anomalisi tespit edildi. Araç güvenlik protokolü devreye alındı.',
            severity: 'high',
            status: turkishLocalization.statusIndicators.investigating
        },
        {
            type: turkishLocalization.threatCategories.gps_spoofing,
            details: 'GPS sinyal manipülasyonu girişimi tespit edildi. Alternatif navigasyon aktif.',
            severity: 'medium',
            status: turkishLocalization.statusIndicators.mitigated
        },
        {
            type: turkishLocalization.threatCategories.ota_compromise,
            details: 'OTA güncelleme güvenlik doğrulaması tamamlandı. Sistem güncel.',
            severity: 'low',
            status: turkishLocalization.statusIndicators.resolved
        },
        {
            type: 'Sistem Güncellemesi',
            details: 'Araç güvenlik sistemleri güncellendi. Yeni tehdit imzaları aktif.',
            severity: 'info',
            status: turkishLocalization.statusIndicators.active
        }
    ];
    
    const randomThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    const vehicleId = `AV-${1000 + Math.floor(Math.random() * 9000)}`;
    const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    // Add a new threat item at the top
    const newThreat = document.createElement('div');
    newThreat.className = `threat-item ${randomThreat.severity}`;
    newThreat.style.opacity = '0';
    newThreat.style.transform = 'translateY(-20px)';
    
    const formattedTime = formatTurkishTime(currentTime);
    const fullTimestamp = formatTurkishDateTime(currentTime);
    const severityText = turkishLocalization.severityLevels[randomThreat.severity] || randomThreat.severity.toUpperCase();
    
    newThreat.innerHTML = `
        <div class="threat-header">
            <span class="threat-type">${randomThreat.type}</span>
            <span class="threat-time" title="${fullTimestamp}">Şimdi</span>
        </div>
        <div class="threat-details">${randomThreat.details}</div>
        <div class="threat-location">
            <i class="fas fa-map-marker-alt"></i> ${vehicleId}, ${randomCity}
        </div>
        <div class="threat-footer">
            <div class="threat-severity severity-${randomThreat.severity}">
                <i class="fas fa-shield-alt"></i>
                ${severityText}
            </div>
            <div class="threat-status status-${randomThreat.severity}">
                <i class="fas fa-info-circle"></i>
                ${randomThreat.status}
            </div>
        </div>
    `;
    
    threatFeed.insertBefore(newThreat, threatFeed.firstChild);
    
    // Animate in
    setTimeout(() => {
        newThreat.style.transition = 'all 0.3s ease';
        newThreat.style.opacity = '1';
        newThreat.style.transform = 'translateY(0)';
    }, 100);
    
    // Update timestamps of existing items
    const existingItems = threatFeed.querySelectorAll('.threat-item .threat-time');
    existingItems.forEach((timeElement, index) => {
        if (index > 0) { // Skip the newly added item
            const minutesAgo = index * 2 + Math.floor(Math.random() * 5);
            const oldTimestamp = new Date(currentTime - minutesAgo * 60 * 1000);
            timeElement.textContent = formatTurkishRelativeTime(oldTimestamp);
            timeElement.title = formatTurkishDateTime(oldTimestamp);
        }
    });
    
    // Remove oldest item if too many
    const threatItems = threatFeed.querySelectorAll('.threat-item');
    if (threatItems.length > 10) {
        const oldestItem = threatItems[threatItems.length - 1];
        oldestItem.style.transition = 'all 0.3s ease';
        oldestItem.style.opacity = '0';
        oldestItem.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            if (oldestItem.parentNode) {
                oldestItem.parentNode.removeChild(oldestItem);
            }
        }, 300);
    }
}

// Initialize responsive navigation system
function initializeResponsiveNavigation() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!hamburgerMenu || !navMenu || !navOverlay) return;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // Open mobile menu
    function openMobileMenu() {
        hamburgerMenu.classList.add('active');
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        navOverlay.style.display = 'block';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleEscapeKey);
        
        // Hide overlay after transition
        setTimeout(() => {
            if (!navOverlay.classList.contains('active')) {
                navOverlay.style.display = 'none';
            }
        }, 300);
    }
    
    // Handle escape key
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }
    
    // Event listeners
    hamburgerMenu.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Handle window resize - close menu if switching to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
    
    // Handle touch events for better mobile experience
    let touchStartY = 0;
    let touchEndY = 0;
    
    navMenu.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    navMenu.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        
        // Close menu on swipe right (if swiping from left edge)
        const swipeDistance = touchEndY - touchStartY;
        if (Math.abs(swipeDistance) < 50 && e.changedTouches[0].screenX < 50) {
            closeMobileMenu();
        }
    });
}

// Add system status indicator to header
function addSystemStatusIndicator() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (!header || !nav) return;
    
    const systemStatus = document.createElement('div');
    systemStatus.className = 'system-status';
    systemStatus.innerHTML = `
        <div class="status-dot"></div>
        <span class="system-status-text">Sistem Çevrimiçi</span>
    `;
    
    header.insertBefore(systemStatus, nav);
}

// Initialize notification system
function initializeNotificationSystem() {
    // Show welcome notification
    showNotification({
        type: 'info',
        icon: 'fa-shield-alt',
        title: 'Singularity SOC Kontrol Paneli Başlatıldı',
        message: 'Araç güvenlik operasyon merkezi artık tüm bağlı filo araçlarını izliyor.',
        duration: 5000
    });
    
    // Add data flow specific notification
    setTimeout(() => {
        showNotification({
            type: 'success',
            icon: 'fa-exchange-alt',
            title: 'Veri Akış Hattı Aktif',
            message: 'Tüm veri işleme aşamaları optimal kapasitede çalışıyor. Anonimleştirme ve ML profilleme tamamen operasyonel.',
            duration: 7000
        });
        
        // Offer a tour of the data flow architecture
        setTimeout(() => {
            showDataFlowTour();
        }, 2000);
    }, 8000);
}

// Show data flow architecture tour
function showDataFlowTour() {
    // Create a tour notification that's more persistent
    const notification = showNotification({
        type: 'info',
        icon: 'fa-route',
        title: 'Yeni Özellik: Veri Akış Mimarisi',
        message: 'Yeni veri işleme hattı görselleştirmemizin hızlı turunu yapmak ister misiniz?',
        duration: 60000 // Long duration
    });
    
    if (!notification) return;
    
    // Add tour buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'notification-buttons';
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.gap = '10px';
    buttonsDiv.style.marginTop = '10px';
    
    const takeTourButton = document.createElement('button');
    takeTourButton.className = 'notification-button primary';
    takeTourButton.textContent = 'Turu Başlat';
    takeTourButton.style.padding = '5px 10px';
    takeTourButton.style.background = 'var(--gradient-primary)';
    takeTourButton.style.border = 'none';
    takeTourButton.style.borderRadius = '4px';
    takeTourButton.style.color = 'white';
    takeTourButton.style.cursor = 'pointer';
    
    const skipButton = document.createElement('button');
    skipButton.className = 'notification-button';
    skipButton.textContent = 'Atla';
    skipButton.style.padding = '5px 10px';
    skipButton.style.background = 'transparent';
    skipButton.style.border = '1px solid var(--text-muted)';
    skipButton.style.borderRadius = '4px';
    skipButton.style.color = 'var(--text-muted)';
    skipButton.style.cursor = 'pointer';
    
    buttonsDiv.appendChild(takeTourButton);
    buttonsDiv.appendChild(skipButton);
    
    const content = notification.querySelector('.notification-content');
    content.appendChild(buttonsDiv);
    
    // Handle tour button clicks
    takeTourButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Don't close the notification
        removeNotification(notification);
        startDataFlowTour();
    });
    
    skipButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Don't close the notification
        removeNotification(notification);
    });
}

// Start the data flow tour
function startDataFlowTour() {
    // Scroll to the data flow section
    const dataFlowSection = document.getElementById('data-flow');
    if (!dataFlowSection) return;
    
    dataFlowSection.scrollIntoView({ behavior: 'smooth' });
    
    // Tour steps for each component of the data flow
    const tourSteps = [
        {
            target: '.data-sources',
            title: 'Veri Kaynakları',
            message: 'Güvenlik verileri üç ana kaynaktan toplanır: araçlar, uygulama sunucuları ve mobil uygulamalar.'
        },
        {
            target: '.anonymization-stage',
            title: 'Anonimleştirme ve Normalleştirme',
            message: 'Ham veriler gizliliği korumak için anonimleştirilirken güvenlik analizi yetenekleri korunur.'
        },
        {
            target: '.big-data-stage',
            title: 'Büyük Veri İşleme',
            message: 'Normalleştirilmiş veriler veritabanlarında işlenir ve düzenlenir, bağlamsal analiz için dijital ikizler oluşturulur.'
        },
        {
            target: '.ml-stage',
            title: 'Makine Öğrenmesi Profilleme',
            message: 'Gelişmiş ML modelleri anomalileri tespit etmek için bireysel araç, grup ve hizmet seviyelerinde veri analizi yapar.'
        },
        {
            target: '.security-engines-stage',
            title: 'Güvenlik Motorları',
            message: 'Singularity Tehdit istihbaratı ile özelleşmiş güvenlik motorları potansiyel tehditleri tanımlar ve analiz eder.'
        },
        {
            target: '.siem-display',
            title: 'Araç-SOC SIEM',
            message: 'Tüm işlenmiş veriler ve güvenlik olayları Güvenlik Bilgi ve Olay Yönetimi sisteminde toplanır.'
        },
        {
            target: '.data-flow-stats',
            title: 'Gerçek Zamanlı Hat Metrikleri',
            message: 'Anahtar performans göstergeleri tüm güvenlik veri hattının sağlığını ve etkinliğini gösterir.'
        }
    ];
    
    // Run tour steps in sequence
    let currentStep = 0;
    
    function showTourStep() {
        if (currentStep >= tourSteps.length) {
            // Tour complete
            showNotification({
                type: 'success',
                icon: 'fa-check-circle',
                title: 'Tur Tamamlandı',
                message: 'Artık çok aşamalı veri işleme hattımızın araç filonuzu nasıl koruduğunu anlıyorsunuz.',
                duration: 5000
            });
            return;
        }
        
        const step = tourSteps[currentStep];
        const target = document.querySelector(step.target);
        
        if (!target) {
            currentStep++;
            showTourStep();
            return;
        }
        
        // Highlight the target element
        target.classList.add('tour-highlight');
        const previousTarget = currentStep > 0 ? document.querySelector(tourSteps[currentStep - 1].target) : null;
        if (previousTarget) {
            previousTarget.classList.remove('tour-highlight');
        }
        
        // Show step information
        const notification = showNotification({
            type: 'info',
            icon: 'fa-info-circle',
            title: `${currentStep + 1}/${tourSteps.length}: ${step.title}`,
            message: step.message,
            duration: 60000 // Long duration during tour
        });
        
        // Add navigation buttons
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'tour-buttons';
        buttonsDiv.style.display = 'flex';
        buttonsDiv.style.gap = '10px';
        buttonsDiv.style.marginTop = '10px';
        
        // Only show back button if not the first step
        if (currentStep > 0) {
            const backButton = document.createElement('button');
            backButton.textContent = 'Geri';
            backButton.style.padding = '5px 10px';
            backButton.style.background = 'transparent';
            backButton.style.border = '1px solid var(--text-muted)';
            backButton.style.borderRadius = '4px';
            backButton.style.color = 'var(--text-muted)';
            backButton.style.cursor = 'pointer';
            
            backButton.addEventListener('click', (e) => {
                e.stopPropagation();
                removeNotification(notification);
                target.classList.remove('tour-highlight');
                currentStep--;
                showTourStep();
            });
            
            buttonsDiv.appendChild(backButton);
        }
        
        // Next or Finish button
        const nextButton = document.createElement('button');
        nextButton.textContent = currentStep < tourSteps.length - 1 ? 'İleri' : 'Bitir';
        nextButton.style.padding = '5px 10px';
        nextButton.style.background = 'var(--gradient-primary)';
        nextButton.style.border = 'none';
        nextButton.style.borderRadius = '4px';
        nextButton.style.color = 'white';
        nextButton.style.cursor = 'pointer';
        
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            removeNotification(notification);
            currentStep++;
            showTourStep();
        });
        
        buttonsDiv.appendChild(nextButton);
        
        // Skip button
        const skipButton = document.createElement('button');
        skipButton.textContent = 'Turu Atla';
        skipButton.style.padding = '5px 10px';
        skipButton.style.background = 'transparent';
        skipButton.style.border = 'none';
        skipButton.style.color = 'var(--text-muted)';
        skipButton.style.cursor = 'pointer';
        
        skipButton.addEventListener('click', (e) => {
            e.stopPropagation();
            removeNotification(notification);
            target.classList.remove('tour-highlight');
            // Remove highlight from all elements
            document.querySelectorAll('.tour-highlight').forEach(el => {
                el.classList.remove('tour-highlight');
            });
            // Show tour complete message
            showNotification({
                type: 'info',
                icon: 'fa-info-circle',
                title: 'Tur Sonlandı',
                message: 'Veri akış bölümünü her zaman kendi hızınızda keşfedebilirsiniz.',
                duration: 5000
            });
        });
        
        buttonsDiv.appendChild(skipButton);
        
        const content = notification.querySelector('.notification-content');
        content.appendChild(buttonsDiv);
    }
    
    // Add tour highlight styles
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .tour-highlight {
            box-shadow: 0 0 0 4px var(--accent) !important;
            position: relative;
            z-index: 100;
            transition: box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Start the tour after scrolling to section
    setTimeout(() => {
        showTourStep();
    }, 1000);
}

// Show notification
function showNotification(options) {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${options.type || 'info'}`;
    
    // Add severity badge if available
    const severityBadge = options.severity ? 
        `<span class="severity-badge ${options.type}">${options.severity}</span>` : '';
    
    // Add category badge if available
    const categoryBadge = options.category ? 
        `<span class="category-badge">${options.category}</span>` : '';
    
    // Add timestamp if available
    const timestampDisplay = options.timestamp ? 
        `<div class="notification-timestamp">${options.timestamp}</div>` : '';
    
    notification.innerHTML = `
        <i class="fas ${options.icon || 'fa-info-circle'} notification-icon"></i>
        <div class="notification-content">
            <div class="notification-header">
                <div class="notification-title">${options.title || 'Bildirim'}</div>
                <div class="notification-badges">
                    ${severityBadge}
                    ${categoryBadge}
                </div>
            </div>
            <div class="notification-message">${options.message || ''}</div>
            ${timestampDisplay}
        </div>
        <button class="notification-close" title="Bildirimi kapat">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        removeNotification(notification);
    });
    
    // Auto remove after duration (longer for critical alerts)
    const baseDuration = options.duration || 10000;
    const severityMultiplier = options.type === 'critical' ? 1.5 : 
                              options.type === 'high' ? 1.2 : 1;
    const duration = baseDuration * severityMultiplier;
    
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
    
    // Add click to dismiss
    notification.addEventListener('click', function() {
        removeNotification(notification);
    });
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add sound notification for critical and high severity alerts
    if (options.type === 'critical' || options.type === 'high') {
        playNotificationSound(options.type);
    }
    
    return notification;
}

// Play notification sound for critical alerts
function playNotificationSound(severity) {
    // Create audio context for notification sounds
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        try {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different tones for different severity levels
            if (severity === 'critical') {
                // Higher pitch, more urgent sound for critical alerts
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
            } else if (severity === 'high') {
                // Medium pitch for high severity
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.1);
            }
            
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            // Silently fail if audio context is not available
            console.debug('Audio notification not available:', error);
        }
    }
}

// Remove notification
function removeNotification(notification) {
    notification.classList.remove('show');
    
    // Remove from DOM after transition
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Turkish localization for threat notifications and security alerts
const turkishLocalization = {
    severityLevels: {
        'critical': 'Kritik',
        'high': 'Yüksek',
        'medium': 'Orta', 
        'low': 'Düşük',
        'info': 'Bilgi',
        'success': 'Başarılı',
        'warning': 'Uyarı'
    },
    statusIndicators: {
        'active': 'Aktif',
        'resolved': 'Çözüldü',
        'investigating': 'Araştırılıyor',
        'mitigated': 'Etkisizleştirildi',
        'pending': 'Beklemede',
        'escalated': 'Yükseltildi',
        'closed': 'Kapatıldı',
        'monitoring': 'İzleniyor'
    },
    threatCategories: {
        'can_bus': 'CAN Bus Saldırısı',
        'gps_spoofing': 'GPS Sahteciliği',
        'ecu_tampering': 'ECU Kurcalama',
        'v2x_attack': 'V2X Saldırısı',
        'ota_compromise': 'OTA Güvenlik İhlali',
        'sensor_manipulation': 'Sensör Manipülasyonu',
        'fleet_breach': 'Filo Sistemi İhlali',
        'botnet': 'Botnet Aktivitesi',
        'malware': 'Kötü Yazılım',
        'authentication': 'Kimlik Doğrulama',
        'encryption': 'Şifreleme İhlali',
        'vulnerability': 'Güvenlik Açığı'
    }
};

// Enhanced Turkish localization object with additional categories
Object.assign(turkishLocalization, {
    dashboardLabels: {
        'globalFleetMap': 'Küresel Filo Haritası',
        'vehicleSystemsMonitor': 'Araç Sistemleri İzleyicisi',
        'securityIncidents': 'Güvenlik Olayları',
        'regulatoryCompliance': 'Mevzuat Uyumluluğu',
        'aiModelPerformance': 'YZ Model Performansı',
        'vehicleSecurityAgents': 'Araç Güvenlik Ajanları',
        'attackVectorDistribution': 'Saldırı Vektörü Dağılımı',
        'weatherIntelligence': 'Hava Durumu İstihbaratı',
        'canBusAnalysis': 'CAN Bus Analizi',
        'keySecurityMetrics': 'Temel Güvenlik Metrikleri',
        'vehicleAlerts': 'Araç Uyarıları',
        'securityAgentPerformance': 'Güvenlik Ajanı Performansı'
    },
    chartLabels: {
        'accuracy': 'Doğruluk',
        'precision': 'Kesinlik',
        'recall': 'Geri Çağırma',
        'f1Score': 'F1 Skoru',
        'falsePositives': 'Yanlış Pozitifler',
        'truePositives': 'Doğru Pozitifler',
        'detectionRate': 'Tespit Oranı',
        'responseTime': 'Yanıt Süresi'
    },
    timeLabels: {
        'now': 'Şimdi',
        'minutesAgo': 'dakika önce',
        'hoursAgo': 'saat önce',
        'daysAgo': 'gün önce',
        'weeksAgo': 'hafta önce',
        'monthsAgo': 'ay önce',
        'today': 'Bugün',
        'yesterday': 'Dün',
        'thisWeek': 'Bu Hafta',
        'lastWeek': 'Geçen Hafta',
        'thisMonth': 'Bu Ay',
        'lastMonth': 'Geçen Ay'
    },
    actionLabels: {
        'investigate': 'İncele',
        'mitigate': 'Hafiflet',
        'resolve': 'Çöz',
        'monitor': 'İzle',
        'escalate': 'Yükselt',
        'dismiss': 'Reddet',
        'acknowledge': 'Onayla',
        'update': 'Güncelle'
    },
    navigationLabels: {
        'vehicleSOC': 'Araç SOC',
        'dataFlow': 'Veri Akışı',
        'features': 'Özellikler',
        'about': 'Hakkında',
        'contact': 'İletişim',
        'dashboard': 'Kontrol Paneli',
        'analytics': 'Analitik',
        'reports': 'Raporlar',
        'settings': 'Ayarlar'
    },
    systemComponents: {
        'engine': 'Motor Kontrol Ünitesi',
        'brakes': 'Fren Sistemi',
        'steering': 'Direksiyon Sistemi',
        'transmission': 'Şanzıman',
        'airbag': 'Hava Yastığı Sistemi',
        'adas': 'İleri Sürücü Destek Sistemleri',
        'infotainment': 'Bilgi-Eğlence Sistemi',
        'telematics': 'Telematik Sistemi'
    }
});

// Enhanced Turkish localization functions for dynamic content
function getLocalizedText(category, key, fallback = '') {
    try {
        if (turkishLocalization[category] && turkishLocalization[category][key]) {
            return turkishLocalization[category][key];
        }
        return fallback || key;
    } catch (error) {
        console.warn('Localization error:', error);
        return fallback || key;
    }
}

// Generate localized dynamic content
function generateLocalizedContent(contentType, data = {}) {
    switch (contentType) {
        case 'threatNotification':
            return generateThreatNotificationContent(data);
        case 'systemStatus':
            return generateSystemStatusContent(data);
        case 'performanceMetric':
            return generatePerformanceMetricContent(data);
        case 'alertMessage':
            return generateAlertMessageContent(data);
        default:
            return data.message || '';
    }
}

// Generate threat notification content in Turkish
function generateThreatNotificationContent(data) {
    const threatType = getLocalizedText('threatCategories', data.type, data.type);
    const severity = getLocalizedText('severityLevels', data.severity, data.severity);
    const status = getLocalizedText('statusIndicators', data.status, data.status);
    const vehicleId = data.vehicleId || `AV-${Math.floor(Math.random() * 9000) + 1000}`;
    const location = data.location || 'Bilinmeyen Konum';
    
    const templates = [
        `${threatType} tespit edildi. Araç ${vehicleId} için ${severity.toLowerCase()} seviye tehdit. Durum: ${status}`,
        `${vehicleId} aracında ${threatType} anomalisi. Güvenlik seviyesi: ${severity}. ${status} durumunda.`,
        `Güvenlik uyarısı: ${location} konumunda ${threatType}. Araç: ${vehicleId}. Öncelik: ${severity}`,
        `${threatType} için otomatik müdahale başlatıldı. Araç ${vehicleId} güvenlik protokolü aktif. Durum: ${status}`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}

// Generate system status content in Turkish
function generateSystemStatusContent(data) {
    const component = getLocalizedText('systemComponents', data.component, data.component);
    const status = data.status || 'normal';
    
    const statusMessages = {
        'normal': `${component} normal çalışıyor`,
        'warning': `${component} uyarı durumunda`,
        'error': `${component} hata bildiriyor`,
        'offline': `${component} çevrimdışı`,
        'maintenance': `${component} bakım modunda`
    };
    
    return statusMessages[status] || `${component} durumu: ${status}`;
}

// Generate performance metric content in Turkish
function generatePerformanceMetricContent(data) {
    const metric = getLocalizedText('chartLabels', data.metric, data.metric);
    const value = data.value;
    const trend = data.trend || 'stable';
    
    let formattedValue;
    if (typeof value === 'number') {
        if (data.isPercentage) {
            formattedValue = formatTurkishPercentage(value / 100, 1);
        } else if (data.isCurrency) {
            formattedValue = formatTurkishCurrency(value);
        } else {
            formattedValue = formatTurkishNumber(value);
        }
    } else {
        formattedValue = value;
    }
    
    const trendMessages = {
        'increasing': 'artış gösteriyor',
        'decreasing': 'azalış gösteriyor',
        'stable': 'sabit kalıyor',
        'volatile': 'dalgalanma gösteriyor'
    };
    
    const trendText = trendMessages[trend] || '';
    
    return `${metric}: ${formattedValue} ${trendText ? `(${trendText})` : ''}`;
}

// Generate alert message content in Turkish
function generateAlertMessageContent(data) {
    const action = getLocalizedText('actionLabels', data.action, data.action);
    const component = data.component || 'sistem';
    const timestamp = data.timestamp ? formatTurkishDateTime(new Date(data.timestamp)) : formatTurkishDateTime(new Date());
    
    return `${action} işlemi ${component} için ${timestamp} tarihinde gerçekleştirildi.`;
}

// Update dynamic content with Turkish localization
function updateDynamicContentWithTurkish() {
    // Update dashboard section headers
    const dashboardSections = document.querySelectorAll('[data-section]');
    dashboardSections.forEach(section => {
        const sectionKey = section.getAttribute('data-section');
        const localizedTitle = getLocalizedText('dashboardLabels', sectionKey);
        if (localizedTitle) {
            const titleElement = section.querySelector('.section-title, h3, h4');
            if (titleElement) {
                titleElement.textContent = localizedTitle;
            }
        }
    });
    
    // Update navigation labels
    const navLinks = document.querySelectorAll('[data-nav]');
    navLinks.forEach(link => {
        const navKey = link.getAttribute('data-nav');
        const localizedLabel = getLocalizedText('navigationLabels', navKey);
        if (localizedLabel) {
            link.textContent = localizedLabel;
        }
    });
    
    // Update chart labels
    const chartLabels = document.querySelectorAll('[data-chart-label]');
    chartLabels.forEach(label => {
        const labelKey = label.getAttribute('data-chart-label');
        const localizedLabel = getLocalizedText('chartLabels', labelKey);
        if (localizedLabel) {
            label.textContent = localizedLabel;
        }
    });
    
    // Update action buttons
    const actionButtons = document.querySelectorAll('[data-action]');
    actionButtons.forEach(button => {
        const actionKey = button.getAttribute('data-action');
        const localizedAction = getLocalizedText('actionLabels', actionKey);
        if (localizedAction) {
            button.textContent = localizedAction;
        }
    });
}

// Turkish date and time formatting functions
function formatTurkishDateTime(date = new Date()) {
    return date.toLocaleString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Istanbul'
    });
}

function formatTurkishDate(date = new Date()) {
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Istanbul'
    });
}

function formatTurkishTime(date = new Date()) {
    return date.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Istanbul'
    });
}

function formatTurkishRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Şimdi';
    if (diffMins < 60) return `${diffMins} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays < 7) return `${diffDays} gün önce`;
    
    return formatTurkishDate(date);
}

// Turkish number formatting functions
function formatTurkishNumber(number, options = {}) {
    const {
        minimumFractionDigits = 0,
        maximumFractionDigits = 2,
        useGrouping = true
    } = options;
    
    return new Intl.NumberFormat('tr-TR', {
        minimumFractionDigits,
        maximumFractionDigits,
        useGrouping
    }).format(number);
}

function formatTurkishCurrency(amount, currency = 'TRY') {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function formatTurkishPercentage(value, decimals = 1) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value / 100);
}

function formatTurkishDecimal(number, decimals = 2) {
    return new Intl.NumberFormat('tr-TR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: true
    }).format(number);
}

function formatTurkishMeasurement(value, unit, decimals = 1) {
    const formattedValue = formatTurkishDecimal(value, decimals);
    
    // Turkish measurement unit translations
    const unitTranslations = {
        'km': 'km',
        'km/h': 'km/sa',
        'mph': 'mil/sa',
        'm': 'm',
        'cm': 'cm',
        'mm': 'mm',
        'kg': 'kg',
        'g': 'g',
        'lb': 'libre',
        'oz': 'ons',
        '°C': '°C',
        '°F': '°F',
        'V': 'V',
        'A': 'A',
        'W': 'W',
        'kW': 'kW',
        'kWh': 'kWh',
        'bar': 'bar',
        'psi': 'psi',
        'rpm': 'dev/dk',
        'Hz': 'Hz',
        'kHz': 'kHz',
        'MHz': 'MHz',
        'GHz': 'GHz',
        'MB': 'MB',
        'GB': 'GB',
        'TB': 'TB',
        'Mbps': 'Mbps',
        'Gbps': 'Gbps',
        'ms': 'ms',
        's': 's',
        'min': 'dk',
        'h': 'sa'
    };
    
    const translatedUnit = unitTranslations[unit] || unit;
    return `${formattedValue} ${translatedUnit}`;
}

function formatTurkishFileSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    
    return `${formatTurkishDecimal(size, unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function formatTurkishLargeNumber(number) {
    if (number >= 1000000000) {
        return formatTurkishDecimal(number / 1000000000, 1) + ' milyar';
    } else if (number >= 1000000) {
        return formatTurkishDecimal(number / 1000000, 1) + ' milyon';
    } else if (number >= 1000) {
        return formatTurkishDecimal(number / 1000, 1) + ' bin';
    } else {
        return formatTurkishNumber(number);
    }
}

// Update existing numbers on page to use Turkish formatting
function updateExistingNumbersToTurkish() {
    // Update stat values in dashboard
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(element => {
        const text = element.textContent.trim();
        
        // Handle percentages
        if (text.includes('%')) {
            const numMatch = text.match(/(\d+(?:\.\d+)?)/);
            if (numMatch) {
                const value = parseFloat(numMatch[1]);
                element.textContent = formatTurkishPercentage(value, value % 1 === 0 ? 0 : 1);
            }
        }
        // Handle large numbers with suffixes
        else if (text.includes('M') || text.includes('K') || text.includes('B')) {
            // Keep the existing format but ensure proper Turkish decimal separator
            const numMatch = text.match(/(\d+(?:\.\d+)?)/);
            if (numMatch) {
                const value = parseFloat(numMatch[1]);
                if (text.includes('M')) {
                    element.textContent = formatTurkishDecimal(value, 1) + 'M';
                } else if (text.includes('K')) {
                    element.textContent = formatTurkishDecimal(value, 1) + 'K';
                } else if (text.includes('B')) {
                    element.textContent = formatTurkishDecimal(value, 1) + 'B';
                }
            }
        }
        // Handle regular numbers
        else if (/^\d+$/.test(text)) {
            const value = parseInt(text);
            element.textContent = formatTurkishNumber(value);
        }
        // Handle decimal numbers
        else if (/^\d+\.\d+$/.test(text)) {
            const value = parseFloat(text);
            element.textContent = formatTurkishDecimal(value, 2);
        }
    });
    
    // Update performance metrics percentages
    const performancePercentages = document.querySelectorAll('.metric-percentage');
    performancePercentages.forEach(element => {
        const text = element.textContent.trim();
        const numMatch = text.match(/(\d+(?:\.\d+)?)/);
        if (numMatch) {
            const value = parseFloat(numMatch[1]);
            element.textContent = formatTurkishPercentage(value, 1);
        }
    });
    
    // Update data flow statistics
    const dataFlowStats = document.querySelectorAll('#data-sources-count, #events-processed, #ml-accuracy, #threats-identified');
    dataFlowStats.forEach(element => {
        const text = element.textContent.trim();
        
        if (element.id === 'ml-accuracy') {
            const numMatch = text.match(/(\d+(?:\.\d+)?)/);
            if (numMatch) {
                const value = parseFloat(numMatch[1]);
                element.textContent = formatTurkishPercentage(value, 1);
            }
        } else if (element.id === 'events-processed') {
            const numMatch = text.match(/(\d+(?:\.\d+)?)/);
            if (numMatch) {
                const value = parseFloat(numMatch[1]);
                element.textContent = formatTurkishDecimal(value, 1) + 'M';
            }
        } else {
            const numMatch = text.match(/(\d+)/);
            if (numMatch) {
                const value = parseInt(numMatch[1]);
                element.textContent = formatTurkishNumber(value);
            }
        }
    });
}

// Apply Turkish formatting classes to elements
function applyTurkishFormattingClasses() {
    // Apply Turkish number formatting classes to relevant elements
    const numberElements = document.querySelectorAll(
        '.stat-value, .threat-stats .stat-value, .data-flow-stats .stat-value, ' +
        '.performance-metrics .metric-percentage, .ai-agent-metrics .agent-metric-value, ' +
        '.compliance-score, .chart-tooltip .tooltip-content'
    );
    
    numberElements.forEach(element => {
        const text = element.textContent;
        if (text.includes('%')) {
            element.classList.add('turkish-percentage');
        } else if (text.includes('₺') || text.includes('TRY') || text.includes('EUR') || text.includes('USD')) {
            element.classList.add('turkish-currency');
        } else if (/\d/.test(text)) {
            element.classList.add('turkish-number');
        }
        element.classList.add('turkish-text');
    });
    
    // Apply Turkish text class to all text elements
    const textElements = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, span, div, label, button, .dashboard-header h3, ' +
        '.threat-type, .threat-details, .notification-message, .tooltip-title'
    );
    
    textElements.forEach(element => {
        element.classList.add('turkish-text');
    });
}

// Enhanced threat notification function with Turkish localization
function showRandomThreatNotification() {
    const currentTime = new Date();
    const formattedTime = formatTurkishTime(currentTime);
    const formattedDateTime = formatTurkishDateTime(currentTime);
    
    const threats = [
        // Critical severity threats
        {
            type: 'critical',
            icon: 'fa-exclamation-triangle',
            title: 'KRİTİK: Koordineli Siber Saldırı Tespit Edildi',
            message: `${formattedTime} - Türkiye genelinde 47 araçta eş zamanlı CAN Bus sızma girişimi tespit edildi. Ulusal güvenlik protokolü devreye alındı. Durum: ${turkishLocalization.statusIndicators.investigating}`,
            duration: 10000,
            severity: turkishLocalization.severityLevels.critical,
            category: turkishLocalization.threatCategories.can_bus,
            timestamp: formattedDateTime
        },
        {
            type: 'critical',
            icon: 'fa-radiation',
            title: 'KRİTİK: Filo Geneli ECU Firmware Saldırısı',
            message: `${formattedTime} - 156 araçta yetkisiz firmware değişikliği tespit edildi. Acil durum protokolü aktif. Tüm etkilenen araçlar güvenli konuma yönlendiriliyor. Durum: ${turkishLocalization.statusIndicators.active}`,
            duration: 12000,
            severity: turkishLocalization.severityLevels.critical,
            category: turkishLocalization.threatCategories.ecu_tampering,
            timestamp: formattedDateTime
        },
        
        // High severity threats
        {
            type: 'high',
            icon: 'fa-satellite',
            title: 'YÜKSEK: GPS Sahteciliği Saldırısı - İstanbul',
            message: `${formattedTime} - İstanbul Boğaziçi bölgesinde 23 otonom araçta GPS koordinat manipülasyonu tespit edildi. Alternatif navigasyon sistemleri devreye alındı. Durum: ${turkishLocalization.statusIndicators.mitigated}`,
            duration: 8000,
            severity: turkishLocalization.severityLevels.high,
            category: turkishLocalization.threatCategories.gps_spoofing,
            timestamp: formattedDateTime
        },
        {
            type: 'high',
            icon: 'fa-network-wired',
            title: 'YÜKSEK: V2X İletişim Güvenliği İhlali - Ankara',
            message: `${formattedTime} - Ankara merkez bölgesinde V2I (Araç-Altyapı) kimlik doğrulama protokolünde anomali. 12 trafik ışığı sistemi izole edildi. Durum: ${turkishLocalization.statusIndicators.investigating}`,
            duration: 8000,
            severity: turkishLocalization.severityLevels.high,
            category: turkishLocalization.threatCategories.v2x_attack,
            timestamp: formattedDateTime
        },
        {
            type: 'high',
            icon: 'fa-wifi',
            title: 'YÜKSEK: Bağlı Araç Botnet Ağı - Türkiye',
            message: `${formattedTime} - Türkiye genelinde 89 bağlı araçta koordineli botnet aktivitesi tespit edildi. Anormal veri trafiği engellendi. Güvenlik yaması hazırlanıyor. Durum: ${turkishLocalization.statusIndicators.monitoring}`,
            duration: 8000,
            severity: turkishLocalization.severityLevels.high,
            category: turkishLocalization.threatCategories.botnet,
            timestamp: formattedDateTime
        },
        {
            type: 'high',
            icon: 'fa-key',
            title: 'YÜKSEK: Filo Yönetim Sistemi Güvenlik İhlali - Bursa',
            message: `${formattedTime} - Bursa bölgesi filo yönetim sistemine yetkisiz erişim girişimi tespit edildi. Çok faktörlü kimlik doğrulama devreye alındı. Durum: ${turkishLocalization.statusIndicators.escalated}`,
            duration: 8000,
            severity: turkishLocalization.severityLevels.high,
            category: turkishLocalization.threatCategories.fleet_breach,
            timestamp: formattedDateTime
        },
        
        // Medium severity threats
        {
            type: 'medium',
            icon: 'fa-car-crash',
            title: 'ORTA: Sensör Veri Manipülasyonu - İzmir',
            message: `${formattedTime} - İzmir Konak bölgesinde 7 araçta LiDAR ve kamera sensörü veri tutarsızlığı. Çevresel manipülasyon girişimi mümkün. Gelişmiş doğrulama aktif. Durum: ${turkishLocalization.statusIndicators.monitoring}`,
            duration: 6500,
            severity: turkishLocalization.severityLevels.medium,
            category: turkishLocalization.threatCategories.sensor_manipulation,
            timestamp: formattedDateTime
        },
        {
            type: 'medium',
            icon: 'fa-broadcast-tower',
            title: 'ORTA: Telematik Komut Geçersiz Kılma - Antalya',
            message: `${formattedTime} - Antalya bölgesinde 4 araçta yetkisiz telematik komutu tespit edildi. Dijital imza doğrulaması başarısız. Komutlar reddedildi. Durum: ${turkishLocalization.statusIndicators.resolved}`,
            duration: 7000,
            severity: turkishLocalization.severityLevels.medium,
            category: turkishLocalization.threatCategories.authentication,
            timestamp: formattedDateTime
        },
        {
            type: 'medium',
            icon: 'fa-shield-alt',
            title: 'ORTA: Şifreleme Protokolü Anomalisi - Adana',
            message: `${formattedTime} - Adana bölgesinde araç-bulut iletişiminde şifreleme protokolü anomalisi tespit edildi. Güvenlik katmanı güçlendirildi. Durum: ${turkishLocalization.statusIndicators.mitigated}`,
            duration: 6500,
            severity: turkishLocalization.severityLevels.medium,
            category: turkishLocalization.threatCategories.encryption,
            timestamp: formattedDateTime
        },
        
        // International threats with Turkish localization
        {
            type: 'high',
            icon: 'fa-bug',
            title: 'YÜKSEK: V2X Protokol Güvenlik Açığı - Avrupa',
            message: `${formattedTime} - Avrupa genelinde V2X iletişim protokolünde sıfır gün güvenlik açığı tespit edildi. Acil güvenlik yaması tüm araçlara dağıtılıyor. Durum: ${turkishLocalization.statusIndicators.active}`,
            duration: 8000,
            severity: turkishLocalization.severityLevels.high,
            category: turkishLocalization.threatCategories.vulnerability,
            timestamp: formattedDateTime
        },
        {
            type: 'medium',
            icon: 'fa-charging-station',
            title: 'ORTA: Şarj İstasyonu Güvenlik Anomalisi - Avrupa',
            message: `${formattedTime} - Avrupa\'da 15 EV şarj istasyonunda anormal güç yönetimi davranışı. Potansiyel enjeksiyon saldırısı. İzolasyon protokolü başlatıldı. Durum: ${turkishLocalization.statusIndicators.investigating}`,
            duration: 7000,
            severity: turkishLocalization.severityLevels.medium,
            category: turkishLocalization.threatCategories.vulnerability,
            timestamp: formattedDateTime
        },
        
        // Low severity and informational alerts
        {
            type: 'low',
            icon: 'fa-info-circle',
            title: 'DÜŞÜK: OTA Güncelleme Doğrulama Hatası',
            message: `${formattedTime} - 8 araç için OTA güncelleme imza doğrulaması başarısız oldu. Güncellemeler güvenli karantinaya alındı. Mühendislik ekibi inceliyor. Durum: ${turkishLocalization.statusIndicators.pending}`,
            duration: 5000,
            severity: turkishLocalization.severityLevels.low,
            category: turkishLocalization.threatCategories.ota_compromise,
            timestamp: formattedDateTime
        },
        {
            type: 'low',
            icon: 'fa-shield-alt',
            title: 'DÜŞÜK: Güvenlik Duvarı Kuralı Güncellemesi',
            message: `${formattedTime} - Yeni ortaya çıkan tehdit desenini engellemek için araç güvenlik duvarı kuralları güncellendi. 342 araç başarıyla güncellendi. Durum: ${turkishLocalization.statusIndicators.resolved}`,
            duration: 5000,
            severity: turkishLocalization.severityLevels.low,
            category: turkishLocalization.threatCategories.vulnerability,
            timestamp: formattedDateTime
        },
        
        // Success notifications
        {
            type: 'success',
            icon: 'fa-check-circle',
            title: 'BAŞARILI: Tehdit Etkisizleştirme Tamamlandı',
            message: `${formattedTime} - Daha önce bildirilen CAN Bus sızma girişimi başarıyla etkisizleştirildi. Adli tıp analizi tamamlandı. Güvenlik yaması dağıtıldı. Durum: ${turkishLocalization.statusIndicators.closed}`,
            duration: 5000,
            severity: turkishLocalization.severityLevels.success,
            category: turkishLocalization.threatCategories.can_bus,
            timestamp: formattedDateTime
        },
        {
            type: 'success',
            icon: 'fa-shield-alt',
            title: 'BAŞARILI: Güvenlik Yaması Dağıtımı Tamamlandı',
            message: `${formattedTime} - Kritik güvenlik yaması filodaki 1.847 araca başarıyla dağıtıldı. Sistem bütünlüğü doğrulandı. Güvenlik seviyesi artırıldı. Durum: ${turkishLocalization.statusIndicators.resolved}`,
            duration: 5000,
            severity: turkishLocalization.severityLevels.success,
            category: turkishLocalization.threatCategories.vulnerability,
            timestamp: formattedDateTime
        },
        
        // Informational updates
        {
            type: 'info',
            icon: 'fa-brain',
            title: 'BİLGİ: YZ Anomali Motoru Güncellemesi',
            message: `${formattedTime} - Davranışsal anomali tespit motoru en son makine öğrenmesi modeliyle güncellendi. Tespit doğruluğu %99.8\'e yükseldi. Yanlış pozitif oranı %23 azaldı. Durum: ${turkishLocalization.statusIndicators.active}`,
            duration: 5000,
            severity: turkishLocalization.severityLevels.info,
            category: 'Sistem Güncellemesi',
            timestamp: formattedDateTime
        },
        {
            type: 'info',
            icon: 'fa-chart-line',
            title: 'BİLGİ: Tehdit İstihbaratı Beslemesi Güncellemesi',
            message: `${formattedTime} - Otomotiv siber tehdit istihbaratı beslemesi 47 yeni uzlaşma göstergesi ve 12 yeni saldırı deseniyle güncellendi. Proaktif koruma artırıldı. Durum: ${turkishLocalization.statusIndicators.active}`,
            duration: 4500,
            severity: turkishLocalization.severityLevels.info,
            category: 'İstihbarat Güncellemesi',
            timestamp: formattedDateTime
        }
    ];
    
    const randomThreat = threats[Math.floor(Math.random() * threats.length)];
    showNotification(randomThreat);
}

// Initialize Global Fleet Map with OpenStreetMap
function initializeMap() {
    const mapContainer = document.getElementById('threat-map');
    if (!mapContainer) return;

    // Clear any existing content
    mapContainer.innerHTML = '';

    // Create map stats panel
    const statsPanel = document.createElement('div');
    statsPanel.className = 'map-stats-panel';
    statsPanel.innerHTML = `
        <div class="map-stat-box">
            <div class="map-stat-value" id="map-active-vehicles">0</div>
            <div class="map-stat-label">Active Vehicles</div>
        </div>
        <div class="map-stat-box">
            <div class="map-stat-value" id="map-alert-count">0</div>
            <div class="map-stat-label">Active Alerts</div>
        </div>
        <div class="map-stat-box">
            <div class="map-stat-value" id="map-regions">0</div>
            <div class="map-stat-label">Regions</div>
        </div>
    `;
    mapContainer.appendChild(statsPanel);

    // Initialize the Leaflet map centered on Turkey
    const map = L.map('threat-map', {
        center: [39.0, 35.0], // Center on Turkey
        zoom: 5,
        zoomControl: true,
        attributionControl: true
    });

    // Add dark theme map tiles from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Create a marker cluster group for vehicles
    const vehicleMarkers = L.markerClusterGroup({
        disableClusteringAtZoom: 9,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster) {
            const count = cluster.getChildCount();
            return L.divIcon({
                html: `<div><span>${count}</span></div>`,
                className: 'marker-cluster',
                iconSize: L.point(40, 40)
            });
        }
    });

    // Add touch-friendly search control
    const searchControl = document.createElement('div');
    searchControl.className = 'search-control';
    searchControl.innerHTML = `
        <input type="text" 
               id="vehicle-search" 
               placeholder="Search vehicle ID or city..."
               autocomplete="off"
               autocapitalize="off"
               spellcheck="false">
        <button class="search-clear-btn" id="search-clear" style="display: none;">
            <i class="fas fa-times"></i>
        </button>
    `;
    mapContainer.appendChild(searchControl);

    const searchInput = document.getElementById('vehicle-search');
    const clearButton = document.getElementById('search-clear');
    
    // Add styles for clear button
    clearButton.style.cssText = `
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Make search control container relative for absolute positioning of clear button
    searchControl.style.position = 'relative';
    
    // Enhanced search functionality with debouncing
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Show/hide clear button
        clearButton.style.display = searchTerm ? 'flex' : 'none';
        
        // Debounce search for better performance
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(searchTerm, vehicleMarkers, map);
        }, 300);
    });
    
    // Clear search functionality
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        performSearch('', vehicleMarkers, map);
        searchInput.focus();
    });
    
    // Handle touch events for better mobile experience
    searchInput.addEventListener('touchstart', function() {
        this.style.backgroundColor = 'rgba(44, 62, 114, 0.9)';
    });
    
    searchInput.addEventListener('focus', function() {
        this.style.backgroundColor = 'rgba(44, 62, 114, 0.9)';
        this.style.borderColor = 'var(--accent)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.backgroundColor = 'rgba(44, 62, 114, 0.8)';
        this.style.borderColor = 'var(--border-color)';
    });

    // Add European cities
    const europeanCities = [
        { name: 'Berlin', lat: 52.5200, lng: 13.4050, count: 14 },
        { name: 'Paris', lat: 48.8566, lng: 2.3522, count: 16 },
        { name: 'London', lat: 51.5074, lng: -0.1278, count: 18 },
        { name: 'Madrid', lat: 40.4168, lng: -3.7038, count: 12 },
        { name: 'Rome', lat: 41.9028, lng: 12.4964, count: 11 },
        { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, count: 8 },
        { name: 'Brussels', lat: 50.8503, lng: 4.3517, count: 7 },
        { name: 'Vienna', lat: 48.2082, lng: 16.3738, count: 10 },
        { name: 'Stockholm', lat: 59.3293, lng: 18.0686, count: 9 },
        { name: 'Prague', lat: 50.0755, lng: 14.4378, count: 6 },
        { name: 'Warsaw', lat: 52.2297, lng: 21.0122, count: 9 },
        { name: 'Budapest', lat: 47.4979, lng: 19.0402, count: 7 }
    ];

    // Add Turkish and nearby cities with higher vehicle counts
    const turkishRegionCities = [
        { name: 'Istanbul', lat: 41.0082, lng: 28.9784, count: 25 },
        { name: 'Ankara', lat: 39.9334, lng: 32.8597, count: 20 },
        { name: 'Izmir', lat: 38.4237, lng: 27.1428, count: 18 },
        { name: 'Antalya', lat: 36.8969, lng: 30.7133, count: 15 },
        { name: 'Bursa', lat: 40.1885, lng: 29.0610, count: 14 },
        { name: 'Adana', lat: 37.0000, lng: 35.3213, count: 12 },
        { name: 'Konya', lat: 37.8715, lng: 32.4857, count: 10 },
        { name: 'Gaziantep', lat: 37.0662, lng: 37.3833, count: 13 },
        { name: 'Kayseri', lat: 38.7205, lng: 35.4894, count: 9 },
        { name: 'Athens', lat: 37.9838, lng: 23.7275, count: 12 },
        { name: 'Sofia', lat: 42.6977, lng: 23.3219, count: 8 },
        { name: 'Bucharest', lat: 44.4268, lng: 26.1025, count: 11 },
        { name: 'Baku', lat: 40.4093, lng: 49.8671, count: 10 },
        { name: 'Tbilisi', lat: 41.7151, lng: 44.8271, count: 7 },
        { name: 'Beirut', lat: 33.8938, lng: 35.5018, count: 9 }
    ];

    // Generate realistic vehicle locations around major US cities
    const usCities = [
        { name: 'New York', lat: 40.7128, lng: -74.0060, count: 12 },
        { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, count: 15 },
        { name: 'Chicago', lat: 41.8781, lng: -87.6298, count: 8 },
        { name: 'Houston', lat: 29.7604, lng: -95.3698, count: 10 },
        { name: 'Phoenix', lat: 33.4484, lng: -112.0740, count: 6 },
        { name: 'Philadelphia', lat: 39.9526, lng: -75.1652, count: 5 },
        { name: 'San Antonio', lat: 29.4241, lng: -98.4936, count: 4 },
        { name: 'San Diego', lat: 32.7157, lng: -117.1611, count: 7 },
        { name: 'Dallas', lat: 32.7767, lng: -96.7970, count: 9 },
        { name: 'San Francisco', lat: 37.7749, lng: -122.4194, count: 11 }
    ];

    // Combine all cities
    const allCities = [...europeanCities, ...turkishRegionCities, ...usCities];

    let totalVehicles = 0;
    let alertCount = 0;

    // Create vehicle markers for each city
    allCities.forEach(city => {
        // Higher threat probability for Turkish region
        const isTurkishRegion = turkishRegionCities.some(tc => tc.name === city.name);
        const threatProbabilityModifier = isTurkishRegion ? 1.5 : 1;
        
        for (let i = 0; i < city.count; i++) {
            // Generate random position within ~10km of city center
            const lat = city.lat + (Math.random() - 0.5) * 0.2;
            const lng = city.lng + (Math.random() - 0.5) * 0.2;
            
            // Generate vehicle data - higher chance of threats in Turkish region
            const vehicleId = `AV-${1000 + Math.floor(Math.random() * 9000)}`;
            const statusRandom = Math.random();
            const status = statusRandom > (0.8 / threatProbabilityModifier) ? 'warning' : 
                          statusRandom > (0.95 / threatProbabilityModifier) ? 'threat' : 'normal';
            const batteryLevel = Math.floor(Math.random() * 100);
            const securityScore = Math.floor((isTurkishRegion ? 70 : 80) + Math.random() * 20);
            
            // Create custom marker icon
            const markerIcon = L.divIcon({
                className: `custom-marker-icon vehicle-marker ${status}-marker`,
                html: `<i class="fas ${status === 'threat' ? 'fa-exclamation-triangle' : 'fa-car'}"></i>`,
                iconSize: [30, 30]
            });
            
            // Create marker with popup
            const marker = L.marker([lat, lng], {
                icon: markerIcon,
                vehicleId: vehicleId,
                cityName: city.name,
                status: status
            }).bindPopup(`
                <div class="vehicle-popup">
                    <h3>${vehicleId} - ${city.name}</h3>
                    <div class="vehicle-info">
                        <div class="info-row">
                            <span class="info-label">Status:</span>
                            <span class="info-value">${status === 'normal' ? 'Normal' : status === 'warning' ? 'Warning' : 'Threat'}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Battery:</span>
                            <span class="info-value">${batteryLevel}%</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Security Score:</span>
                            <span class="info-value">${securityScore}/100</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Last Update:</span>
                            <span class="info-value">Just now</span>
                        </div>
                    </div>
                </div>
            `);
            
            // Add to cluster group
            vehicleMarkers.addLayer(marker);
            totalVehicles++;
            
            if (status === 'warning' || status === 'threat') {
                alertCount++;
            }
            
            // Add simulated route for some vehicles (randomly)
            if (Math.random() > (isTurkishRegion ? 0.5 : 0.7)) {
                // Generate a random route with a few points
                const routePoints = [];
                const pointCount = Math.floor(Math.random() * 3) + 2;
                routePoints.push([lat, lng]); // Start at vehicle position
                
                for (let j = 0; j < pointCount; j++) {
                    const nextLat = routePoints[j][0] + (Math.random() - 0.5) * 0.05;
                    const nextLng = routePoints[j][1] + (Math.random() - 0.5) * 0.05;
                    routePoints.push([nextLat, nextLng]);
                }
                
                // Create a polyline for the route
                const routeLine = L.polyline(routePoints, {
                    color: status === 'threat' ? '#ff4d4d' : status === 'warning' ? '#ffcc00' : '#00c2ff',
                    weight: 2,
                    opacity: 0.7,
                    className: 'vehicle-route'
                }).addTo(map);
            }
        }
    });
    
    // Add all vehicle markers to the map
    map.addLayer(vehicleMarkers);
    
    // Add some threat circles on the map (European threats)
    const threatLocations = [
        // Turkish region threats (high concentration)
        { lat: 41.0082, lng: 28.9784, radius: 25, severity: 'high', label: 'Connected Vehicle Botnet' },
        { lat: 40.1885, lng: 29.0610, radius: 15, severity: 'medium', label: 'Fleet Management System Breach' },
        { lat: 39.9334, lng: 32.8597, radius: 20, severity: 'high', label: 'ECU Firmware Attack' },
        { lat: 38.4237, lng: 27.1428, radius: 18, severity: 'medium', label: 'Vehicle Sensor Tampering' },
        { lat: 36.8969, lng: 30.7133, radius: 12, severity: 'high', label: 'GPS Routing Attack' },
        { lat: 37.0000, lng: 35.3213, radius: 15, severity: 'medium', label: 'CAN Bus Intrusion Cluster' },
        { lat: 37.8715, lng: 32.4857, radius: 10, severity: 'low', label: 'Keyless Entry Vulnerability' },
        { lat: 37.0662, lng: 37.3833, radius: 17, severity: 'high', label: 'Cross-Border Security Breach' },
        { lat: 42.6977, lng: 23.3219, radius: 14, severity: 'medium', label: 'OBD Port Exploitation' },
        { lat: 44.4268, lng: 26.1025, radius: 16, severity: 'high', label: 'V2I Communication Hijacking' },
        { lat: 40.4093, lng: 49.8671, radius: 18, severity: 'medium', label: 'Traffic Light System Compromise' },

        // European threats
        { lat: 52.5200, lng: 13.4050, radius: 15, severity: 'high', label: 'V2X Protocol Vulnerability' },
        { lat: 48.8566, lng: 2.3522, radius: 25, severity: 'medium', label: 'Sensor Spoofing Campaign' },
        { lat: 51.5074, lng: -0.1278, radius: 10, severity: 'high', label: 'Fleet Encryption Breach' },
        { lat: 40.4168, lng: -3.7038, radius: 20, severity: 'medium', label: 'Charging Station Tampering' },
        { lat: 41.9028, lng: 12.4964, radius: 15, severity: 'low', label: 'Vehicle Authentication Issues' },
        { lat: 52.3676, lng: 4.9041, radius: 30, severity: 'high', label: 'Connected Vehicles Malware' },
        { lat: 59.3293, lng: 18.0686, radius: 18, severity: 'medium', label: 'Firmware Downgrade Attack' },
        
        // US threats (keeping the original ones)
        { lat: 40.7128, lng: -74.0060, radius: 20, severity: 'high', label: 'GPS Spoofing Detected' },
        { lat: 34.0522, lng: -118.2437, radius: 15, severity: 'medium', label: 'V2X Auth Failures' },
        { lat: 29.7604, lng: -95.3698, radius: 30, severity: 'high', label: 'Network Intrusion' },
        { lat: 37.7749, lng: -122.4194, radius: 10, severity: 'low', label: 'OTA Update Issues' }
    ];
    
    // Add threat circles to the map
    threatLocations.forEach(threat => {
        // Create pulsing threat circle
        const threatCircle = L.circle([threat.lat, threat.lng], {
            color: threat.severity === 'high' ? '#ff4d4d' : threat.severity === 'medium' ? '#ffcc00' : '#00c2ff',
            fillColor: threat.severity === 'high' ? '#ff4d4d' : threat.severity === 'medium' ? '#ffcc00' : '#00c2ff',
            fillOpacity: 0.2,
            weight: 1,
            radius: threat.radius * 1000, // Convert to meters
            className: `threat-circle ${threat.severity}-threat`
        }).addTo(map);
        
        // Add a label for the threat
        const labelIcon = L.divIcon({
            className: 'threat-label',
            html: `<div style="background-color: rgba(27, 33, 58, 0.8); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; white-space: nowrap;">${threat.label}</div>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10]
        });
        
        L.marker([threat.lat, threat.lng], { icon: labelIcon }).addTo(map);
    });
    
    // Add a legend
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'rgba(27, 33, 58, 0.8)';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.color = 'white';
        div.style.fontFamily = 'Montserrat, sans-serif';
        div.style.fontSize = '12px';
        
        div.innerHTML = `
            <h4 style="margin: 0 0 8px 0; font-size: 14px;">Threat Legend</h4>
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #ff4d4d; margin-right: 8px;"></span>
                <span>High Severity</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #ffcc00; margin-right: 8px;"></span>
                <span>Medium Severity</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #00c2ff; margin-right: 8px;"></span>
                <span>Low Severity</span>
            </div>
            <div style="display: flex; align-items: center; margin-top: 8px;">
                <span><b>Total Threats:</b> ${threatLocations.length}</span>
            </div>
        `;
        
        return div;
    };
    legend.addTo(map);
    
    // Update stats panel
    document.getElementById('map-active-vehicles').textContent = totalVehicles;
    document.getElementById('map-alert-count').textContent = alertCount;
    document.getElementById('map-regions').textContent = allCities.length;
    
    // Add map layer controls
    const baseMaps = {
        "Dark Theme": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }),
        "Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })
    };
    
    const overlayMaps = {
        "Vehicles": vehicleMarkers,
        "Threat Zones": L.layerGroup(threatLocations.map(t => 
            L.circle([t.lat, t.lng], {
                color: t.severity === 'high' ? '#ff4d4d' : t.severity === 'medium' ? '#ffcc00' : '#00c2ff',
                fillColor: t.severity === 'high' ? '#ff4d4d' : t.severity === 'medium' ? '#ffcc00' : '#00c2ff',
                fillOpacity: 0.2,
                weight: 1,
                radius: t.radius * 1000
            })
        ))
    };
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
    
    // Add touch gesture support and mobile optimizations
    addMapTouchSupport(map);
    
    // Add responsive behavior
    addMapResponsiveBehavior(map);
    
    // Optimize for mobile performance
    optimizeMapForMobile(map);
    
    // Store map reference for updates
    window.fleetMap = map;
    window.vehicleMarkers = vehicleMarkers;
    
    return map;
}

// Add touch gesture support for map interactions
function addMapTouchSupport(map) {
    const mapContainer = map.getContainer();
    
    // Variables for touch gesture tracking
    let touchStartDistance = 0;
    let touchStartCenter = null;
    let initialZoom = 0;
    let initialCenter = null;
    let touchCount = 0;
    let lastTouchTime = 0;
    let touchMoved = false;
    
    // Handle touch start
    mapContainer.addEventListener('touchstart', function(e) {
        touchCount = e.touches.length;
        touchMoved = false;
        lastTouchTime = Date.now();
        
        if (touchCount === 2) {
            // Two-finger touch for pinch zoom
            e.preventDefault();
            
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            
            // Calculate initial distance between touches
            touchStartDistance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            
            // Calculate center point between touches
            touchStartCenter = {
                x: (touch1.clientX + touch2.clientX) / 2,
                y: (touch1.clientY + touch2.clientY) / 2
            };
            
            initialZoom = map.getZoom();
            initialCenter = map.getCenter();
        }
    }, { passive: false });
    
    // Handle touch move
    mapContainer.addEventListener('touchmove', function(e) {
        if (touchCount === 2 && e.touches.length === 2) {
            e.preventDefault();
            touchMoved = true;
            
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            
            // Calculate current distance between touches
            const currentDistance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            
            // Calculate zoom factor
            const zoomFactor = currentDistance / touchStartDistance;
            const newZoom = Math.max(1, Math.min(18, initialZoom + Math.log(zoomFactor) / Math.log(2)));
            
            // Calculate current center point
            const currentCenter = {
                x: (touch1.clientX + touch2.clientX) / 2,
                y: (touch1.clientY + touch2.clientY) / 2
            };
            
            // Apply zoom
            map.setZoom(newZoom, { animate: false });
            
            // Calculate pan offset
            const containerRect = mapContainer.getBoundingClientRect();
            const centerOffset = {
                x: currentCenter.x - touchStartCenter.x,
                y: currentCenter.y - touchStartCenter.y
            };
            
            // Apply pan (simplified - Leaflet handles most of the complex pan logic)
            if (Math.abs(centerOffset.x) > 5 || Math.abs(centerOffset.y) > 5) {
                const currentMapCenter = map.getCenter();
                const pixelOffset = map.project(currentMapCenter).subtract([centerOffset.x, centerOffset.y]);
                const newCenter = map.unproject(pixelOffset);
                map.setView(newCenter, newZoom, { animate: false });
            }
        }
    }, { passive: false });
    
    // Handle touch end
    mapContainer.addEventListener('touchend', function(e) {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - lastTouchTime;
        
        // Handle double-tap to zoom
        if (touchCount === 1 && !touchMoved && touchDuration < 300) {
            // Check for double tap
            if (window.lastTapTime && (touchEndTime - window.lastTapTime) < 300) {
                e.preventDefault();
                const currentZoom = map.getZoom();
                map.setZoom(currentZoom + 1, { animate: true });
                window.lastTapTime = 0; // Reset to prevent triple tap
            } else {
                window.lastTapTime = touchEndTime;
            }
        }
        
        touchCount = 0;
        touchStartDistance = 0;
        touchStartCenter = null;
    });
    
    // Improve touch responsiveness
    mapContainer.style.touchAction = 'none';
    
    // Add momentum scrolling for smoother pan
    let panVelocity = { x: 0, y: 0 };
    let lastPanTime = 0;
    let lastPanPosition = { x: 0, y: 0 };
    
    map.on('drag', function(e) {
        const currentTime = Date.now();
        const currentPosition = e.target.getCenter();
        
        if (lastPanTime > 0) {
            const timeDelta = currentTime - lastPanTime;
            if (timeDelta > 0) {
                panVelocity.x = (currentPosition.lng - lastPanPosition.x) / timeDelta;
                panVelocity.y = (currentPosition.lat - lastPanPosition.y) / timeDelta;
            }
        }
        
        lastPanTime = currentTime;
        lastPanPosition = { x: currentPosition.lng, y: currentPosition.lat };
    });
    
    // Add haptic-like feedback for mobile interactions
    if ('vibrate' in navigator) {
        map.on('zoomend', function() {
            navigator.vibrate(10); // Short vibration on zoom
        });
        
        map.on('click', function() {
            navigator.vibrate(5); // Very short vibration on tap
        });
    }
}

// Add responsive behavior for different screen sizes
function addMapResponsiveBehavior(map) {
    let currentBreakpoint = getCurrentBreakpoint();
    
    function getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }
    
    function adjustMapForBreakpoint(breakpoint) {
        const mapContainer = map.getContainer();
        
        switch (breakpoint) {
            case 'mobile':
                // Mobile optimizations
                map.options.zoomSnap = 0.5; // Allow half-zoom levels for better mobile experience
                map.options.zoomDelta = 0.5;
                
                // Adjust control positions
                const zoomControl = map.zoomControl;
                if (zoomControl) {
                    zoomControl.setPosition('bottomright');
                }
                
                // Hide attribution on mobile to save space
                if (map.attributionControl) {
                    map.attributionControl.setPrefix('');
                }
                break;
                
            case 'tablet':
                // Tablet optimizations
                map.options.zoomSnap = 0.25;
                map.options.zoomDelta = 0.5;
                
                const tabletZoomControl = map.zoomControl;
                if (tabletZoomControl) {
                    tabletZoomControl.setPosition('topright');
                }
                break;
                
            case 'desktop':
                // Desktop optimizations
                map.options.zoomSnap = 1;
                map.options.zoomDelta = 1;
                
                const desktopZoomControl = map.zoomControl;
                if (desktopZoomControl) {
                    desktopZoomControl.setPosition('topleft');
                }
                
                // Restore attribution
                if (map.attributionControl) {
                    map.attributionControl.setPrefix('Leaflet');
                }
                break;
        }
    }
    
    // Initial adjustment
    adjustMapForBreakpoint(currentBreakpoint);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const newBreakpoint = getCurrentBreakpoint();
            if (newBreakpoint !== currentBreakpoint) {
                currentBreakpoint = newBreakpoint;
                adjustMapForBreakpoint(currentBreakpoint);
            }
            
            // Invalidate map size to ensure proper rendering
            map.invalidateSize();
        }, 250);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            map.invalidateSize();
            adjustMapForBreakpoint(getCurrentBreakpoint());
        }, 500);
    });
}

// Optimize map performance for mobile devices
function optimizeMapForMobile(map) {
    const isMobile = window.innerWidth < 768;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    if (isMobile || isLowEndDevice) {
        // Reduce tile loading for better performance
        map.options.preferCanvas = true;
        
        // Limit zoom levels on low-end devices
        if (isLowEndDevice) {
            map.setMaxZoom(15);
        }
        
        // Reduce marker cluster distance for better performance
        if (window.vehicleMarkers && window.vehicleMarkers.options) {
            window.vehicleMarkers.options.maxClusterRadius = 30;
            window.vehicleMarkers.options.disableClusteringAtZoom = 12;
        }
        
        // Throttle map events for better performance
        let moveTimeout;
        map.on('move', function() {
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(function() {
                // Update any dynamic content after move
                updateMapStats();
            }, 100);
        });
        
        // Reduce animation duration for snappier feel
        map.options.zoomAnimation = true;
        map.options.zoomAnimationThreshold = 4;
        map.options.fadeAnimation = false;
        map.options.markerZoomAnimation = false;
    }
    
    // Add loading indicator for slow networks
    if ('connection' in navigator && navigator.connection.effectiveType === 'slow-2g') {
        addMapLoadingIndicator(map);
    }
}

// Add loading indicator for slow connections
function addMapLoadingIndicator(map) {
    const mapContainer = map.getContainer();
    
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'map-loading-indicator';
    loadingIndicator.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(27, 33, 58, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 2000;
        display: none;
        backdrop-filter: blur(10px);
    `;
    loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Harita verileri yükleniyor...';
    
    mapContainer.appendChild(loadingIndicator);
    
    let tileLoadCount = 0;
    let totalTiles = 0;
    
    map.on('tilerequest', function() {
        totalTiles++;
        if (totalTiles === 1) {
            loadingIndicator.style.display = 'block';
        }
    });
    
    map.on('tileload', function() {
        tileLoadCount++;
        if (tileLoadCount >= totalTiles) {
            loadingIndicator.style.display = 'none';
            tileLoadCount = 0;
            totalTiles = 0;
        }
    });
    
    map.on('tileerror', function() {
        tileLoadCount++;
        if (tileLoadCount >= totalTiles) {
            loadingIndicator.style.display = 'none';
            tileLoadCount = 0;
            totalTiles = 0;
        }
    });
}

// Enhanced search functionality
function performSearch(searchTerm, vehicleMarkers, map) {
    let matchedMarkers = [];
    let hasResults = false;
    
    vehicleMarkers.eachLayer(function(layer) {
        const vehicleId = layer.options.vehicleId.toLowerCase();
        const cityName = layer.options.cityName.toLowerCase();
        const isMatch = !searchTerm || vehicleId.includes(searchTerm) || cityName.includes(searchTerm);
        
        if (layer._icon) {
            if (isMatch) {
                layer._icon.style.opacity = 1;
                layer._icon.style.filter = 'none';
                layer._icon.style.transform = 'scale(1)';
                matchedMarkers.push(layer);
                hasResults = true;
            } else {
                layer._icon.style.opacity = 0.3;
                layer._icon.style.filter = 'grayscale(1)';
                layer._icon.style.transform = 'scale(0.8)';
            }
        }
    });
    
    // If there are search results and only a few matches, fit map to show them
    if (searchTerm && hasResults && matchedMarkers.length <= 10 && matchedMarkers.length > 0) {
        const group = new L.featureGroup(matchedMarkers);
        map.fitBounds(group.getBounds().pad(0.1), {
            maxZoom: 12,
            animate: true,
            duration: 0.5
        });
    }
    
    // Show search results count
    showSearchResults(matchedMarkers.length, searchTerm);
}

// Show search results feedback
function showSearchResults(count, searchTerm) {
    // Remove existing result indicator
    const existingIndicator = document.querySelector('.search-results-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (searchTerm) {
        const searchControl = document.querySelector('.search-control');
        const indicator = document.createElement('div');
        indicator.className = 'search-results-indicator';
        indicator.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(27, 33, 58, 0.95);
            color: white;
            padding: 8px 12px;
            border-radius: 0 0 6px 6px;
            font-size: 12px;
            z-index: 1001;
            backdrop-filter: blur(10px);
            border: 1px solid var(--border-color);
            border-top: none;
        `;
        
        if (count === 0) {
            indicator.innerHTML = '<i class="fas fa-search"></i> Araç bulunamadı';
            indicator.style.color = '#ff4d4d';
        } else {
            indicator.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${count} araç bulundu`;
            indicator.style.color = '#00e676';
        }
        
        searchControl.appendChild(indicator);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.style.transition = 'opacity 0.3s ease';
                indicator.style.opacity = '0';
                setTimeout(() => {
                    if (indicator.parentNode) {
                        indicator.remove();
                    }
                }, 300);
            }
        }, 3000);
    }
}

// Update map statistics
function updateMapStats() {
    if (window.fleetMap && window.vehicleMarkers) {
        const bounds = window.fleetMap.getBounds();
        let visibleVehicles = 0;
        let visibleAlerts = 0;
        
        window.vehicleMarkers.eachLayer(function(layer) {
            if (bounds.contains(layer.getLatLng())) {
                visibleVehicles++;
                if (layer.options.status === 'warning' || layer.options.status === 'threat') {
                    visibleAlerts++;
                }
            }
        });
        
        // Update stats display
        const activeVehiclesEl = document.getElementById('map-active-vehicles');
        const alertCountEl = document.getElementById('map-alert-count');
        
        if (activeVehiclesEl) {
            activeVehiclesEl.textContent = visibleVehicles;
        }
        if (alertCountEl) {
            alertCountEl.textContent = visibleAlerts;
        }
    }
}

// Initialize Vehicle Systems Monitor
function initializeVehicleSystemsMonitor() {
    const container = document.getElementById('network-anomaly-map');
    if (!container) return;
    
    // Create vehicle systems diagram
    const canvas = document.createElement('canvas');
    canvas.id = 'vehicle-systems-canvas';
    container.appendChild(canvas);
    
    // Set up responsive canvas sizing
    setupResponsiveCanvas(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Draw vehicle outline
    drawVehicleOutline(ctx, canvas.width, canvas.height);
    
    // Draw vehicle systems
    drawVehicleSystems(ctx, canvas.width, canvas.height);
    
    // Add touch-friendly interactions
    addChartTouchInteractions(canvas, 'vehicle-systems');
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', () => {
        setupResponsiveCanvas(canvas);
        drawVehicleOutline(ctx, canvas.width, canvas.height);
        drawVehicleSystems(ctx, canvas.width, canvas.height);
    });
}

// Helper function to draw a simplified vehicle outline
function drawVehicleOutline(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const carWidth = width * 0.8;
    const carHeight = height * 0.6;
    
    ctx.strokeStyle = 'rgba(75, 107, 220, 0.5)';
    ctx.lineWidth = 2;
    
    // Draw car body (simplified)
    ctx.beginPath();
    ctx.moveTo(centerX - carWidth/2, centerY);
    ctx.lineTo(centerX - carWidth/3, centerY - carHeight/3);
    ctx.lineTo(centerX + carWidth/3, centerY - carHeight/3);
    ctx.lineTo(centerX + carWidth/2, centerY);
    ctx.lineTo(centerX + carWidth/3, centerY + carHeight/3);
    ctx.lineTo(centerX - carWidth/3, centerY + carHeight/3);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = 'rgba(27, 33, 58, 0.3)';
    ctx.fill();
    
    // Draw wheels
    ctx.beginPath();
    ctx.arc(centerX - carWidth/3, centerY + carHeight/3 + 5, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(44, 62, 114, 0.5)';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(centerX + carWidth/3, centerY + carHeight/3 + 5, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(44, 62, 114, 0.5)';
    ctx.fill();
}

// Helper function to draw vehicle systems
function drawVehicleSystems(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const isMobile = width < 400;
    const isTablet = width >= 400 && width < 768;
    
    // Responsive sizing
    let fontSize, centralRadius, systemRadius, connectionWidth;
    if (isMobile) {
        fontSize = 8;
        centralRadius = 20;
        systemRadius = 12;
        connectionWidth = 1;
    } else if (isTablet) {
        fontSize = 9;
        centralRadius = 22;
        systemRadius = 13;
        connectionWidth = 1.5;
    } else {
        fontSize = 10;
        centralRadius = 25;
        systemRadius = 15;
        connectionWidth = 2;
    }
    
    // Responsive system positioning
    const systemDistance = isMobile ? 50 : (isTablet ? 60 : 70);
    const verticalOffset = isMobile ? 30 : (isTablet ? 35 : 40);
    
    const systems = [
        { name: 'CAN Bus', x: centerX, y: centerY, radius: centralRadius, status: 'normal', central: true },
        { name: isMobile ? 'Info' : 'Infotainment', x: centerX - systemDistance, y: centerY - verticalOffset, radius: systemRadius, status: 'normal' },
        { name: 'ADAS', x: centerX + systemDistance, y: centerY - verticalOffset, radius: systemRadius, status: 'warning' },
        { name: isMobile ? 'Engine' : 'Engine ECU', x: centerX - (systemDistance * 0.7), y: centerY + verticalOffset, radius: systemRadius, status: 'normal' },
        { name: isMobile ? 'Brake' : 'Braking', x: centerX + (systemDistance * 0.7), y: centerY + verticalOffset, radius: systemRadius, status: 'normal' }
    ];
    
    // Draw connections between systems with animation effect
    ctx.strokeStyle = 'rgba(75, 107, 220, 0.4)';
    ctx.lineWidth = connectionWidth;
    
    systems.forEach(system => {
        if (!system.central) {
            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(system.x, system.y);
            ctx.stroke();
            
            // Add data flow animation dots
            const distance = Math.sqrt(Math.pow(system.x - centerX, 2) + Math.pow(system.y - centerY, 2));
            const steps = Math.floor(distance / 15);
            
            for (let i = 1; i < steps; i++) {
                const t = i / steps;
                const dotX = centerX + (system.x - centerX) * t;
                const dotY = centerY + (system.y - centerY) * t;
                
                // Animate dots based on time
                const animationOffset = (Date.now() / 1000 + i * 0.2) % 1;
                const opacity = Math.sin(animationOffset * Math.PI * 2) * 0.3 + 0.7;
                
                ctx.beginPath();
                ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 194, 255, ${opacity})`;
                ctx.fill();
            }
        }
    });
    
    // Draw system nodes with enhanced styling
    systems.forEach(system => {
        // Draw outer glow effect
        const gradient = ctx.createRadialGradient(system.x, system.y, 0, system.x, system.y, system.radius + 5);
        
        if (system.status === 'normal') {
            gradient.addColorStop(0, 'rgba(0, 194, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 194, 255, 0)');
            ctx.fillStyle = 'rgba(0, 194, 255, 0.2)';
            ctx.strokeStyle = '#00c2ff';
        } else if (system.status === 'warning') {
            gradient.addColorStop(0, 'rgba(255, 204, 0, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 204, 0, 0)');
            ctx.fillStyle = 'rgba(255, 204, 0, 0.2)';
            ctx.strokeStyle = '#ffcc00';
        } else {
            gradient.addColorStop(0, 'rgba(255, 77, 77, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 77, 77, 0)');
            ctx.fillStyle = 'rgba(255, 77, 77, 0.2)';
            ctx.strokeStyle = '#ff4d4d';
        }
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(system.x, system.y, system.radius + 5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw main circle
        ctx.beginPath();
        ctx.arc(system.x, system.y, system.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add system icon (simplified)
        ctx.fillStyle = system.status === 'normal' ? '#00c2ff' : 
                       system.status === 'warning' ? '#ffcc00' : '#ff4d4d';
        ctx.font = `${Math.floor(system.radius * 0.6)}px FontAwesome`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Simple icon representation
        const icon = system.central ? '●' : 
                    system.name.includes('Info') ? '📱' :
                    system.name.includes('ADAS') ? '🚗' :
                    system.name.includes('Engine') ? '⚙️' : '🛑';
        ctx.fillText(icon, system.x, system.y);
        
        // Add system name with responsive positioning
        ctx.fillStyle = '#b6b6cc';
        ctx.font = `${fontSize}px Montserrat`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        const labelY = system.y + system.radius + (isMobile ? 8 : 12);
        ctx.fillText(system.name, system.x, labelY);
        
        // Add status indicator for non-central systems
        if (!system.central && system.status !== 'normal') {
            ctx.beginPath();
            ctx.arc(system.x + system.radius - 3, system.y - system.radius + 3, 4, 0, Math.PI * 2);
            ctx.fillStyle = system.status === 'warning' ? '#ffcc00' : '#ff4d4d';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    });
    
    // Add title
    ctx.fillStyle = '#b6b6cc';
    ctx.font = `${fontSize + 2}px Montserrat`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Vehicle Systems Network', centerX, 10);
}

// Initialize Security Incidents Timeline with Turkish localization
function initializeSecurityIncidents() {
    const container = document.getElementById('threat-intel-timeline');
    if (!container) return;
    
    // Generate realistic incident timestamps for today
    const now = new Date();
    const incidents = [
        { 
            timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 42, 18),
            severity: 'high', 
            title: turkishLocalization.threatCategories.can_bus + ' Girişimi', 
            description: 'AV-3429 araç kimliğinde CAN veri yoluna yetkisiz mesaj enjeksiyonu girişimi tespit edildi. Güvenlik protokolü devreye alındı.',
            status: turkishLocalization.statusIndicators.investigating,
            location: 'İstanbul'
        },
        { 
            timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 37, 52),
            severity: 'medium', 
            title: 'V2X Kimlik Doğrulama Anomalisi', 
            description: 'AV-7821 aracında V2X iletişim protokolünde kimlik doğrulama hatası tespit edildi. Alternatif iletişim kanalı aktif.',
            status: turkishLocalization.statusIndicators.mitigated,
            location: 'Ankara'
        },
        { 
            timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 15, 3),
            severity: 'low', 
            title: turkishLocalization.threatCategories.gps_spoofing + ' Anomalisi', 
            description: 'İzmir bölgesinde 3 araçta GPS sinyal tutarsızlığı tespit edildi. İnertial navigasyon sistemi devreye alındı.',
            status: turkishLocalization.statusIndicators.resolved,
            location: 'İzmir'
        },
        { 
            timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 22, 31),
            severity: 'medium', 
            title: turkishLocalization.threatCategories.ota_compromise + ' Hatası', 
            description: 'OTA güncelleme paketi #43872 için dijital imza doğrulaması başarısız oldu. Güncelleme karantinaya alındı.',
            status: turkishLocalization.statusIndicators.pending,
            location: 'Bursa'
        },
        { 
            timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 59, 47),
            severity: 'high', 
            title: turkishLocalization.threatCategories.sensor_manipulation, 
            description: 'AV-2390 aracında LiDAR sensör verilerinde manipülasyon girişimi tespit edildi. Çoklu sensör doğrulama aktif.',
            status: turkishLocalization.statusIndicators.escalated,
            location: 'Antalya'
        },
        { 
            timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 15, 22),
            severity: 'medium', 
            title: turkishLocalization.threatCategories.ecu_tampering + ' Uyarısı', 
            description: 'AV-5647 aracında ECU firmware checksum anomalisi tespit edildi. Sistem bütünlüğü kontrol ediliyor.',
            status: turkishLocalization.statusIndicators.monitoring,
            location: 'Adana'
        }
    ];
    
    // Create timeline items with Turkish formatting
    incidents.forEach(incident => {
        const incidentElement = document.createElement('div');
        incidentElement.className = `timeline-item ${incident.severity}`;
        
        // Format time in Turkish
        const timeString = formatTurkishTime(incident.timestamp);
        const fullTimestamp = formatTurkishDateTime(incident.timestamp);
        const severityText = turkishLocalization.severityLevels[incident.severity] || incident.severity.toUpperCase();
        
        incidentElement.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-time" title="${fullTimestamp}">${timeString}</div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h4>${incident.title}</h4>
                    <div class="timeline-badges">
                        <span class="severity-badge ${incident.severity}">${severityText}</span>
                        <span class="location-badge">
                            <i class="fas fa-map-marker-alt"></i> ${incident.location}
                        </span>
                    </div>
                </div>
                <p>${incident.description}</p>
                <div class="timeline-status">
                    <i class="fas fa-info-circle"></i>
                    <span>Durum: ${incident.status}</span>
                </div>
            </div>
        `;
        
        container.appendChild(incidentElement);
    });
}

// Initialize Compliance Scores
function initializeComplianceScores() {
    const container = document.getElementById('compliance-scores');
    if (!container) return;
    
    const regulations = [
        { name: 'UN ECE R155', score: 97.8 },
        { name: 'ISO/SAE 21434', score: 96.5 },
        { name: 'UNECE WP.29', score: 98.2 },
        { name: 'EU CCAM Regulation', score: 94.7 }
    ];
    
    // Create compliance score items
    regulations.forEach(regulation => {
        const regulationElement = document.createElement('div');
        regulationElement.className = 'compliance-item';
        
        regulationElement.innerHTML = `
            <div class="compliance-info">
                <h4>${regulation.name}</h4>
                <span class="compliance-score">${regulation.score}%</span>
            </div>
            <div class="compliance-bar">
                <div class="compliance-progress" style="width: ${regulation.score}%"></div>
            </div>
        `;
        
        container.appendChild(regulationElement);
    });
}

// Initialize AI Learning Metrics
function initializeAILearningMetrics() {
    const container = document.getElementById('ai-learning-metrics');
    if (!container) return;
    
    // Create canvas for AI learning graph
    const canvas = document.createElement('canvas');
    canvas.id = 'ai-learning-canvas';
    container.appendChild(canvas);
    
    // Set up responsive canvas sizing
    setupResponsiveCanvas(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Draw AI learning curve
    drawAILearningCurve(ctx, canvas.width, canvas.height);
    
    // Add touch-friendly interactions
    addChartTouchInteractions(canvas, 'ai-learning');
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', () => {
        setupResponsiveCanvas(canvas);
        drawAILearningCurve(ctx, canvas.width, canvas.height);
    });
}

// Helper function to draw AI learning curve
function drawAILearningCurve(ctx, width, height) {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const isMobile = width < 400;
    const isTablet = width >= 400 && width < 768;
    
    // Responsive sizing
    let fontSize, gridSpacing, pointRadius, lineWidth;
    if (isMobile) {
        fontSize = 8;
        gridSpacing = 15;
        pointRadius = 3;
        lineWidth = 2;
    } else if (isTablet) {
        fontSize = 9;
        gridSpacing = 18;
        pointRadius = 3.5;
        lineWidth = 2.5;
    } else {
        fontSize = 10;
        gridSpacing = 20;
        pointRadius = 4;
        lineWidth = 3;
    }
    
    // Set background
    ctx.fillStyle = 'rgba(27, 33, 58, 0.2)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw responsive grid
    ctx.strokeStyle = 'rgba(75, 107, 220, 0.2)';
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    for (let y = gridSpacing; y < height - gridSpacing; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(30, y);
        ctx.lineTo(width - 10, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let x = 30; x < width - 10; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, gridSpacing);
        ctx.lineTo(x, height - 30);
        ctx.stroke();
    }
    
    // Generate learning curve data
    const dataPoints = isMobile ? 6 : 9; // Fewer points on mobile
    const data = [];
    
    for (let i = 0; i < dataPoints; i++) {
        // Start at around 90% and curve upward to 99%
        const value = 90 + (Math.pow(i / (dataPoints - 1), 2) * 9);
        data.push(value);
    }
    
    // Calculate chart area
    const chartLeft = 30;
    const chartRight = width - 10;
    const chartTop = gridSpacing;
    const chartBottom = height - 30;
    const chartWidth = chartRight - chartLeft;
    const chartHeight = chartBottom - chartTop;
    
    // Draw axes labels
    ctx.fillStyle = '#b6b6cc';
    ctx.font = `${fontSize}px Montserrat`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    if (!isMobile) {
        ctx.fillText('Tespit Oranı (%)', 5, 5);
    } else {
        ctx.fillText('Oran %', 5, 5);
    }
    
    // Draw month labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const monthNames = isMobile ? 
        ['O', 'Ş', 'M', 'N', 'M', 'H'] : 
        ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl'];
    
    monthNames.forEach((month, i) => {
        const x = chartLeft + (chartWidth / (dataPoints - 1)) * i;
        ctx.fillText(month, x, chartBottom + 5);
    });
    
    // Draw Y-axis labels
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 4; i++) {
        const value = 90 + (i * 2.5);
        const y = chartBottom - (i / 4) * chartHeight;
        ctx.fillText(formatTurkishPercentage(value, 0), chartLeft - 5, y);
    }
    
    // Draw data line with gradient
    const gradient = ctx.createLinearGradient(0, chartTop, 0, chartBottom);
    gradient.addColorStop(0, '#00c2ff');
    gradient.addColorStop(1, 'rgba(0, 194, 255, 0.3)');
    
    ctx.strokeStyle = '#00c2ff';
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    
    // Create smooth curve
    const points = [];
    for (let i = 0; i < data.length; i++) {
        const x = chartLeft + (chartWidth / (dataPoints - 1)) * i;
        const y = chartBottom - ((data[i] - 90) / 10) * chartHeight;
        points.push({ x, y });
    }
    
    // Draw smooth curve using quadratic curves
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
        const cpx = (points[i].x + points[i + 1].x) / 2;
        const cpy = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cpx, cpy);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();
    
    // Fill area under curve
    ctx.lineTo(points[points.length - 1].x, chartBottom);
    ctx.lineTo(points[0].x, chartBottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add data points
    points.forEach((point, i) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#00c2ff';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Add value label (only on larger screens or every other point on mobile)
        if (!isMobile || i % 2 === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.font = `${fontSize}px Montserrat`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 2;
            ctx.fillText(formatTurkishPercentage(data[i], 1), point.x, point.y - pointRadius - 5);
            ctx.shadowBlur = 0;
        }
    });
}

// Initialize Security Agents
function initializeSecurityAgents() {
    const container = document.getElementById('ai-agent-metrics');
    if (!container) return;
    
    const agents = [
        { name: 'Anomali Tespiti', status: 'active', detections: 147, accuracy: 99.2 },
        { name: 'Mesaj Doğrulayıcı', status: 'active', detections: 86, accuracy: 98.7 },
        { name: 'Davranış Analizi', status: 'active', detections: 124, accuracy: 97.5 },
        { name: 'Firmware Koruyucu', status: 'active', detections: 52, accuracy: 99.8 }
    ];
    
    // Create agent cards
    agents.forEach(agent => {
        const agentElement = document.createElement('div');
        agentElement.className = 'agent-card';
        
        agentElement.innerHTML = `
            <div class="agent-status ${agent.status}">
                <span class="status-indicator"></span>
                ${agent.status === 'active' ? 'Aktif' : agent.status}
            </div>
            <h4>${agent.name}</h4>
            <div class="agent-metrics">
                <div class="agent-metric">
                    <span class="metric-value">${agent.detections}</span>
                    <span class="metric-label">Tespit</span>
                </div>
                <div class="agent-metric">
                    <span class="metric-value">${agent.accuracy}%</span>
                    <span class="metric-label">Doğruluk</span>
                </div>
            </div>
        `;
        
        container.appendChild(agentElement);
    });
}

// Initialize Attack Vector Chart
function initializeAttackVectorChart() {
    const chartCanvas = document.getElementById('attack-vector-chart');
    if (!chartCanvas) return;
    
    // Set up responsive canvas sizing
    setupResponsiveCanvas(chartCanvas);
    
    const ctx = chartCanvas.getContext('2d');
    
    // Draw pie chart showing attack vector distribution
    drawAttackVectorPieChart(ctx, chartCanvas.width, chartCanvas.height);
    
    // Add touch-friendly interactions
    addChartTouchInteractions(chartCanvas, 'attack-vector');
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', () => {
        setupResponsiveCanvas(chartCanvas);
        drawAttackVectorPieChart(ctx, chartCanvas.width, chartCanvas.height);
    });
}

// Helper function to draw attack vector pie chart
function drawAttackVectorPieChart(ctx, width, height) {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const isMobile = width < 400;
    const isTablet = width >= 400 && width < 768;
    
    // Responsive sizing
    let radius, fontSize, legendFontSize;
    if (isMobile) {
        radius = Math.min(width, height) / 2 - 30;
        fontSize = 10;
        legendFontSize = 9;
    } else if (isTablet) {
        radius = Math.min(width, height) / 2 - 25;
        fontSize = 11;
        legendFontSize = 10;
    } else {
        radius = Math.min(width, height) / 2 - 20;
        fontSize = 12;
        legendFontSize = 12;
    }
    
    const attackVectors = [
        { name: 'CAN Injection', percentage: 35, color: '#ff4d4d' },
        { name: 'V2X Exploits', percentage: 22, color: '#ffcc00' },
        { name: 'Sensor Tampering', percentage: 18, color: '#00c2ff' },
        { name: 'OTA Vulnerabilities', percentage: 15, color: '#4b6bdc' },
        { name: 'Physical Access', percentage: 10, color: '#00e676' }
    ];
    
    let startAngle = 0;
    
    // Draw pie slices
    attackVectors.forEach(vector => {
        const sliceAngle = (vector.percentage / 100) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        
        ctx.fillStyle = vector.color;
        ctx.fill();
        
        // Add stroke for better visibility
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Add percentage label (only if slice is large enough)
        if (vector.percentage >= 10) {
            const labelAngle = startAngle + (sliceAngle / 2);
            const labelRadius = isMobile ? radius * 0.6 : radius * 0.7;
            const labelX = centerX + (labelRadius * Math.cos(labelAngle));
            const labelY = centerY + (labelRadius * Math.sin(labelAngle));
            
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${fontSize}px Montserrat`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 2;
            ctx.fillText(vector.percentage + '%', labelX, labelY);
            ctx.shadowBlur = 0;
        }
        
        startAngle += sliceAngle;
    });
    
    // Draw center circle (donut chart style)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(27, 33, 58, 0.8)';
    ctx.fill();
    
    // Add center text
    ctx.fillStyle = '#b6b6cc';
    ctx.font = `${fontSize}px Montserrat`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Attack', centerX, centerY - 8);
    ctx.fillText('Vectors', centerX, centerY + 8);
    
    // Draw responsive legend
    if (isMobile) {
        // Horizontal legend for mobile
        const legendY = height - 40;
        const legendItemWidth = width / attackVectors.length;
        
        attackVectors.forEach((vector, index) => {
            const legendX = (index * legendItemWidth) + (legendItemWidth / 2);
            
            // Draw legend color circle
            ctx.beginPath();
            ctx.arc(legendX, legendY, 6, 0, 2 * Math.PI);
            ctx.fillStyle = vector.color;
            ctx.fill();
            
            // Draw legend text (abbreviated for mobile)
            ctx.fillStyle = '#b6b6cc';
            ctx.font = `${legendFontSize}px Montserrat`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            const shortName = vector.name.split(' ')[0];
            ctx.fillText(shortName, legendX, legendY + 12);
        });
    } else {
        // Vertical legend for tablet/desktop
        const legendX = 10;
        let legendY = height - (attackVectors.length * 20) - 10;
        
        attackVectors.forEach(vector => {
            // Draw legend color box
            ctx.fillStyle = vector.color;
            ctx.fillRect(legendX, legendY, 12, 12);
            
            // Draw legend text
            ctx.fillStyle = '#b6b6cc';
            ctx.font = `${legendFontSize}px Montserrat`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(vector.name, legendX + 20, legendY + 6);
            
            legendY += 20;
        });
    }
}

// Initialize CAN Bus Analysis
function initializeCANBusAnalysis() {
    const container = document.getElementById('log-analysis');
    if (!container) return;
    
    const canEntries = [
        { id: '0x18FF54A2', data: '42 6A F3 28 11 00 00 00', flag: 'normal' },
        { id: '0x18F0010B', data: 'F3 42 78 9A 00 00 00 00', flag: 'normal' },
        { id: '0x18FEF100', data: '07 D0 00 00 00 00 00 00', flag: 'warning' },
        { id: '0x18FF5400', data: '00 00 00 00 00 00 00 00', flag: 'normal' },
        { id: '0x0CF00400', data: 'AA BB CC DD 00 00 00 00', flag: 'danger' },
        { id: '0x18FF51A5', data: '4B 23 31 FF 00 00 00 00', flag: 'normal' },
        { id: '0x0CF00203', data: '00 00 00 00 FF FF FF FF', flag: 'normal' }
    ];
    
    // Create CAN bus log entries
    canEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = `log-entry ${entry.flag}`;
        
        entryElement.innerHTML = `
            <span class="log-id">${entry.id}</span>
            <span class="log-data">${entry.data}</span>
            <span class="log-status">${entry.flag === 'normal' ? 'TAMAM' : entry.flag === 'warning' ? 'UYARI' : 'ALARM'}</span>
        `;
        
        container.appendChild(entryElement);
    });
}

// Initialize Threat Feed with Turkish localization
function initializeThreatFeed() {
    const container = document.getElementById('threat-feed');
    if (!container) return;
    
    // Generate realistic timestamps for threats
    const now = new Date();
    const threats = [
        { 
            type: turkishLocalization.threatCategories.can_bus, 
            severity: 'high', 
            timestamp: new Date(now - 2 * 60 * 1000), // 2 minutes ago
            location: 'AV-3429, İstanbul', 
            details: 'CAN veri yoluna yetkisiz mesaj enjeksiyonu tespit edildi. Araç güvenlik protokolü devreye alındı.',
            status: turkishLocalization.statusIndicators.investigating
        },
        { 
            type: turkishLocalization.threatCategories.ota_compromise, 
            severity: 'medium', 
            timestamp: new Date(now - 18 * 60 * 1000), // 18 minutes ago
            location: 'AV-1290, Ankara', 
            details: 'OTA güncelleme paketi dijital imza doğrulaması başarısız oldu. Güncelleme karantinaya alındı.',
            status: turkishLocalization.statusIndicators.mitigated
        },
        { 
            type: turkishLocalization.threatCategories.sensor_manipulation, 
            severity: 'medium', 
            timestamp: new Date(now - 27 * 60 * 1000), // 27 minutes ago
            location: 'AV-5382, İzmir', 
            details: 'LiDAR sensör verilerinde manipülasyon girişimi tespit edildi. Alternatif sensörler devreye alındı.',
            status: turkishLocalization.statusIndicators.resolved
        },
        { 
            type: turkishLocalization.threatCategories.v2x_attack, 
            severity: 'high', 
            timestamp: new Date(now - 34 * 60 * 1000), // 34 minutes ago
            location: 'AV-7821, Bursa', 
            details: 'V2X kimlik doğrulama protokolünde istismar girişimi tespit edildi. Güvenlik katmanı güçlendirildi.',
            status: turkishLocalization.statusIndicators.escalated
        },
        { 
            type: turkishLocalization.threatCategories.ecu_tampering, 
            severity: 'low', 
            timestamp: new Date(now - 52 * 60 * 1000), // 52 minutes ago
            location: 'AV-9043, Antalya', 
            details: 'ECU firmware checksum doğrulama hatası tespit edildi. Sistem bütünlüğü kontrol ediliyor.',
            status: turkishLocalization.statusIndicators.monitoring
        },
        { 
            type: turkishLocalization.threatCategories.gps_spoofing, 
            severity: 'high', 
            timestamp: new Date(now - 67 * 60 * 1000), // 67 minutes ago
            location: 'AV-2156, Adana', 
            details: 'GPS koordinat sahteciliği tespit edildi. İnertial navigasyon sistemi devreye alındı.',
            status: turkishLocalization.statusIndicators.resolved
        }
    ];
    
    // Create threat items with Turkish formatting
    threats.forEach(threat => {
        const threatElement = document.createElement('div');
        threatElement.className = `threat-item ${threat.severity}`;
        
        // Format relative time in Turkish
        const relativeTime = formatTurkishRelativeTime(threat.timestamp);
        const fullTimestamp = formatTurkishDateTime(threat.timestamp);
        
        // Get Turkish severity level
        const severityText = turkishLocalization.severityLevels[threat.severity] || threat.severity.toUpperCase();
        
        threatElement.innerHTML = `
            <div class="threat-header">
                <span class="threat-type">${threat.type}</span>
                <span class="threat-time" title="${fullTimestamp}">${relativeTime}</span>
            </div>
            <div class="threat-details">${threat.details}</div>
            <div class="threat-location">
                <i class="fas fa-map-marker-alt"></i> ${threat.location}
            </div>
            <div class="threat-footer">
                <div class="threat-severity severity-${threat.severity}">
                    <i class="fas fa-shield-alt"></i>
                    ${severityText}
                </div>
                <div class="threat-status status-${threat.severity}">
                    <i class="fas fa-info-circle"></i>
                    ${threat.status}
                </div>
            </div>
        `;
        
        container.appendChild(threatElement);
    });
}

// Initialize Weather & Location Intelligence
function initializeWeatherIntelligence() {
    const container = document.getElementById('weather-container');
    if (!container) return;
    
    // Clear loading indicator
    container.innerHTML = '';
    
    // Turkish cities with weather data
    const turkishCities = [
        { name: 'İstanbul', vehicleCount: 18, weather: { temp: 16, condition: 'Parçalı Bulutlu', icon: 'fa-cloud-sun', humidity: 65, wind: 12, visibility: 'İyi', precipitation: '20%' }, riskLevel: 'low' },
        { name: 'Ankara', vehicleCount: 12, weather: { temp: 11, condition: 'Güneşli', icon: 'fa-sun', humidity: 45, wind: 8, visibility: 'Mükemmel', precipitation: '0%' }, riskLevel: 'low' },
        { name: 'İzmir', vehicleCount: 15, weather: { temp: 19, condition: 'Açık', icon: 'fa-sun', humidity: 60, wind: 15, visibility: 'İyi', precipitation: '5%' }, riskLevel: 'low' },
        { name: 'Antalya', vehicleCount: 10, weather: { temp: 24, condition: 'Güneşli', icon: 'fa-sun', humidity: 55, wind: 10, visibility: 'Mükemmel', precipitation: '0%' }, riskLevel: 'low' },
        { name: 'Bursa', vehicleCount: 8, weather: { temp: 15, condition: 'Hafif Yağmur', icon: 'fa-cloud-rain', humidity: 75, wind: 18, visibility: 'Orta', precipitation: '60%' }, riskLevel: 'medium', alert: 'Ani sel uyarısı yürürlükte' },
        { name: 'Adana', vehicleCount: 7, weather: { temp: 22, condition: 'Parçalı Bulutlu', icon: 'fa-cloud-sun', humidity: 50, wind: 12, visibility: 'İyi', precipitation: '10%' }, riskLevel: 'low' }
    ];
    
    // Create weather cards for each city
    turkishCities.forEach(city => {
        const weatherCard = document.createElement('div');
        weatherCard.className = 'weather-card';
        
        // Create risk level icon and text
        let riskIcon, riskText;
        if (city.riskLevel === 'high') {
            riskIcon = 'fa-exclamation-triangle';
            riskText = 'Yüksek Risk';
        } else if (city.riskLevel === 'medium') {
            riskIcon = 'fa-exclamation-circle';
            riskText = 'Orta Risk';
        } else {
            riskIcon = 'fa-check-circle';
            riskText = 'Düşük Risk';
        }
        
        weatherCard.innerHTML = `
            <div class="weather-card-header">
                <div class="weather-location">${city.name}, Türkiye</div>
                <div class="vehicles-count"><i class="fas fa-car"></i> ${city.vehicleCount} Araç</div>
            </div>
            <div class="weather-card-body">
                <div class="weather-icon">
                    <i class="fas ${city.weather.icon}"></i>
                </div>
                <div class="weather-info">
                    <div class="weather-temp">${city.weather.temp}°C</div>
                    <div class="weather-desc">${city.weather.condition}</div>
                </div>
            </div>
            <div class="weather-details">
                <div class="weather-detail-item">
                    <i class="fas fa-tint"></i>
                    <span class="weather-detail-label">Nem:</span>
                    <span class="weather-detail-value">${city.weather.humidity}%</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-wind"></i>
                    <span class="weather-detail-label">Rüzgar:</span>
                    <span class="weather-detail-value">${city.weather.wind} km/s</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-eye"></i>
                    <span class="weather-detail-label">Görüş:</span>
                    <span class="weather-detail-value">${city.weather.visibility}</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-cloud-rain"></i>
                    <span class="weather-detail-label">Yağış:</span>
                    <span class="weather-detail-value">${city.weather.precipitation}</span>
                </div>
            </div>
            <div class="weather-risk">
                <div class="weather-risk-level ${city.riskLevel}">
                    <i class="fas ${riskIcon}"></i> ${riskText} for Autonomous Driving
                </div>
                ${city.alert ? `<div class="weather-alerts">${city.alert}</div>` : ''}
            </div>
        `;
        
        container.appendChild(weatherCard);
    });
    
    // Add refresh button functionality
    const refreshButton = document.querySelector('.weather-intelligence .fa-sync-alt');
    if (refreshButton) {
        refreshButton.parentElement.addEventListener('click', function() {
            this.querySelector('i').classList.add('fa-spin');
            
            // Simulate refreshing data
            setTimeout(() => {
                updateWeatherData();
                this.querySelector('i').classList.remove('fa-spin');
            }, 1000);
        });
    }
}

// Update weather data with slight changes to simulate real-time updates
function updateWeatherData() {
    const weatherCards = document.querySelectorAll('.weather-card');
    
    weatherCards.forEach(card => {
        // Update temperature with small random change
        const tempElement = card.querySelector('.weather-temp');
        if (tempElement) {
            const currentTemp = parseInt(tempElement.textContent);
            const tempChange = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2);
            tempElement.textContent = `${currentTemp + tempChange}°C`;
        }
        
        // Occasionally change weather condition
        if (Math.random() > 0.8) {
            const weatherDesc = card.querySelector('.weather-desc');
            const weatherIcon = card.querySelector('.weather-icon i');
            
            if (weatherDesc && weatherIcon) {
                const conditions = [
                    { condition: 'Sunny', icon: 'fa-sun' },
                    { condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
                    { condition: 'Cloudy', icon: 'fa-cloud' },
                    { condition: 'Light Rain', icon: 'fa-cloud-rain' },
                    { condition: 'Thunderstorm', icon: 'fa-bolt' }
                ];
                
                const newCondition = conditions[Math.floor(Math.random() * conditions.length)];
                weatherDesc.textContent = newCondition.condition;
                
                weatherIcon.className = `fas ${newCondition.icon}`;
                
                // Update risk level based on condition
                const riskLevel = card.querySelector('.weather-risk-level');
                if (riskLevel) {
                    if (newCondition.condition === 'Thunderstorm' || newCondition.condition === 'Heavy Rain') {
                        riskLevel.className = 'weather-risk-level high';
                        riskLevel.innerHTML = '<i class="fas fa-exclamation-triangle"></i> High Risk for Autonomous Driving';
                        
                        // Add an alert
                        let alertDiv = card.querySelector('.weather-alerts');
                        if (!alertDiv) {
                            alertDiv = document.createElement('div');
                            alertDiv.className = 'weather-alerts';
                            card.querySelector('.weather-risk').appendChild(alertDiv);
                        }
                        alertDiv.textContent = 'Severe weather warning in effect';
                    } else if (newCondition.condition === 'Light Rain' || newCondition.condition === 'Cloudy') {
                        riskLevel.className = 'weather-risk-level medium';
                        riskLevel.innerHTML = '<i class="fas fa-exclamation-circle"></i> Medium Risk for Autonomous Driving';
                        
                        // Remove any existing alert
                        const alertDiv = card.querySelector('.weather-alerts');
                        if (alertDiv) {
                            alertDiv.remove();
                        }
                    } else {
                        riskLevel.className = 'weather-risk-level low';
                        riskLevel.innerHTML = '<i class="fas fa-check-circle"></i> Low Risk for Autonomous Driving';
                        
                        // Remove any existing alert
                        const alertDiv = card.querySelector('.weather-alerts');
                        if (alertDiv) {
                            alertDiv.remove();
                        }
                    }
                }
            }
        }
        
        // Update humidity, wind, and precipitation with small changes
        const humidityValue = card.querySelector('.weather-detail-item:nth-child(1) .weather-detail-value');
        if (humidityValue) {
            const currentHumidity = parseInt(humidityValue.textContent);
            const humidityChange = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5);
            const newHumidity = Math.max(30, Math.min(95, currentHumidity + humidityChange));
            humidityValue.textContent = `${newHumidity}%`;
        }
        
        const windValue = card.querySelector('.weather-detail-item:nth-child(2) .weather-detail-value');
        if (windValue) {
            const currentWind = parseInt(windValue.textContent);
            const windChange = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3);
            const newWind = Math.max(0, Math.min(30, currentWind + windChange));
            windValue.textContent = `${newWind} km/h`;
        }
        
        const precipValue = card.querySelector('.weather-detail-item:nth-child(4) .weather-detail-value');
        if (precipValue) {
            const currentPrecip = parseInt(precipValue.textContent);
            const precipChange = (Math.random() > 0.5 ? 5 : -5) * Math.floor(Math.random() * 2);
            const newPrecip = Math.max(0, Math.min(100, currentPrecip + precipChange));
            precipValue.textContent = `${newPrecip}%`;
        }
    });
}

// Setup dashboard control buttons
function setupDashboardControls() {
    // Add click handlers for dashboard control buttons
    const controlButtons = document.querySelectorAll('.control-buttons button');
    
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mock functionality for demo purposes
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-expand')) {
                // Toggle between fullscreen and normal view
                const dashboardItem = this.closest('.dashboard-item');
                dashboardItem.classList.toggle('expanded');
                
                if (dashboardItem.classList.contains('expanded')) {
                    icon.classList.remove('fa-expand');
                    icon.classList.add('fa-compress');
                } else {
                    icon.classList.remove('fa-compress');
                    icon.classList.add('fa-expand');
                }
            }
        });
    });
}

// Setup animations for dashboard elements
function setupAnimations() {
    // Animate numbers counting up
    const animatedNumbers = document.querySelectorAll('#active-threats, #mitigated-threats');
    
    animatedNumbers.forEach(element => {
        const targetValue = parseInt(element.textContent);
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const interval = 50; // Update every 50ms
        const increment = targetValue / (duration / interval);
        
        element.textContent = '0';
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                clearInterval(timer);
                currentValue = targetValue;
            }
            
            element.textContent = Math.floor(currentValue).toString();
        }, interval);
    });
    
    // Add pulsing effect to high severity threats
    const highSeverityElements = document.querySelectorAll('.severity-high, .high');
    highSeverityElements.forEach(element => {
        element.classList.add('pulse');
    });
}

// Update live data on the dashboard
function updateLiveData() {
    // Get current time for last updated display
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0') + ':' + 
                       now.getSeconds().toString().padStart(2, '0');
    
    // Update time displays
    const timeDisplays = document.querySelectorAll('.time-display');
    timeDisplays.forEach(display => {
        if (display.textContent === 'Canlı' || display.textContent === 'Gerçek Zamanlı' || display.textContent === 'Güncellendi') {
            display.textContent = 'Güncellendi ' + timeString;
        }
    });
    
    // Update active threats with small random fluctuations
    const activeThreatElement = document.getElementById('active-threats');
    if (activeThreatElement) {
        const currentValue = parseInt(activeThreatElement.textContent);
        const newValue = currentValue + (Math.random() > 0.5 ? 1 : -1);
        activeThreatElement.textContent = newValue;
    }
    
    // Update mitigated threats (always increasing)
    const mitigatedThreatsElement = document.getElementById('mitigated-threats');
    if (mitigatedThreatsElement) {
        const currentValue = parseInt(mitigatedThreatsElement.textContent);
        // Increased rate of mitigated threats
        const newValue = currentValue + Math.floor(Math.random() * 4) + 1;
        mitigatedThreatsElement.textContent = newValue;
    }
    
    // Update map with real-time vehicle movements if map is initialized
    if (window.fleetMap && window.vehicleMarkers) {
        const map = window.fleetMap;
        const vehicleMarkers = window.vehicleMarkers;
        
        // Randomly move some vehicles
        const moveVehicleCount = Math.floor(Math.random() * 5) + 3; // 3-7 vehicles will move
        
        let movedCount = 0;
        vehicleMarkers.eachLayer(layer => {
            if (movedCount < moveVehicleCount && Math.random() > 0.8) {
                // Get current position
                const currentLatLng = layer.getLatLng();
                
                // Generate new position (small movement)
                const newLat = currentLatLng.lat + (Math.random() - 0.5) * 0.01;
                const newLng = currentLatLng.lng + (Math.random() - 0.5) * 0.01;
                
                // Animate movement
                layer.setLatLng([newLat, newLng]);
                
                // Draw movement path
                const pathLine = L.polyline([
                    [currentLatLng.lat, currentLatLng.lng],
                    [newLat, newLng]
                ], {
                    color: layer.options.status === 'threat' ? '#ff4d4d' : 
                           layer.options.status === 'warning' ? '#ffcc00' : '#00c2ff',
                    weight: 2,
                    opacity: 0.5,
                    dashArray: '5, 5'
                }).addTo(map);
                
                // Remove path after a delay
                setTimeout(() => {
                    map.removeLayer(pathLine);
                }, 5000);
                
                movedCount++;
            }
        });
        
        // Occasionally change vehicle status
        if (Math.random() > 0.7) { // Increased probability
            vehicleMarkers.eachLayer(layer => {
                if (Math.random() > 0.92) { // Increased probability of changes
                    // Get current status
                    const currentStatus = layer.options.status;
                    let newStatus;
                    
                    // Determine new status (mostly transitions to better states)
                    if (currentStatus === 'threat') {
                        newStatus = Math.random() > 0.3 ? 'warning' : 'threat';
                    } else if (currentStatus === 'warning') {
                        newStatus = Math.random() > 0.7 ? 'normal' : 'warning';
                    } else {
                        newStatus = Math.random() > 0.85 ? 'warning' : 'normal'; // Increased chance of warning
                    }
                    
                    if (currentStatus !== newStatus) {
                        // Update marker icon
                        const newIcon = L.divIcon({
                            className: `custom-marker-icon vehicle-marker ${newStatus}-marker`,
                            html: `<i class="fas ${newStatus === 'threat' ? 'fa-exclamation-triangle' : 'fa-car'}"></i>`,
                            iconSize: [30, 30]
                        });
                        
                        layer.setIcon(newIcon);
                        layer.options.status = newStatus;
                        
                        // Update popup content
                        const popupContent = layer._popup.getContent();
                        const updatedContent = popupContent.replace(
                            /Status:<\/span>\s*<span class="info-value">[^<]+<\/span>/,
                            `Status:</span><span class="info-value">${newStatus === 'normal' ? 'Normal' : newStatus === 'warning' ? 'Warning' : 'Threat'}</span>`
                        );
                        layer._popup.setContent(updatedContent);
                        
                        // If new status is a threat, maybe generate a notification
                        if (newStatus === 'threat' && Math.random() > 0.5) {
                            const cityName = layer.options.cityName;
                            showNotification({
                                type: 'high',
                                icon: 'fa-exclamation-triangle',
                                title: `New Threat - ${cityName}`,
                                message: `Vehicle ${layer.options.vehicleId} in ${cityName} has entered threat state. Security response initiated.`,
                                duration: 7000
                            });
                        }
                    }
                }
            });
        }
        
        // Update map stats
        let totalVehicles = 0;
        let alertCount = 0;
        
        vehicleMarkers.eachLayer(layer => {
            totalVehicles++;
            if (layer.options.status === 'warning' || layer.options.status === 'threat') {
                alertCount++;
            }
        });
        
        document.getElementById('map-active-vehicles').textContent = totalVehicles;
        document.getElementById('map-alert-count').textContent = alertCount;
    }
    
    // Update weather data occasionally
    if (Math.random() > 0.7) {
        updateWeatherData();
    }
    
    // Update data flow statistics with small random fluctuations
    updateDataFlowStatistics();
    
    // Occasionally show security event notifications based on threat feed
    // Increased probability of showing a threat notification
    if (Math.random() > 0.6) { // Changed from 0.8 to 0.6 for more frequent notifications
        showRandomThreatNotification();
    }
}

// Update data flow statistics with small fluctuations
function updateDataFlowStatistics() {
    const dataSources = document.getElementById('data-sources-count');
    if (dataSources) {
        const currentValue = parseInt(dataSources.textContent.replace(/,/g, ''));
        const change = Math.floor(Math.random() * 7) - 3; // Random change between -3 and +3
        dataSources.textContent = formatTurkishNumber(currentValue + change);
    }
    
    const eventsProcessed = document.getElementById('events-processed');
    if (eventsProcessed) {
        const currentValue = parseFloat(eventsProcessed.textContent);
        const change = (Math.random() * 0.4 - 0.1).toFixed(1); // Random change between -0.1 and +0.3
        eventsProcessed.textContent = formatTurkishDecimal(parseFloat(currentValue) + parseFloat(change), 1) + 'M';
    }
    
    const mlAccuracy = document.getElementById('ml-accuracy');
    if (mlAccuracy) {
        const currentValue = parseFloat(mlAccuracy.textContent);
        // Small random fluctuation but keep it high, between -0.1 and +0.1
        const change = (Math.random() * 0.2 - 0.1).toFixed(1);
        const newValue = Math.min(99.9, parseFloat(currentValue) + parseFloat(change)).toFixed(1);
        mlAccuracy.textContent = formatTurkishPercentage(parseFloat(newValue), 1);
    }
    
    const threatsIdentified = document.getElementById('threats-identified');
    if (threatsIdentified) {
        const currentValue = parseInt(threatsIdentified.textContent);
        // Usually increase but occasionally decrease
        const change = Math.random() > 0.8 ? -1 : Math.floor(Math.random() * 3) + 1;
        threatsIdentified.textContent = formatTurkishNumber(currentValue + change);
    }
    
    // Reapply Turkish formatting to any updated elements
    setTimeout(() => {
        updateExistingNumbersToTurkish();
        applyTurkishFormattingClasses();
    }, 100);
}

// Enhanced responsive chart and visualization updates
function updateChartsForResponsiveBreakpoint() {
    // Update attack vector chart
    const attackVectorCanvas = document.getElementById('attack-vector-chart');
    if (attackVectorCanvas) {
        const dimensions = setupEnhancedCanvasScaling(attackVectorCanvas);
        const ctx = attackVectorCanvas.getContext('2d');
        drawResponsiveAttackVectorChart(ctx, dimensions.width, dimensions.height);
    }
    
    // Update AI learning chart
    const aiLearningCanvas = document.getElementById('ai-learning-canvas');
    if (aiLearningCanvas) {
        const dimensions = setupEnhancedCanvasScaling(aiLearningCanvas);
        const ctx = aiLearningCanvas.getContext('2d');
        drawResponsiveAILearningChart(ctx, dimensions.width, dimensions.height);
    }
    
    // Update vehicle systems chart
    const vehicleSystemsCanvas = document.getElementById('vehicle-systems-canvas');
    if (vehicleSystemsCanvas) {
        const dimensions = setupEnhancedCanvasScaling(vehicleSystemsCanvas);
        const ctx = vehicleSystemsCanvas.getContext('2d');
        drawResponsiveVehicleSystemsChart(ctx, dimensions.width, dimensions.height);
    }
}

// Draw responsive attack vector chart with Turkish labels
function drawResponsiveAttackVectorChart(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    // Attack vector data with Turkish labels
    const attackVectors = [
        { label: 'CAN Bus Enjeksiyonu', value: 35, color: '#FF6B6B' },
        { label: 'GPS Sahteciliği', value: 25, color: '#4ECDC4' },
        { label: 'OTA Güvenlik İhlali', value: 20, color: '#45B7D1' },
        { label: 'ECU Kurcalama', value: 12, color: '#96CEB4' },
        { label: 'Diğer', value: 8, color: '#FFEAA7' }
    ];
    
    let currentAngle = -Math.PI / 2;
    
    // Draw pie slices
    attackVectors.forEach((vector, index) => {
        const sliceAngle = (vector.value / 100) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = vector.color;
        ctx.fill();
        ctx.strokeStyle = '#1B213A';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        currentAngle += sliceAngle;
    });
    
    // Draw responsive legend
    const legendPosition = getResponsiveLegendPosition(width, height, attackVectors.length);
    drawResponsiveLegend(ctx, attackVectors, legendPosition);
}

// Draw responsive AI learning chart with Turkish labels
function drawResponsiveAILearningChart(ctx, width, height) {
    const margin = currentBreakpoint === 'mobile' ? 30 : 40;
    const chartWidth = width - (margin * 2);
    const chartHeight = height - (margin * 2);
    
    // Sample data points for AI learning curve
    const dataPoints = [
        { month: 'Oca', accuracy: 85 },
        { month: 'Şub', accuracy: 87 },
        { month: 'Mar', accuracy: 90 },
        { month: 'Nis', accuracy: 92 },
        { month: 'May', accuracy: 94 },
        { month: 'Haz', accuracy: 96 },
        { month: 'Tem', accuracy: 97 },
        { month: 'Ağu', accuracy: 98 },
        { month: 'Eyl', accuracy: 99.7 }
    ];
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.strokeStyle = '#4B6BDC';
    ctx.lineWidth = 1;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.stroke();
    
    // Draw data line
    ctx.strokeStyle = '#00E676';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    dataPoints.forEach((point, index) => {
        const x = margin + (index / (dataPoints.length - 1)) * chartWidth;
        const y = height - margin - ((point.accuracy - 80) / 20) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw data points
        ctx.fillStyle = '#00E676';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    ctx.stroke();
    
    // Draw labels (responsive font size)
    const fontSize = currentBreakpoint === 'mobile' ? 10 : 12;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    
    // X-axis labels
    dataPoints.forEach((point, index) => {
        const x = margin + (index / (dataPoints.length - 1)) * chartWidth;
        ctx.fillText(point.month, x, height - margin + 15);
    });
    
    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 80; i <= 100; i += 5) {
        const y = height - margin - ((i - 80) / 20) * chartHeight;
        ctx.fillText(`${i}%`, margin - 5, y + 3);
    }
    
    // Chart title
    ctx.textAlign = 'center';
    ctx.font = `bold ${fontSize + 2}px Arial`;
    ctx.fillText('YZ Tespit Doğruluğu', width / 2, 20);
}

// Draw responsive vehicle systems chart
function drawResponsiveVehicleSystemsChart(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 300;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw vehicle outline (simplified)
    ctx.strokeStyle = '#4B6BDC';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(75, 107, 220, 0.1)';
    
    // Vehicle body (using rect instead of roundRect for compatibility)
    ctx.beginPath();
    ctx.rect(centerX - 60 * scale, centerY - 25 * scale, 120 * scale, 50 * scale);
    ctx.fill();
    ctx.stroke();
    
    // System status indicators with Turkish labels
    const systems = [
        { name: 'Motor', x: -40, y: 0, status: 'normal' },
        { name: 'Fren', x: 40, y: -15, status: 'normal' },
        { name: 'Direksiyon', x: -40, y: -15, status: 'warning' },
        { name: 'ADAS', x: 0, y: 15, status: 'normal' },
        { name: 'Telematik', x: 0, y: -30, status: 'normal' }
    ];
    
    const fontSize = currentBreakpoint === 'mobile' ? 8 : 10;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    
    systems.forEach(system => {
        const x = centerX + system.x * scale;
        const y = centerY + system.y * scale;
        
        // Status indicator
        const statusColors = {
            'normal': '#00E676',
            'warning': '#FFB74D',
            'error': '#FF5252'
        };
        
        ctx.fillStyle = statusColors[system.status];
        ctx.beginPath();
        ctx.arc(x, y, 6 * scale, 0, 2 * Math.PI);
        ctx.fill();
        
        // System label
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(system.name, x, y + 20 * scale);
    });
}

// Draw responsive legend
function drawResponsiveLegend(ctx, data, legendPosition) {
    const { type, x, y, itemWidth, itemHeight, fontSize } = legendPosition;
    
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'left';
    
    data.forEach((item, index) => {
        let itemX, itemY;
        
        if (type === 'horizontal') {
            itemX = x - (data.length * itemWidth) / 2 + (index * itemWidth);
            itemY = y;
        } else {
            itemX = x;
            itemY = y + (index * itemHeight);
        }
        
        // Color indicator
        ctx.fillStyle = item.color;
        ctx.fillRect(itemX, itemY - 8, 12, 12);
        
        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`${item.label} (${item.value}%)`, itemX + 16, itemY + 2);
    });
}

// Initialize all responsive and localization features
function initializeResponsiveAndLocalizationFeatures() {
    // Initialize responsive breakpoint detection
    initializeResponsiveBreakpointDetection();
    
    // Update dynamic content with Turkish localization
    updateDynamicContentWithTurkish();
    
    // Set up responsive chart updates
    updateChartsForResponsiveBreakpoint();
    
    // Listen for breakpoint changes
    document.addEventListener('breakpointChanged', (event) => {
        console.log('Breakpoint changed:', event.detail);
        updateChartsForResponsiveBreakpoint();
        updateDynamicContentWithTurkish();
    });
    
    // Update charts when visualizations are updated
    document.addEventListener('visualizationsUpdated', () => {
        updateChartsForResponsiveBreakpoint();
    });
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeResponsiveAndLocalizationFeatures);
} else {
    initializeResponsiveAndLocalizationFeatures();
}