import SignOutButton from '@/components/auth/sign-out-btn';
import ChatItem from '@/components/chat/chat-item';
import NewChatButton from '@/components/chat/new-chat-btn';
import Topbar from '@/components/chat/topbar';
// import MenuButton from '@/components/shared/menu-button';
import { TChatItem } from '@/lib/types/chat.types';

type TChatListProps = {
  items: TChatItem[];
};

const ChatList = async ({ items }: TChatListProps) => {
  if (!items.length) return null;

  return (
    <div className="chat-list">
      <Topbar className="justify-center relative">
        {/* <MenuButton /> */}
        <SignOutButton />
        <NewChatButton />
      </Topbar>
      <div className="chat-list_items column-stack">
        {items.map((c) => (
          <ChatItem
            chatId={c.chatId}
            title={c.title}
            person={c.person}
            personName={c.personName}
            key={c.chatId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
