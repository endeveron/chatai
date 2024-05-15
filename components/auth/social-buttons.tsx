'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

import FormLoading from '@/components/shared/form-loading';
import { Button } from '@/components/ui/button';
import { useErrorHandler } from '@/lib/hooks/error';
import { SocialProvider } from '@/lib/types/auth.types';
import { DEFAULT_REDIRECT } from '@/routes';

type TSocialButtonsProps = {};

const SocialButtons = (props: TSocialButtonsProps) => {
  const { toastError } = useErrorHandler();
  const [isPending, setPending] = useState(false);

  const handleClick = async (provider: SocialProvider) => {
    try {
      setPending(true);
      await signIn(provider, {
        callbackUrl: DEFAULT_REDIRECT,
      });
    } catch (err: any) {
      toastError(err);
      setPending(false);
    }
  };

  return (
    <div className="social-buttons relative flex flex-col gap-4">
      <p className="text-center text-sm text-muted-foreground">or</p>
      <Button
        onClick={() => handleClick(SocialProvider.google)}
        type="button"
        variant="outline"
      >
        Sign In with Google
      </Button>
      <FormLoading isPending={isPending} />
    </div>
  );
};

export default SocialButtons;
