"use strict";
var CACHE = "vaultkey-v28";
self.addEventListener("install", function(e) { self.skipWaiting(); });
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
    }).then(function(){ self.clients.claim(); })
  );
});
self.addEventListener("fetch", function(e) {
  e.respondWith(fetch(e.request).catch(function(){ return caches.match(e.request); }));
});
