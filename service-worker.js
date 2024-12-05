const CACHE_NAME = "v1_cache_portafolio_cdvc";
const urlsToCache = [
    "./", // Cachea la raíz de la aplicación
    "./index.html",
    "./assets/stylesheet/loader.css",
    "./assets/stylesheet/index.css",
    "./assets/stylesheet/tablet.css",
    "./assets/stylesheet/desktop.css",
    "./assets/images/favicon.png",
    "./assets/images/image-home.png",
    "./assets/images/logo-ma.png",
    "./assets/images/icon-html.png",
    "./assets/images/icon-css.png",
    "./assets/images/icon-js.png",
    "./assets/images/icon-python.png",
    "./assets/images/icon-sql.png",
    "./assets/images/icon-mongodb.png",
    "./assets/images/icon-flutter.png",
    "./assets/images/icon-github-hab.png",
];

// Evento 'install' para almacenar en caché los recursos
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Evento 'fetch' para interceptar las solicitudes de red y servir el contenido cacheado si está disponible
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Evento 'activate' para limpiar el caché cuando se actualiza la PWA
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
