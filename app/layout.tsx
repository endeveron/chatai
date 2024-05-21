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
    type: 'website',
    images: [
      {
        url: 'https://chatai-sigma-three.vercel.app/assets/icons/icon-512.png',
        width: 512,
        height: 512,
      },
    ],
  },
  icons: {
    icon: {
      url: '/assets/icons/icon.svg',
      type: 'image/svg+xml',
    },
    shortcut: {
      url: '/assets/icons/icon.svg',
      type: 'image/svg+xml',
    },
    apple: [
      {
        url: '/assets/icons/icon-180.png',
        sizes: '180x180',
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
