import DialogCard from '@/components/shared/dialog-card';
import GenerateTokenButton from '@/components/auth/generate-token-button';
import { emailErrors } from '@/lib/data/errors';
import { getErrorMessageFromSearchParams } from '@/lib/utils/error';

type TPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = ({ searchParams }: TPageProps) => {
  const email = searchParams.e as string;
  const errorCode = searchParams.c as string;

  if (!email || !errorCode) {
    throw new Error('Invalid url search params.');
  }

  const errorMessage = getErrorMessageFromSearchParams(
    searchParams,
    emailErrors
  );

  return (
    <DialogCard title={`Oops! ${errorMessage}`}>
      <GenerateTokenButton email={email} />
    </DialogCard>
  );
};

export default Page;
