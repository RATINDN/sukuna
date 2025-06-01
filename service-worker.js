const CACHE_NAME = 'sukuna-pwa-v2';
const OFFLINE_URL = '/offline.html';

// Resources to cache immediately on install
const CORE_ASSETS = [
  './', 
  '/index.php',
  '/manifest.json',
  '/offline.html',
  '/css/style.css',
  '/css/loginstyle.css',
  '/css/signup.css',
  '/js/cloudflare-jsd.js',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png'
];

// Additional resources to cache when possible
const SECONDARY_ASSETS = [
  '/js/server.js',
  '/js/js.js',
  '/js/backbutton.js',
  '/js/login.js',
  '/js/signup.js',
  '/js/login signup.js',
  '/install.js',
  '/images/car-1.webp',
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
  '/images/man.webp',
  '/images/woman.webp',
  '/images/x-lg.svg',
  '/images/ki.jpg',
  '/login.php',
  '/signup.php',
  'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching core resources...');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Cache secondary assets in the background
        caches.open(CACHE_NAME).then(cache => {
          console.log('Caching secondary resources in background...');
          cache.addAll(SECONDARY_ASSETS).catch(error => {
            console.log('Background caching error:', error);
          });
        });
        
        return self.clients.claim();
      })
  );
});

// Helper function to handle Netlify's redirect behavior
function isNetlifyRedirect(url) {
  // Netlify often serves /page instead of /page.html or /page/index.html
  return url.pathname.indexOf('.') === -1 && !url.pathname.endsWith('/');
}

// Helper function to try alternative URLs for Netlify
async function tryAlternativeNetlifyUrls(request) {
  const url = new URL(request.url);
  const alternativeUrls = [];
  
  // Try with .html extension
  if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
    alternativeUrls.push(new Request(`${url.origin}${url.pathname}.html${url.search}`));
  }
  
  // Try with /index.html
  if (!url.pathname.endsWith('/')) {
    alternativeUrls.push(new Request(`${url.origin}${url.pathname}/index.html${url.search}`));
  }
  
  // Try each alternative URL
  for (const altRequest of alternativeUrls) {
    const cachedResponse = await caches.match(altRequest);
    if (cachedResponse) {
      return cachedResponse;
    }
  }
  
  return null;
}

// Fetch event - network-first for HTML, cache-first for assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests and browser extensions
  if (event.request.method !== 'GET' || 
      url.origin !== self.location.origin && 
      !url.href.includes('cdn.jsdelivr.net')) {
    return;
  }
  
  // HTML pages - network first, then cache, then offline page
  if (event.request.mode === 'navigate' || 
      event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the latest version
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(async () => {
          // Try from cache
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Try alternative URLs for Netlify
          if (isNetlifyRedirect(url)) {
            const netlifyResponse = await tryAlternativeNetlifyUrls(event.request);
            if (netlifyResponse) {
              return netlifyResponse;
            }
          }
          
          // Fallback to offline page
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }
  
  // For assets - cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cached response and update cache in background
          // This implements a stale-while-revalidate strategy
          const updateCache = fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.ok) {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, networkResponse.clone());
                });
              }
            })
            .catch(() => {
              // Network request failed, but we already have cached version
            });
            
          // Don't wait for the cache update
          event.waitUntil(updateCache);
          return cachedResponse;
        }
        
        // Not in cache, get from network
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cache the response for future
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
            
            return response;
          })
          .catch(() => {
            // For images, return a placeholder if available
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) {
              return caches.match('/images/placeholder.svg');
            }
            
            // For other resources
            return new Response('Offline content not available', {
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

// Periodic cache update when online
self.addEventListener('sync', (event) => {
  if (event.tag === 'update-cache') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return Promise.all([...CORE_ASSETS, ...SECONDARY_ASSETS].map(url => {
          return fetch(url).then(response => {
            if (response && response.ok) {
              return cache.put(url, response);
            }
          }).catch(error => {
            console.log('Failed to update cache for:', url, error);
          });
        }));
      })
    );
  }
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});