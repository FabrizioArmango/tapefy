const cacheName = `tapefy-1`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
          `/`,
          `/index.html`,
          `/lib/bootstrap.min.css`,
          `/lib/font-awesome.min.css`,
          `/lib/app.css`,
          `/lib/cookies.js`,
          `/lib/navbar.js`,
          `/lib/player.js`,

        ])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
    .then(cache => cache.match(event.request, {
      ignoreSearch: true
    }))
    .then(response => {
      return response || fetch(event.request);
    })
  );
});
