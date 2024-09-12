const PRECACHE = 'cache-v3';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
  'index.html',
  './',
  'img/cocktails/jagerbomb.jpg',
  'img/cocktails/mojito.jpg',
  'img/cocktails/orgasme.jpg',
  'img/cocktails/tequila-sunrise.jpg',
  'img/icons/bottle.svg',
  'img/icons/cocktail.svg',
  'img/icons/control.svg',
  'img/icons/led-strip.svg',
  'img/icons/log.svg',
  'img/cocktail.svg',
  'img/cocktail.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin) && self.location.hostname !== 'localhost') {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});