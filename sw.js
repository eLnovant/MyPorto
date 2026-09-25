const CACHE_NAME = 'cybernexus-cache-v6';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-192-maskable.png',
  '/icon-512-maskable.png',
  '/css/variables.css',
  '/css/reset.css',
  '/css/components.css',
  '/css/animations.css',
  '/css/layout.css',
  '/css/terminal.css',
  '/js/Porto.js',
  '/js/script.js',
  '/js/matrix.js',
  '/js/boot.js',
  '/js/tampilan.js',
  '/js/terminal.js',
  '/js/terminalCommands.js',
  '/js/map-sw.js',
  '/Farid.jpg',
  '/Farid.webp'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell and assets');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests that might violate CSP
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    // Don't intercept cross-origin requests - let browser handle them
    return;
  }
  
  if (event.request.url.includes('/api/') || event.request.url.includes('/ws/') || event.request.url.startsWith('chrome-extension:')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, networkResponse);
                });
              }
            })
            .catch(err => {
              console.log('[Service Worker] Background fetch failed (offline):', err);
            });
          return cachedResponse;
        }

        return fetch(event.request);
      })
  );
});

self.addEventListener('push', event => {
  let data = { title: 'CYBERNEXUS ALERT', body: 'Secure system connection broadcast received.' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'CYBERNEXUS ALERT', body: event.data.text() };
    }
  }

  const options = {
    body: data.body,
    icon: '/Farid.jpg',
    badge: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      { action: 'open', title: 'ACCESS_SYSTEM' },
      { action: 'close', title: 'DISMISS' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const options = {
      body: event.data.body || 'No details provided.',
      icon: '/Farid.jpg',
      badge: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        { action: 'open', title: 'EXECUTE' },
        { action: 'close', title: 'DISMISS' }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(event.data.title || 'CYBERNEXUS PROTOCOL', options)
    );
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open' || event.action === 'execute') {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url.includes('/') && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});
