'use client';

import { signIn } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { SocialProvider } from '@/lib/types/auth.types';
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';
import { useErrorHandler } from '@/lib/hooks/error';
import { cn } from '@/lib/utils';

type TSocialButtonsProps = {};

const SocialButtons = (props: TSocialButtonsProps) => {
  const { toastError } = useErrorHandler();
  const [isPending, setPending] = useState(false);

  const handleClick = async (provider: SocialProvider) => {
    try {
      setPending(true);
      await signIn(provider, {
        callbackUrl: DEFAULT_SIGNIN_REDIRECT,
      });
    } catch (err: any) {
      toastError(err);
      setPending(false);
    }
  };

  return (
    <div
      className={cn('social-buttons flex flex-col gap-4', {
        'inactive opacity-40 transition-opacity': isPending,
      })}
    >
      <p className="text-center text-sm text-muted-foreground">or</p>
      <Button
        onClick={() => handleClick(SocialProvider.google)}
        type="button"
        variant="outline"
      >
        Sign In with Google
      </Button>
    </div>
  );
};

export default SocialButtons;
