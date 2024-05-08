// Error components must be Client Components
// See https://nextjs.org/docs/app/building-your-application/routing/error-handling
'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import ErrorComponent from '@/components/shared/error-dialog';
// import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error.message);
  // }, [error]);

  return <ErrorComponent error={error} onReset={reset} />;
}
