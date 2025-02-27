import { TWithChildren } from '@/lib/types/common.types';

type TSidebarProps = TWithChildren & {};

const Sidebar = async ({ children }: TSidebarProps) => {
  return <div className="sidebar">{children}</div>;
};
Sidebar.displayName = 'Sidebar';

export default Sidebar;
