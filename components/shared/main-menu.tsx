'use client';

import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import LoadingIcon from '@/components/shared/loading-icon';
import MenuDotsVButton from '@/components/shared/menu-dots-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LightbulbIcon from '@/public/assets/ui/lightbulb.svg';
import MoonIcon from '@/public/assets/ui/moon.svg';
import SignOutIcon from '@/public/assets/ui/sign-out.svg';
import { User } from 'next-auth';
import { TUserData } from '@/lib/types/user.types';
import { cn } from '@/lib/utils';

type TMenuProps = {
  user: TUserData;
  className?: string;
};

const MainMenu = ({ user, className }: TMenuProps) => {
  const { setTheme, theme } = useTheme();
  const [signoutPending, setSignoutPending] = useState(false);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleSignOut = () => {
    setSignoutPending(true);
    signOut();
  };

  const themeIcon =
    theme === 'light' ? (
      <MoonIcon className="menu-icon" />
    ) : (
      <LightbulbIcon className="menu-icon" />
    );

  return (
    <div className={cn('main-menu h-6', className)}>
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
          {user && (
            <>
              <div className="main-menu_user-data cursor-default px-4 pt-4 pb-2">
                <div className="text-lg font-bold">{user.name}</div>
                <div className="text-sm text-secondary-foreground">
                  {user.email}
                </div>
              </div>
            </>
          )}

          <DropdownMenuItem onClick={handleSignOut}>
            <SignOutIcon className="menu-icon flip-y" />
            Sign Out
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleToggleTheme}>
            {themeIcon}
            {theme === 'light' ? 'Dark' : 'Light'} Theme
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

MainMenu.displayName = 'MainMenu';

export default MainMenu;
