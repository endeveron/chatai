'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type TErrorProps = {
  error: Error & { digest?: string };
  onReset: () => void;
};

const ErrorDialog = ({ error, onReset }: TErrorProps) => {
  const router = useRouter();

  return (
    <div className="card rounded-xl w-full max-w-[420px] flex flex-col items-center p-8 m-auto">
      <h2 className="cursor-default">Oops!</h2>
      <p className="!mt-5 text-sm">
        {error?.message || 'Something went wrong.'}
      </p>
      <div className="mt-7 flex flex-wrap max-xs:gap-4 gap-8">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => onReset()
          }
        >
          Try again
        </Button>
        <Button variant="secondary" onClick={() => router.back()}>
          Previous page
        </Button>
      </div>
    </div>
  );
};

ErrorDialog.displayName = 'ErrorDialog';

export default ErrorDialog;
