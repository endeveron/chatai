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
        src: '/assets/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
