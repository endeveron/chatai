'use client';

import { useRouter } from 'next/navigation';

import { TWithChildren } from '@/lib/types/common.types';
import NavbackIcon from '@/public/assets/ui/shevron-left.svg';

type TTopbarHeaderProps = TWithChildren & {
  title: string;
  navPath?: string;
};

const TopbarHeader = ({ title, navPath, children }: TTopbarHeaderProps) => {
  const router = useRouter();

  const handleNavigate = () => {
    if (!navPath) return;
    if (navPath === '-1') router.back();
    else router.push(navPath);
  };

  const navEl = !!navPath && (
    <div className="navback mr-3 -ml-1" onClick={handleNavigate}>
      <NavbackIcon className="action-icon" />
    </div>
  );

  return (
    <header className="topbar-header w-full flex items-center">
      {navEl}
      <h2 className="title w-full flex justify-center">{title}</h2>
      {children}
    </header>
  );
};

export default TopbarHeader;
