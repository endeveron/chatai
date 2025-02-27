import { redirect } from 'next/navigation';

import { verifyEmailToken } from '@/lib/actions/auth.actions';
import { DEFAULT_REDIRECT } from '@/routes';

type TPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = async ({ searchParams }: TPageProps) => {
  const email = searchParams.e as string;
  const token = searchParams.t as string;
  const userObjId = searchParams.i as string;

  if (!email || !token) {
    throw new Error('Unable to verify user email.');
  }

  // Verify the token
  const res = await verifyEmailToken({
    userObjId,
    token,
  });

  if (!res.success) {
    // Get error code. See EmailErrorCodes
    if (res?.success === false) {
      const errCode = res.error.code as number;
      redirect(`/email/error?c=${errCode}&e=${email}`);
    }
    throw new Error('Unable to verify email token.');
  }

  if (res.data === 'created') redirect(DEFAULT_REDIRECT);
  if (res.data === 'onboard') redirect(`/onboarding?t=${userObjId}`);
};

export default Page;
