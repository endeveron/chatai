'use client';

import { cn } from '@/lib/utils';
import LoadIcon from '@/public/assets/ui/loading.svg';

type TLoadingIconProps = {
  className?: string;
};

const LoadingIcon = ({ className }: TLoadingIconProps) => {
  return (
    <div className={cn('loading-icon', className)}>
      <LoadIcon />
    </div>
  );
};

export default LoadingIcon;
