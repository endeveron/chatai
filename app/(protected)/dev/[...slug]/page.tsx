import mongoose from 'mongoose';

import { auth } from '@/auth';
import Chat from '@/components/chat/chat';
import ChatDetails from '@/components/chat/chat-details';
import ChatListDev from '@/components/dev/chat-list-dev';
import { fetchChatMessages, fetchUserChats } from '@/lib/actions/chat.actions';
import {
  ChatUrlParam,
  TChatData,
  TChatItem,
  TChatMessage,
} from '@/lib/types/chat.types';
import { cn } from '@/lib/utils';
import { parseChatPersonData } from '@/lib/utils/chat';

import '@/components/chat/chat.css';

// Do not use edge runtime. See: https://mongoosejs.com/docs/nextjs.html
// export const runtime = 'edge';

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session?.user) return null;
  if (session?.user.role !== 'admin') return null;

  let urlParam1 = params.slug[0] || ChatUrlParam.list; // 'list' | 'new' | chat object id
  let urlParam2 = params.slug[1]; // Dev test

  let chatId = '';
  let userChatsData: TChatData[] = [];
  let userChats: TChatItem[] = [];
  let chatItem: TChatItem | null = null;
  let messages: TChatMessage[] = [];

  const userEmail = urlParam2.replace('%40', '@');

  // Fetch user's chats
  const userChatsRes = await fetchUserChats({
    userEmail,
  });
  if (!userChatsRes?.success) {
    throw new Error(
      userChatsRes?.error.message || 'Could not fetch user chats.'
    );
  }
  userChatsData = userChatsRes.data.chats;

  // Get chat object id
  if (urlParam1.length === 24) {
    const isChatIdValid = mongoose.Types.ObjectId.isValid(urlParam1);
    if (isChatIdValid) chatId = urlParam1;
  }

  if (chatId) {
    // Fetch chat messages
    const messagesResult = await fetchChatMessages({ chatId });
    if (messagesResult?.success) {
      messages = JSON.parse(messagesResult.data);
    } else {
      console.log('Could not fetch chat messages.');
    }
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
      <main
        className={cn('', {
          'translate-chat-xs': chatId,
        })}
      >
        {/* Chat list component */}
        {<ChatListDev items={userChats} />}

        {/* Chat component */}
        {chatItem && (
          <Chat {...(chatItem as TChatItem)} fetchedMessages={messages} />
        )}

        {/* Select chat notification */}
        {!chatItem && userChats.length > 0 && (
          <div className="chat-notification">No chat selected</div>
        )}

        {/* Chat details component */}
        {chatItem && <ChatDetails {...(chatItem as TChatItem)} />}
      </main>
    </>
  );
}
