// Dashboard UI Fixes and Enhancements

// Smooth tab switching with scroll reset
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Smooth scroll to top on tab change
            const appContent = document.querySelector('.app-content');
            if (appContent) {
                appContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            button.appendChild(ripple);
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            
            // Animate ripple
            requestAnimationFrame(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(2)';
                ripple.style.opacity = '0';
            });
            
            setTimeout(() => ripple.remove(), 600);
        }, { passive: true });
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(99, 102, 241, 0.3);
        pointer-events: none;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-item {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// iOS Safari fixes
(function() {
    // Prevent bounce/overscroll on iOS
    let supportsPassive = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {}
    
    const passiveOption = supportsPassive ? { passive: true } : false;
    
    // Prevent overscroll on body but allow it on scrollable elements
    document.body.addEventListener('touchmove', function(e) {
        const target = e.target;
        const scrollableElements = [
            '.app-content',
            '.bottom-sheet',
            '.vehicle-list',
            '.threat-list',
            '.maintenance-list',
            '.filters',
            '.pipeline-container'
        ];
        
        let isScrollable = false;
        scrollableElements.forEach(selector => {
            if (target.closest(selector)) {
                isScrollable = true;
            }
        });
        
        if (!isScrollable) {
            e.preventDefault();
        }
    }, passiveOption);
    
    // Fix iOS input zoom
    const addMaximumScaleToMetaViewport = () => {
        const el = document.querySelector('meta[name=viewport]');
        if (el !== null) {
            let content = el.getAttribute('content');
            const re = /maximum\-scale=[0-9\.]+/g;
            
            if (re.test(content)) {
                content = content.replace(re, 'maximum-scale=1.0');
            } else {
                content = [content, 'maximum-scale=1.0'].join(', ');
            }
            
            el.setAttribute('content', content);
        }
    };
    
    const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;
    
    const checkIsIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (checkIsIOS()) {
        disableIosTextFieldZoom();
    }
})();

// Smooth scroll behavior
document.addEventListener('DOMContentLoaded', () => {
    // Add passive event listeners for better scroll performance
    const scrollElements = document.querySelectorAll('.app-content, .bottom-sheet, .filters, .pipeline-container');
    scrollElements.forEach(element => {
        element.addEventListener('scroll', () => {}, { passive: true });
    });
    
    // Optimize touch interactions
    const interactiveElements = document.querySelectorAll('.vehicle-card, .threat-card, .maintenance-card, .btn, .nav-item');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {}, { passive: true });
    });
});

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.map) {
            window.map.invalidateSize();
        }
        
        // Recalculate viewport height for better mobile experience
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 300);
});

// Set initial viewport height
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Update on resize
window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Bottom sheet swipe to close
document.addEventListener('DOMContentLoaded', () => {
    const bottomSheet = document.getElementById('bottom-sheet');
    const handle = document.querySelector('.bottom-sheet-handle');
    
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    
    const onTouchStart = (e) => {
        startY = e.touches[0].clientY;
        isDragging = true;
        bottomSheet.style.transition = 'none';
    };
    
    const onTouchMove = (e) => {
        if (!isDragging) return;
        
        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        
        if (deltaY > 0) {
            bottomSheet.style.transform = `translateY(${deltaY}px)`;
        }
    };
    
    const onTouchEnd = () => {
        if (!isDragging) return;
        
        isDragging = false;
        bottomSheet.style.transition = '';
        
        const deltaY = currentY - startY;
        
        if (deltaY > 100) {
            closeBottomSheet();
        } else {
            bottomSheet.style.transform = 'translateY(0)';
        }
    };
    
    handle.addEventListener('touchstart', onTouchStart, { passive: true });
    handle.addEventListener('touchmove', onTouchMove, { passive: true });
    handle.addEventListener('touchend', onTouchEnd);
    
    bottomSheet.addEventListener('touchstart', onTouchStart, { passive: true });
    bottomSheet.addEventListener('touchmove', onTouchMove, { passive: true });
    bottomSheet.addEventListener('touchend', onTouchEnd);
});

// Prevent text selection on double tap for certain elements
document.addEventListener('DOMContentLoaded', () => {
    const preventSelectionElements = document.querySelectorAll('.stat-card, .nav-item, .btn, .icon-btn');
    preventSelectionElements.forEach(element => {
        element.addEventListener('selectstart', (e) => {
            e.preventDefault();
        });
    });
});

// Add active state feedback for better UX
document.addEventListener('DOMContentLoaded', () => {
    const addActiveState = (selector) => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('active');
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('active');
                }, 150);
            });
            
            element.addEventListener('touchcancel', () => {
                element.classList.remove('active');
            });
        });
    };
    
    addActiveState('.vehicle-card');
    addActiveState('.threat-card');
    addActiveState('.maintenance-card');
});

// Keyboard navigation enhancements
document.addEventListener('keydown', (e) => {
    // Close bottom sheet with Escape key
    if (e.key === 'Escape') {
        const bottomSheet = document.getElementById('bottom-sheet');
        if (bottomSheet.classList.contains('open')) {
            closeBottomSheet();
        }
    }
    
    // Tab navigation between tabs
    if (e.key === 'Tab' && e.shiftKey === false) {
        const navItems = Array.from(document.querySelectorAll('.nav-item'));
        const activeIndex = navItems.findIndex(item => item.classList.contains('active'));
        
        if (e.target.classList.contains('nav-item') && activeIndex < navItems.length - 1) {
            e.preventDefault();
            navItems[activeIndex + 1].focus();
        }
    }
});

// Performance monitoring (lightweight)
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            if (loadTime > 2500) {
                console.warn('Page load time exceeded 2.5s:', loadTime + 'ms');
            }
        }, 0);
    });
}

// Network status handling
window.addEventListener('online', () => {
    if (window.APP_STATE) {
        window.APP_STATE.realtimeEnabled = true;
    }
    document.querySelector('.status-badge').classList.remove('danger');
    document.querySelector('.status-badge').classList.add('success');
    document.querySelector('.status-badge span:last-child').textContent = 'Çevrimiçi';
});

window.addEventListener('offline', () => {
    if (window.APP_STATE) {
        window.APP_STATE.realtimeEnabled = false;
    }
    document.querySelector('.status-badge').classList.remove('success');
    document.querySelector('.status-badge').classList.add('danger');
    document.querySelector('.status-badge span:last-child').textContent = 'Çevrimdışı';
});

// Visibility change handling (battery optimization)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations
        document.body.classList.remove('paused');
        
        // Refresh data when returning to tab
        if (window.APP_STATE && window.APP_STATE.currentTab === 'device-management') {
            setTimeout(() => {
                if (typeof renderVehicles === 'function') {
                    renderVehicles();
                }
            }, 100);
        }
    }
});

// Throttle function for performance
function throttle(func, wait) {
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

// Debounce function for performance
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

// Export utilities
window.throttle = throttle;
window.debounce = debounce;

// Console styling for debugging
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c Singularity Dashboard ', 'background: #6366f1; color: white; font-size: 16px; padding: 4px 8px; border-radius: 4px;');
    console.log('%c Mobile-First IoT Security Platform ', 'color: #6366f1; font-size: 12px;');
}
