import type { Metadata, Viewport } from 'next';
import Layout from '@/components/shared/layout';

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
};

export const metadata: Metadata = {
  title: 'Chat AI',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
