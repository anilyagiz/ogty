// Service Worker for PWA Offline Support

const CACHE_NAME = 'singularity-v1.0.0';
const RUNTIME_CACHE = 'singularity-runtime';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/responsive-enhancements.css',
    '/touch-target-enhancements.css',
    '/mobile-optimization.css',
    '/map-styles.css',
    '/script.js',
    '/map-functions.js',
    '/dashboard-fixes.js',
    '/manifest.json'
];

const CDN_ASSETS = [
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll([...STATIC_ASSETS, ...CDN_ASSETS].map(url => {
                    return new Request(url, { mode: 'no-cors' });
                })).catch(err => {
                    console.warn('Service Worker: Some assets failed to cache', err);
                    // Try to cache at least the critical assets
                    return cache.addAll(STATIC_ASSETS);
                });
            })
            .then(() => {
                console.log('Service Worker: Installed successfully');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => {
                            return name !== CACHE_NAME && name !== RUNTIME_CACHE;
                        })
                        .map((name) => {
                            console.log('Service Worker: Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle navigation requests
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Update cache with fresh response
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cached version
                    return caches.match(request)
                        .then((cachedResponse) => {
                            return cachedResponse || caches.match('/index.html');
                        });
                })
        );
        return;
    }
    
    // Handle static assets (CSS, JS)
    if (url.origin === location.origin || CDN_ASSETS.includes(request.url)) {
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        // Return cached version and update in background
                        const fetchPromise = fetch(request)
                            .then((networkResponse) => {
                                caches.open(CACHE_NAME).then((cache) => {
                                    cache.put(request, networkResponse.clone());
                                });
                                return networkResponse;
                            })
                            .catch(() => cachedResponse);
                        
                        return cachedResponse;
                    }
                    
                    // Not in cache, fetch from network
                    return fetch(request)
                        .then((networkResponse) => {
                            // Cache successful responses
                            if (networkResponse.ok) {
                                const responseClone = networkResponse.clone();
                                caches.open(CACHE_NAME).then((cache) => {
                                    cache.put(request, responseClone);
                                });
                            }
                            return networkResponse;
                        })
                        .catch(() => {
                            return new Response('Offline - Asset not available', {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: new Headers({
                                    'Content-Type': 'text/plain'
                                })
                            });
                        });
                })
        );
        return;
    }
    
    // Handle tile map requests with runtime cache
    if (url.hostname.includes('tile.openstreetmap') || 
        url.hostname.includes('basemaps.cartocdn')) {
        event.respondWith(
            caches.open(RUNTIME_CACHE)
                .then((cache) => {
                    return cache.match(request)
                        .then((cachedResponse) => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            
                            return fetch(request)
                                .then((networkResponse) => {
                                    if (networkResponse.ok) {
                                        cache.put(request, networkResponse.clone());
                                    }
                                    return networkResponse;
                                })
                                .catch(() => {
                                    return new Response('', {
                                        status: 503,
                                        statusText: 'Tile not available offline'
                                    });
                                });
                        });
                })
        );
        return;
    }
    
    // For everything else, network first, fallback to cache
    event.respondWith(
        fetch(request)
            .then((response) => {
                if (response.ok) {
                    const responseClone = response.clone();
                    caches.open(RUNTIME_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Message event - allow clients to control the service worker
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        return caches.delete(cacheName);
                    })
                );
            })
        );
    }
});

// Periodic sync for background updates (if supported)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-data') {
        event.waitUntil(updateData());
    }
});

async function updateData() {
    // Placeholder for background data sync
    console.log('Service Worker: Background sync triggered');
}

// Push notification support (placeholder)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'Yeni bildirim',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200]
    };
    
    event.waitUntil(
        self.registration.showNotification('Singularity', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});
