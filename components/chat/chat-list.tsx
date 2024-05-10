import { auth } from '@/auth';
import ChatItem from '@/components/chat/chat-item';
import NewChatButton from '@/components/chat/new-chat-btn';
import Topbar from '@/components/chat/topbar';
import MainMenu from '@/components/shared/main-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TChatItem } from '@/lib/types/chat.types';

type TChatListProps = {
  items: TChatItem[];
};

const ChatList = async ({ items }: TChatListProps) => {
  if (!items.length) return null;

  const session = await auth();

  return (
    <div className="chat-list">
      <Topbar>
        <MainMenu user={session?.user} />
        <div className="w-full flex justify-center">
          <NewChatButton />
        </div>
      </Topbar>
      <ScrollArea className="chat-list_items">
        {items.map((c) => (
          <ChatItem
            chatId={c.chatId}
            title={c.title}
            person={c.person}
            personName={c.personName}
            key={c.chatId}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
