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
        'form-loading opacity-0 absolute !m-0 inset-0 flex items-center justify-center bg-card -z-10 bg-opacity-90',
        {
          'z-10 opacity-100': isPending,
        }
      )}
    >
      <div className="form-loading_icon-wrapper">
        <LoadingIcon className="-my-8" />
      </div>
    </div>
  );
};

export default FormLoading;
