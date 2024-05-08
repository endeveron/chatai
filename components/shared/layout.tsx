import { Mulish } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { TWithChildren } from '@/lib/types/common.types';

import '@/styles/globals.css';
import '@/styles/layout.css';
import { cn } from '@/lib/utils';

const font = Mulish({
  weight: ['400', '500', '600', '700'],
  subsets: ['cyrillic', 'latin'],
});

type TLayoutProps = TWithChildren & {
  isAlignCenter?: boolean;
};

const Layout = async ({ children, isAlignCenter }: TLayoutProps) => {
  return (
    // <html lang="en" className="dark">
    <html lang="en">
      <body className={font.className}>
        <div
          className={cn('layout', {
            'align-center': isAlignCenter,
          })}
        >
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
};

Layout.displayName = 'Layout';

export default Layout;
