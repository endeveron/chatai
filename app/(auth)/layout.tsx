import type { Metadata, Viewport } from 'next';
import Layout from '@/components/shared/layout';

import '@/styles/auth.css';

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
};

export const metadata: Metadata = {
  title: 'Authentication | Chat AI',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout isAlignCenter={true}>{children}</Layout>;
}
