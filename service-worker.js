const CACHE_NAME = 'v2';
const ASSETS = [
  '/',
  '/index.html',
  '/login.html',
  '/css/style.css',
  '/js/js.js',
  '/js/server.js',
  '/backbutton.js',
  '/install.js',
  '/manifest.json',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  '/images/icon-152x152.png',
  '/images/icon-180x180.png',
  '/images/icon-167x167.png',
  '/images/splash-640x1136.png',
  '/images/car 1.avif',
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
  '/images/man.webp',
  '/images/woman.webp',
  '/images/ios-install-guide.jpg' // Add the new image here
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});