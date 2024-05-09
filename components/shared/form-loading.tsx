'use client';

import LoadingIcon from '@/components/shared/loading-icon';
import { cn } from '@/lib/utils';

type TFormLoadingProps = {
  isPending: boolean;
};

const FormLoading = ({ isPending }: TFormLoadingProps) => {
  return (
    <div
      className={cn(
        'form-loading opacity-0 absolute !m-0 inset-0 flex items-center justify-center bg-card/90 -z-10 transition-opacity',
        {
          'z-10 opacity-100': isPending,
        }
      )}
    >
      <div className="form-loading_icon-wrapper">
        <LoadingIcon className="-my-6" />
      </div>
    </div>
  );
};

export default FormLoading;
