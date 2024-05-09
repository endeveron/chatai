'use client';

import { useEffect } from 'react';
import { useTheme } from '@/lib/hooks/useTheme';

type TThemeInitProps = {};

const ThemeInit = (props: TThemeInitProps) => {
  const { initTheme } = useTheme();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return <></>;
};

export default ThemeInit;
