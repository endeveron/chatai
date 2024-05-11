import mongoose from 'mongoose';
import { RedirectType, redirect } from 'next/navigation';

import { auth } from '@/auth';
import Chat from '@/components/chat/chat';
import ChatDetails from '@/components/chat/chat-details';
import ChatList from '@/components/chat/chat-list';
import NewChat from '@/components/chat/new-chat';
import { fetchChatMessages, fetchUserChats } from '@/lib/actions/chat.actions';
import { fetchPeople } from '@/lib/actions/person.actions';
import {
  ChatUrlParam,
  TChatData,
  TChatItem,
  TChatMessage,
} from '@/lib/types/chat.types';
import { TPersonChatData } from '@/lib/types/person.types';
import { cn } from '@/lib/utils';
import { parseChatPersonData } from '@/lib/utils/chat';

import '@/components/chat/chat.css';

// Do not use edge runtime. See: https://mongoosejs.com/docs/nextjs.html
// export const runtime = 'edge';

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session?.user) return null;

  let userEmail = session.user.email!;
  let urlParam1 = params.slug[0] || ChatUrlParam.list; // 'list' | 'new' | chat object id
  // let urlParam2 = params.slug[1];

  let chatId = '';
  let isNewChat = false;
  let userChatsData: TChatData[] = [];
  let userChats: TChatItem[] = [];
  let chatItem: TChatItem | null = null;
  let messages: TChatMessage[] = [];
  let people: TPersonChatData<string>[] = [];

  // Fetch user's chats
  const userChatsRes = await fetchUserChats({ userEmail });
  // console.log('userChatsRes', userChatsRes);
  if (!userChatsRes?.success) {
    throw new Error(
      userChatsRes?.error.message || 'Could not fetch user chats.'
    );
  }
  // userChatsData = JSON.parse(userChatsRes.data);
  const userId = userChatsRes.data.userId;
  userChatsData = userChatsRes.data.chats;

  // Redirect to `/chat/new` if the user doesn't have any chats
  if (urlParam1 === ChatUrlParam.list && userChatsData.length === 0) {
    return redirect(`/chat/${ChatUrlParam.new}`, RedirectType.replace);
  }

  // Get chat object id
  if (urlParam1.length === 24) {
    const isChatIdValid = mongoose.Types.ObjectId.isValid(urlParam1);
    if (isChatIdValid) chatId = urlParam1;
  }

  if (chatId) {
    // Fetch chat messages
    const messagesRes = await fetchChatMessages({ chatId });
    if (!messagesRes?.success) {
      throw new Error(
        messagesRes?.error.message || 'Could not fetch chat messages.'
      );
    }
    messages = JSON.parse(messagesRes.data);
  }

  // Fetch a list of people, display a new chat component
  if (urlParam1 === ChatUrlParam.new) {
    const peopleRes = await fetchPeople();
    if (!peopleRes?.success) {
      throw new Error(
        peopleRes?.error.message || 'Could not fetch people data.'
      );
    }
    const fetchedPeople = peopleRes.data;
    if (fetchedPeople.length) {
      isNewChat = true;
    }

    // Parse people data
    people = fetchedPeople.map(parseChatPersonData);
  }

  // Configure chat items
  if (userChatsData.length) {
    userChats = userChatsData.map((c: TChatData): TChatItem => {
      const chatItemData = {
        chatId: c._id.toString(),
        title: c.title,
        personName: c.personName,
        person: parseChatPersonData(c.person),
      };
      if (chatId && chatItemData.chatId === chatId) {
        chatItem = chatItemData;
      }
      return chatItemData;
    });
  }

  return (
    <>
      {/* <Sidebar></Sidebar> */}
      <main
        className={cn('', {
          'translate-chat-xs': chatId,
          'translate-new-chat-xs': isNewChat && userChats.length > 0,
        })}
      >
        {/* Chat list component */}
        {<ChatList items={userChats} />}

        {/* New chat component */}
        {isNewChat && (
          <NewChat
            userId={userId}
            isSingle={userChats.length === 0}
            people={people}
          />
        )}

        {/* Chat component */}
        {!isNewChat && chatItem && (
          <Chat {...(chatItem as TChatItem)} fetchedMessages={messages} />
        )}

        {/* Select chat notification */}
        {!isNewChat && !chatItem && userChats.length > 0 && (
          <div className="chat-notification">
            <div className="chat-notification__bg"></div>
            <span className="chat-notification__label">
              Select a chat to view messages
            </span>
          </div>
        )}

        {/* Chat details component */}
        {!isNewChat && chatItem && <ChatDetails {...(chatItem as TChatItem)} />}
      </main>
    </>
  );
}
