import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zooco.pet',
    short_name: 'Zooco',
    description: 'Reminder / Tracker for your dogs',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
 "icons": [
    {
      "src": "/icons/192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],

  }
}