'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

import LoadingIcon from '@/components/shared/loading-icon';
import MenuDotsVButton from '@/components/shared/menu-dots-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/lib/hooks/useTheme';
import SignOutIcon from '@/public/assets/ui/sign-out.svg';

type TMenuProps = {};

const MainMenu = (props: TMenuProps) => {
  const { toggleTheme } = useTheme();
  const [signoutPending, setSignoutPending] = useState(false);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handleSignOut = () => {
    setSignoutPending(true);
    signOut();
  };

  return (
    <div className="main-menu h-6">
      {signoutPending && (
        <div className="fixed z-40 inset-0 bg-background/90 flex flex-col items-center justify-center transition-colors">
          <LoadingIcon />
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuDotsVButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleToggleTheme}>
            Toggle Theme
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <SignOutIcon className="icon menu-icon flip-y" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

MainMenu.displayName = 'MainMenu';

export default MainMenu;
