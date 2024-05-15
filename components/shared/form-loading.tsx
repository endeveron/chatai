'use client';

import LoadingIcon from '@/components/shared/loading-icon';
import { cn } from '@/lib/utils';

type TFormLoadingProps = {
  isPending: boolean;
  loadigIconClassName?: string;
};

const FormLoading = ({ isPending, loadigIconClassName }: TFormLoadingProps) => {
  return (
    <div
      className={cn(
        'form-loading opacity-0 absolute !m-0 inset-0 flex items-center justify-center bg-card/90 -z-10 transition-opacity',
        {
          'z-10 opacity-100': isPending,
        }
      )}
    >
      <div className={cn(loadigIconClassName)}>
        <LoadingIcon />
      </div>
    </div>
  );
};

export default FormLoading;
