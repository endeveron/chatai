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
  // const router = useRouter();
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error.message);
  // }, [error]);

  // return (
  //   <div className="flex flex-col items-center justify-center">
  //     <h2>Oops!</h2>
  //     <p className="mt-4">{error?.message || 'Something went wrong.'}</p>
  //     <div className="mt-8 flex flex-wrap max-xs:gap-4 gap-8">
  //       <Button
  //         onClick={
  //           // Attempt to recover by trying to re-render the segment
  //           () => reset()
  //         }
  //       >
  //         Try again
  //       </Button>
  //       <Button variant="secondary" onClick={() => router.back()}>
  //         Previous page
  //       </Button>
  //     </div>
  //   </div>
  // );

  return <ErrorDialog error={error} onReset={reset} />;
}
