import type { Metadata, Viewport } from 'next';
import Head from 'next/head';
import { Mulish } from 'next/font/google';

import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Chat AI',
  applicationName: 'Chat AI',
  description: 'Conversational chatbot with LLM',
  openGraph: {
    title: 'Chat AI',
    description: 'Conversational chatbot with LLM',
    siteName: 'Chat AI',
    images: [
      {
        url: 'https://chatai-sigma-three.vercel.app/assets/icons/icon-512x512.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/assets/icons/icon.svg' },
      new URL(
        '/assets/icons/icon.svg',
        'https://chatai-sigma-three.vercel.app'
      ),
      // { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      {
        url: '/assets/icons/icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'icon',
        url: '/assets/icons/icon.svg',
        type: 'image/svg+xml',
      },
      {
        rel: 'android-icon-192x192',
        url: '/assets/icons/icon-192x192.png',
        type: 'image/png',
      },
      {
        rel: 'android-icon-144x144',
        url: '/assets/icons/icon-144x144.png',
        type: 'image/png',
      },
      {
        rel: 'android-icon-96x96',
        url: '/assets/icons/icon-96x96.png',
        type: 'image/png',
      },
      {
        rel: 'favicon-32x32',
        url: '/assets/icons/icon-32x32.png',
        type: 'image/png',
      },
      {
        rel: 'favicon-24x24',
        url: '/assets/icons/icon-24x24.png',
        type: 'image/png',
      },
      {
        rel: 'favicon-16x16',
        url: '/assets/icons/icon-16x16.png',
        type: 'image/png',
      },
    ],
  },
};

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
};

import '@/styles/globals.css';
import '@/styles/layout.css';

const font = Mulish({
  weight: ['400', '500', '600', '700'],
  subsets: ['cyrillic', 'latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
        >
          <div className="layout">
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
