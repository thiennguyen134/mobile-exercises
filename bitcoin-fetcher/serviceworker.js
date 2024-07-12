var cacheName = 'bitcoin-v1';
var filesToCache = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-256x256.png',
  './icons/icon-512x512.png',
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] caching');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('[ServiceWorker] activating');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cName) {
          if (cName !== cacheName) {
            return caches.delete(cName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
 
self.addEventListener('fetch', function (event) {
  console.log('[ServiceWorker] fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log('[ServiceWorker] found in cache', event.request.url);
        return response;
      }
      console.log('[ServiceWorker] network fetch', event.request.url);
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== 
'basic') {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(cacheName).then(function (cache) {
          console.log('[ServiceWorker] putting in cache', 
event.request.url);
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

