// Error components must be Client Components
// See https://nextjs.org/docs/app/building-your-application/routing/error-handling
'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
// import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error.message);
  // }, [error]);

  return (
    <>
      <h2>Oops!</h2>
      <p className="mt-4">{error?.message || 'Something went wrong.'}</p>
      <div className="mt-8 flex flex-wrap max-xs:gap-4 gap-8">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
        <Button variant="secondary" onClick={() => router.back()}>
          Previous page
        </Button>
      </div>
    </>
  );
}
