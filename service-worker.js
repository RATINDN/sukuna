// service-worker.js

const CACHE_NAME = 'sukuna-pwa-v2'; // نام کش شما
const OFFLINE_URL = '/offline.html'; // آدرس صفحه آفلاین شما

// Resources to cache immediately on install
const CORE_ASSETS = [
  './',
  '/index.html',
  '/manifest.json',
  '/offline.html', // اطمینان حاصل کنید این فایل در روت پروژه موجود است
  '/css/style.css',
  '/css/loginstyle.css',
  '/css/signup.css',
  '/js/cloudflare-jsd.js', // یا pwa-handler.js اگر از آن استفاده می‌کنید
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
  '/images/car-1.avif',
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
  '/login.html', // این صفحات به عنوان دارایی‌های ثانویه کش می‌شوند
  '/signup.html', //
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
        return cache.addAll(CORE_ASSETS); //
      })
      .catch(error => {
        console.error('Failed to cache CORE_ASSETS:', error);
        // این مهم است که بدانید اگر یکی از فایل‌های CORE_ASSETS کش نشود، ممکن است offline.html هم کش نشود.
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
          cache.addAll(SECONDARY_ASSETS).catch(error => { //
            console.log('Background caching error for SECONDARY_ASSETS:', error); //
          });
        });
        return self.clients.claim();
      })
  );
});


// Helper function to handle Netlify's redirect behavior (بدون تغییر)
function isNetlifyRedirect(url) {
  return url.pathname.indexOf('.') === -1 && !url.pathname.endsWith('/'); //
}

// Helper function to try alternative URLs for Netlify (بدون تغییر)
async function tryAlternativeNetlifyUrls(request) {
  const url = new URL(request.url);
  const alternativeUrls = [];
  if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
    alternativeUrls.push(new Request(`${url.origin}${url.pathname}.html${url.search}`)); //
  }
  if (!url.pathname.endsWith('/')) {
    alternativeUrls.push(new Request(`${url.origin}${url.pathname}/index.html${url.search}`)); //
  }
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

  if (event.request.method !== 'GET' ||
      (url.origin !== self.location.origin && !url.href.includes('cdn.jsdelivr.net'))) {
    return;
  }

  if (event.request.mode === 'navigate' ||
      (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(async () => { // اگر شبکه قطع بود یا خطایی رخ داد
          // ابتدا سعی کنید صفحه درخواست شده را از کش پیدا کنید
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // (منطق Netlify بدون تغییر باقی می‌ماند)
          if (isNetlifyRedirect(url)) {
            const netlifyResponse = await tryAlternativeNetlifyUrls(event.request); //
            if (netlifyResponse) {
              return netlifyResponse;
            }
          }

          // اگر صفحه درخواست شده در کش نبود، صفحه آفلاین را نمایش دهید
          try {
            const offlinePageResponse = await caches.match(OFFLINE_URL); //
            if (offlinePageResponse) {
              return offlinePageResponse;
            }
            // اگر حتی صفحه آفلاین هم در کش نبود (که نباید اتفاق بیفتد اگر CORE_ASSETS درست کش شده باشند)
            console.warn(`${OFFLINE_URL} not found in cache. Serving a very basic fallback.`);
            return new Response("شما آفلاین هستید. صفحه آفلاین ما در حال حاضر در دسترس نیست.", {
              status: 503,
              statusText: "Service Unavailable",
              headers: new Headers({ "Content-Type": "text/html; charset=utf-8" })
            });
          } catch (error) {
            console.error('Error fetching offline page:', error);
            return new Response("خطایی هنگام بارگذاری صفحه آفلاین رخ داد.", {
              status: 500,
              statusText: "Internal Server Error",
              headers: new Headers({ "Content-Type": "text/html; charset=utf-8" })
            });
          }
        })
    );
    return;
  }

  // For assets - cache first, then network (stale-while-revalidate) (بدون تغییر)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Stale-while-revalidate: serve from cache and update in background
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(() => {
          // اگر شبکه برای بروزرسانی کش در دسترس نباشد، مشکلی نیست، چون از کش پاسخ داده شده است
        });

        // اگر در کش بود، آن را برگردان و همزمان سعی کن از شبکه آپدیت کنی
        if (cachedResponse) {
          event.waitUntil(fetchPromise); // آپدیت کش را در پس‌زمینه انجام بده
          return cachedResponse;
        }
        // اگر در کش نبود، از شبکه بگیر
        return fetchPromise;
      })
      .catch(() => {
        // مدیریت خطا برای دارایی‌هایی که نه در کش هستند و نه از شبکه قابل دریافتند
        if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) {
          // می‌توانید یک تصویر placeholder برگردانید اگر دارید
          // return caches.match('/images/placeholder.svg');
        }
        // برای سایر منابع
        return new Response('محتوای آفلاین در دسترس نیست', {
          status: 404, // یا 503
          statusText: 'Not Found', // یا 'Service Unavailable'
          headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
        });
      })
  );
});

// Periodic cache update when online (بدون تغییر)
self.addEventListener('sync', (event) => {
  if (event.tag === 'update-cache') { //
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

// Listen for messages from the client (بدون تغییر)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') { //
    self.skipWaiting();
  }
});