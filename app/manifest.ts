import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chat AI',
    short_name: 'Chat AI',
    description: 'Conversational chatbot',
    start_url: '/',
    display: 'standalone',
    background_color: '#1b171c', // --primary
    theme_color: '#1b171c',
    icons: [
      {
        src: '/assets/icons/favicon.ico',
        sizes: '256x256 192x192 128x128 96x96 64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: '/assets/icons/icon-512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-384.png',
        type: 'image/png',
        sizes: '384x384',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-256.png',
        type: 'image/png',
        sizes: '256x256',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-152.png',
        type: 'image/png',
        sizes: '152x152',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-144.png',
        type: 'image/png',
        sizes: '144x144',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-128.png',
        type: 'image/png',
        sizes: '128x128',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-96.png',
        type: 'image/png',
        sizes: '96x96',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-72.png',
        type: 'image/png',
        sizes: '72x72',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-64.png',
        type: 'image/png',
        sizes: '64x64',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        src: '/assets/icons/icon-24.png',
        type: 'image/png',
        sizes: '24x24',
      },
      {
        src: '/assets/icons/icon-16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
  };
}
