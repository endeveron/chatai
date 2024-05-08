'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

type TSignInButtonProps = React.ComponentPropsWithRef<typeof Button> & {
  title?: string;
};

const SignInButton = (props: TSignInButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push('/sign-in');
  };

  return (
    <Button onClick={handleClick} loading={loading} {...props}>
      {props?.title || 'Sign In'}
    </Button>
  );
};

export default SignInButton;
