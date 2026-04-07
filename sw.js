// Service Worker Minimal para CabañaApp PWA
// Necesario para que Android/iOS detecte la web como instalable

const CACHE_NAME = 'cabaña-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css'
];

// Instalar SW y cachear recursos estáticos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Responder desde caché si offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
