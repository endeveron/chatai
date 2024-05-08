import MenuIcon from '@/public/assets/ui/menu.svg';

type TMenuProps = {};

const MenuButton = async (props: TMenuProps) => {
  return <MenuIcon className="icon cursor-pointer" />;
};

MenuButton.displayName = 'MenuButton';

export default MenuButton;
