// Error components must be Client Components
// See https://nextjs.org/docs/app/building-your-application/routing/error-handling
'use client';

import ErrorDialog from '@/components/shared/error-dialog';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorDialog error={error} onReset={reset} />;
}
