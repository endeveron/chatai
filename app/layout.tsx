import type { Metadata, Viewport } from 'next';
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
      {
        url: 'https://chatai-sigma-three.vercel.app/assets/icons/icon-256x256.png', // Must be an absolute URL
        width: 256,
        height: 256,
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
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
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
