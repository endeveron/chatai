'use client';

import Typing from '@/components/chat/typing';
import { cn } from '@/lib/utils';

type TLoadingIconProps = {
  className?: string;
};

const LoadingIcon = ({ className }: TLoadingIconProps) => {
  return (
    <div className={cn('loading-icon', className)}>
      <Typing />
    </div>
  );
};

export default LoadingIcon;
