'use client';

import { usePathname, useRouter } from 'next/navigation';

import Avatar from '@/components/chat/avatar';
import { TChatItem } from '@/lib/types/chat.types';
import { cn } from '@/lib/utils';

type TChatItemProps = TChatItem & {};

const ChatItemDev = ({ chatId, title, person }: TChatItemProps) => {
  const router = useRouter();
  const path = usePathname();

  // Split the path
  const pathItems = path.split('/');
  const email = pathItems.at(-1);

  const chatPath = `/dev/${chatId}/${email}`;
  const isActive = path === chatPath;

  const openChat = () => {
    router.push(chatPath);
  };
  return (
    <div
      className={cn('chat-item flex items-center', {
        active: isActive,
      })}
      onClick={openChat}
      role="listitem"
    >
      <div className="chat-item_avatar">
        <Avatar avatarKey={person.avatarKey} avatarBlur={person.avatarBlur} />
      </div>
      <div className="flex flex-col ml-4 min-w-0">
        <div className="chat-item_name font-bold elipsis">{title}</div>
        <div className="chat-item_status text-sm elipsis opacity-60 mt-0.5">
          {person.status}
        </div>
      </div>
    </div>
  );
};

export default ChatItemDev;
