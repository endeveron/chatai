'use client';

import { usePathname, useRouter } from 'next/navigation';

import Avatar from '@/components/chat/avatar';
import { TChatItem } from '@/lib/types/chat.types';
import { cn } from '@/lib/utils';

type TChatItemProps = TChatItem & {};

const ChatItem = ({ chatId, title, person, personName }: TChatItemProps) => {
  const router = useRouter();
  const path = usePathname();

  const chatPath = `/chat/${chatId}`;
  const isActive = path === chatPath;

  const openChat = () => {
    router.push(chatPath);
  };
  return (
    <li
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
        <div className="chat-item_name font-bold elipsis">
          {title || personName}
        </div>
        <div className="chat-item_status text-sm elipsis text-muted-foreground">
          {person.status}
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
