const staticWebScraper = "simple-web-scraper"
const assets = [
  "/",
  "/offline/events.ejs",
  "/css/bootstrap.min.css"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticWebScraper).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
