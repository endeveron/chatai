import type { Metadata } from 'next';

import '@/styles/auth.css';

export const metadata: Metadata = {
  title: 'Chat AI - Authentication',
  description: '',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-center justify-center bg-area fade">
      {children}
    </main>
  );
}
