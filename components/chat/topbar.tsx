'use client';

import { TWithChildren } from '@/lib/types/common.types';
import { cn } from '@/lib/utils';

type TTopbarProps = TWithChildren & {
  className?: string;
};

const Topbar = ({ className, children }: TTopbarProps) => {
  return (
    <div className={cn('topbar flex items-center px-4', className)}>
      {children}
    </div>
  );
};

export default Topbar;
