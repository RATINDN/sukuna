const CACHE_NAME = 'sukuna-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/js/server.js',
  '/js/js.js',
  '/js/backbutton.js',
  '/install.js',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  '/images/car 1.avif',
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
  '/images/man.webp',
  '/images/woman.webp',
  '/images/x-lg.svg'
];

// Install event: Cache the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache); // Add all URLs to cache
      })
      .then(() => self.skipWaiting()) // Activate worker immediately
  );
});

// Fetch event: Serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - return fetch from network
        return fetch(event.request);
      }
    )
  );
});

// Activate event: Remove old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete caches that are not in the whitelist
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
      .then(() => self.clients.claim()) // Take control of all clients
  );
});