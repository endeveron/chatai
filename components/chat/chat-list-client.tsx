'use client';

import { usePathname, useRouter } from 'next/navigation';

import ChatItem from '@/components/chat/chat-item';
import NewChatButton from '@/components/chat/new-chat-btn';
import Topbar from '@/components/chat/topbar';
import MainMenu from '@/components/shared/main-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TChatItem } from '@/lib/types/chat.types';
import { TUserData } from '@/lib/types/user.types';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

type TChatListClientProps = {
  items: TChatItem[];
  user: TUserData;
};

const ChatListClient = ({ items, user }: TChatListClientProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isChat = pathname.includes('chat');
  const isNewChat = pathname === '/chat';
  const noItems = items.length === 0;

  useEffect(() => {
    if (noItems && pathname !== '/chat') router.push('/chat');
  }, [noItems, pathname, router]);

  // New chat and the user has not chats
  if (noItems) {
    return <MainMenu user={user} className="main-menu--fixed" />;
  }

  return (
    <div
      className={cn('chat-list', {
        'chat-xs': isChat,
        'new-chat': isNewChat,
      })}
    >
      <Topbar>
        <MainMenu user={user} />
        <div className="w-full flex justify-center">
          <NewChatButton />
        </div>
      </Topbar>
      <ScrollArea className="chat-list_items">
        {items?.length
          ? items.map((c) => (
              <ChatItem
                chatId={c.chatId}
                title={c.title}
                person={c.person}
                key={c.chatId}
              />
            ))
          : null}
      </ScrollArea>
    </div>
  );
};

export default ChatListClient;
