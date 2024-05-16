import type { Metadata } from 'next';

import '@/styles/auth.css';

export const metadata: Metadata = {
  title: 'Authentication | Chat AI',
  description: '',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex items-center justify-center">{children}</main>;
}
