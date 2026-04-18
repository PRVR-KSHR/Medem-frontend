const CACHE_NAME = 'medem-v1'
const CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
]

// Emergency hospitals database - cached locally
const nearbyHospitalsDB = {
  'bihar': [
    { name: 'City General Hospital', distance: '5.2 km', phone: '+91-98765-43210', lat: 25.5941, lon: 85.1376 },
    { name: 'Rural Medical Center', distance: '8.7 km', phone: '+91-98765-43211', lat: 25.5841, lon: 85.1276 },
    { name: 'Government Hospital', distance: '12.3 km', phone: '+91-98765-43212', lat: 25.5741, lon: 85.1176 },
    { name: 'District Medical College', distance: '18.9 km', phone: '+91-98765-43213', lat: 25.5641, lon: 85.1076 },
    { name: 'Tehsil Hospital', distance: '22.1 km', phone: '+91-98765-43214', lat: 25.5541, lon: 85.0976 }
  ],
  'jharkhand': [
    { name: 'Ranchi Medical Center', distance: '4.5 km', phone: '+91-98765-43220', lat: 23.3441, lon: 85.3096 },
    { name: 'District Hospital', distance: '9.2 km', phone: '+91-98765-43221', lat: 23.3341, lon: 85.2996 },
    { name: 'Emergency Care Unit', distance: '14.8 km', phone: '+91-98765-43222', lat: 23.3241, lon: 85.2896 }
  ],
  'west-bengal': [
    { name: 'Kolkata Metropolitan Hospital', distance: '6.3 km', phone: '+91-98765-43230', lat: 22.5726, lon: 88.3639 },
    { name: 'City Medical Center', distance: '11.5 km', phone: '+91-98765-43231', lat: 22.5626, lon: 88.3539 },
    { name: 'Emergency Response Center', distance: '16.7 km', phone: '+91-98765-43232', lat: 22.5526, lon: 88.3439 }
  ],
  'default': [
    { name: 'Nearest Hospital', distance: '5 km', phone: '+91-100', lat: 0, lon: 0 },
    { name: 'Emergency Center', distance: '8 km', phone: '+91-102', lat: 0, lon: 0 }
  ]
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS).catch(() => {
        // Silently fail if network is unavailable during install
        return Promise.resolve()
      })
    })
  )
})

self.addEventListener('fetch', (event) => {
  // Handle API requests for nearby hospitals
  if (event.request.url.includes('/api/nearby-hospitals')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cache = caches.open(CACHE_NAME)
          cache.then((c) => c.put(event.request, response.clone()))
          return response
        })
        .catch(() => {
          // Return cached hospitals if offline
          const region = new URL(event.request.url).searchParams.get('region') || 'default'
          const hospitals = nearbyHospitalsDB[region] || nearbyHospitalsDB['default']
          return new Response(JSON.stringify({ success: true, data: hospitals, cached: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        })
    )
    return
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'basic') {
            return response
          }
          const cache = caches.open(CACHE_NAME)
          cache.then((c) => c.put(event.request, response.clone()))
          return response
        })
      )
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
