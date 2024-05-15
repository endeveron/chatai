import LoadingIcon from '@/components/shared/loading-icon';
import { cn } from '@/lib/utils';

const LoadingFragment = () => {
  return (
    <div
      className={cn(
        'loading opacity-0 w-full flex items-center justify-center bg-background/70 transition-opacity'
      )}
    >
      <LoadingIcon />
    </div>
  );
};

export default LoadingFragment;
