import MenuDotsIcon from '@/public/assets/ui/menu-dots-v.svg';

type TMenuDotsVButtonProps = {
  onClick?: () => void;
};

const MenuDotsVButton = ({ onClick }: TMenuDotsVButtonProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return <MenuDotsIcon onClick={handleClick} className="action-icon" />;
};

MenuDotsVButton.displayName = 'MenuDotsVButton';

export default MenuDotsVButton;
