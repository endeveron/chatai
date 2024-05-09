import ChatItem from '@/components/chat/chat-item';
import NewChatButton from '@/components/chat/new-chat-btn';
import Topbar from '@/components/chat/topbar';
import MainMenu from '@/components/shared/main-menu';
import { TChatItem } from '@/lib/types/chat.types';

type TChatListProps = {
  items: TChatItem[];
};

const ChatList = async ({ items }: TChatListProps) => {
  if (!items.length) return null;

  return (
    <div className="chat-list">
      <Topbar>
        <MainMenu />
        <div className="w-full flex justify-center">
          <NewChatButton />
        </div>
      </Topbar>
      <ul className="chat-list_items column-stack" role="list">
        {items.map((c) => (
          <ChatItem
            chatId={c.chatId}
            title={c.title}
            person={c.person}
            personName={c.personName}
            key={c.chatId}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
