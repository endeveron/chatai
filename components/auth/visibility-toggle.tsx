'use client';

import { useState } from 'react';

import Eye from '@/public/assets/ui/eye.svg';
import EyeSlash from '@/public/assets/ui/eye-slash.svg';

type TVisibilityToggleProps = {
  onClick: () => void;
};

const VisibilityToggle = ({ onClick }: TVisibilityToggleProps) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible((prev) => !prev);
    onClick();
  };

  return (
    <div className="test" onClick={handleClick}>
      {visible ? <EyeSlash /> : <Eye />}
    </div>
  );
};

export default VisibilityToggle;
