importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/6.5.4/workbox-sw.min.js')

workbox.routing.registerRoute(({ request }) => {
    return request.destination === 'image';
}, new workbox.strategies.NetworkFirst())