import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import ChatListClient from '@/components/chat/chat-list-client';
import { fetchUserChats } from '@/lib/actions/chat.actions';
import { TChatItem } from '@/lib/types/chat.types';
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';

type TChatListProps = {};

const ChatList = async (props: TChatListProps) => {
  const session = await auth();
  if (!session?.user) return redirect(DEFAULT_SIGNIN_REDIRECT);

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
  // The `chats` data must be returned to process the redirection to a new chat
  chats = userChatsRes.data;

  const user = {
    name: userName,
    email: userEmail,
  };

  return <ChatListClient items={chats} user={user} />;
};

export default ChatList;
