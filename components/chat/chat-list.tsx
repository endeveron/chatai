import { auth } from '@/auth';
import ChatListClient from '@/components/chat/chat-list-client';
import { fetchUserChats } from '@/lib/actions/chat.actions';
import { TChatItem } from '@/lib/types/chat.types';

type TChatListProps = {};

const ChatList = async (props: TChatListProps) => {
  const session = await auth();
  if (!session?.user) return null;

  let userName = session.user.name!;
  let userEmail = session.user.email!;
  let chats: TChatItem[] = [];

  // Fetch user's chats
  const userChatsRes = await fetchUserChats({ userEmail });
  // console.log('userChatsRes', userChatsRes);
  if (!userChatsRes?.success) {
    throw new Error(
      userChatsRes?.error.message || 'Could not fetch user chats.'
    );
  }
  chats = userChatsRes.data;
  if (!chats.length) return null;

  const user = {
    name: userName,
    email: userEmail,
  };

  return <ChatListClient items={chats} user={user} />;
};

export default ChatList;
