const CacheName = 'Cache:v1'

self.addEventListener('install',(event)=>{
    console.log('ServiceWorker install:', event)
})

self.addEventListener('activate',(event)=>{
    console.log('SeviceWorker activate:', event)
})

const netWorkFallingBackToCache = async(request)=>{
    const cache = await caches.open(CacheName)
    try {
        const response = await fetch(request)
        await cache.put(request,response.clone())
        return response
    } catch (err) {
        console.log(err)
        return cache.match(request)
    }
}

self.addEventListener('fetch',(event)=>{
    event.respondWith(netWorkFallingBackToCache(event.request))
})