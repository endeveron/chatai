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
    <div className="error flex w-full flex-col items-center px-4 py-20">
      <h2>Oops!</h2>
      <p className="mt-4">{error?.message || 'Something went wrong.'}</p>
      <div className="mt-8 flex flex-wrap max-xs:gap-4 gap-8">
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
