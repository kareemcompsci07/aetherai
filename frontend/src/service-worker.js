/**
 * AetherAI - Service Worker for PWA Offline Mode
 * File: service-worker.js
 * Purpose: Enable offline functionality and installability
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI education accessible even without internet.
 */

const CACHE_NAME = 'aetherai-v2.9';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/favicon.ico',
  '/assets/logo.png',
  '/assets/robots.txt',
  '/assets/manifest.json',
  '/static/css/*.css',
  '/static/js/*.js',
  '/static/media/*'
];

// Install event - Cache core assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
          .then(() => {
            console.log('Service Worker: Core assets cached');
          })
          .catch(err => {
            console.error('Service Worker: Caching failed:', err);
          });
      })
  );
  
  // Force immediate activation
  self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event - Serve from cache or network
self.addEventListener('fetch', (event) => {
  // Don't cache API requests or dynamic content
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('/upload') ||
      event.request.url.includes('/training')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Return cached fallback for API if available
          return caches.match('/');
        })
    );
    return;
  }

  // For other requests, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Otherwise, fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Don't cache bad responses
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Clone response for cache and return
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return networkResponse;
          });
      })
      .catch(() => {
        // Fallback to cached index.html for offline navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New AI experiment available!',
    icon: '/assets/logo.png',
    badge: '/assets/badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('AetherAI', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Background sync (future enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-experiments') {
    event.waitUntil(
      syncOfflineExperiments()
    );
  }
});

// Function to sync offline experiments when connection returns
function syncOfflineExperiments() {
  // This would sync saved experiments to the server
  console.log('Syncing offline experiments...');
  return Promise.resolve();
}

// Client message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Registered successfully');
