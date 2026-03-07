const CACHE_NAME = 'khinkali-dash-v3';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './timerWorker.js',
    './logo.png',
    './favicon.png',
    './alarm_en.mp3',
    './alarm_ka.mp3'
];

// Install Event: Cache essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching App Shell');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// Fetch Event: Serve from Cache, Fallback to Network
self.addEventListener('fetch', (event) => {
    // We only want to cache our local assets, not HackerNews API calls
    if (event.request.url.includes('hacker-news.firebaseio.com')) {
        return; // Let the browser handle external API requests normally
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Return strictly from cache (Offline Support)
                }
                return fetch(event.request).then((networkResponse) => {
                    // Dynamic caching for any new assets encountered
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                });
            })
    );
});
