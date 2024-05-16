'use client';

import { signOut } from 'next-auth/react';
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
import { useTheme } from '@/lib/hooks/useTheme';
import LightbulbIcon from '@/public/assets/ui/lightbulb.svg';
import MoonIcon from '@/public/assets/ui/moon.svg';
import SignOutIcon from '@/public/assets/ui/sign-out.svg';
import { User } from 'next-auth';
import { TUserData } from '@/lib/types/user.types';

type TMenuProps = {
  user: TUserData;
};

const MainMenu = ({ user }: TMenuProps) => {
  const { toggleTheme } = useTheme();
  const [signoutPending, setSignoutPending] = useState(false);
  const [theme, setTheme] = useState('');

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSignOut = () => {
    setSignoutPending(true);
    signOut();
  };

  useEffect(() => {
    const lsTheme = localStorage.getItem('theme');
    setTheme(lsTheme || 'light');
  }, []);

  const themeIcon =
    theme === 'light' ? (
      <MoonIcon className="menu-icon" />
    ) : (
      <LightbulbIcon className="menu-icon" />
    );

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
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

MainMenu.displayName = 'MainMenu';

export default MainMenu;
