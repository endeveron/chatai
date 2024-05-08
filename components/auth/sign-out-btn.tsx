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
    <div onClick={handleClick} className="sign-out-btn absolute top-5 left-4">
      {pending ? (
        <LoadingIcon />
      ) : (
        <SignOutIcon className="action-icon flip-y" />
      )}
    </div>
  );
};

export default SignOutButton;
