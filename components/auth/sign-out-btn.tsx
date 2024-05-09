'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

import LoadingIcon from '@/components/shared/loading-icon';
import SignOutIcon from '@/public/assets/ui/sign-out.svg';

const SignOutButton = () => {
  const [pending, setPending] = useState(false);

  const handleClick = () => {
    setPending(true);
    signOut();
  };
  return (
    <div onClick={handleClick} className="sign-out-btn">
      {pending ? (
        <LoadingIcon />
      ) : (
        <div className="flex gap-4 cursor-default">
          <SignOutIcon className="icon opacity-40 flip-y" />
          Sign Out
        </div>
      )}
    </div>
  );
};

export default SignOutButton;
