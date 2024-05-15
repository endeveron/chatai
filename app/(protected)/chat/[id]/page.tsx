import mongoose from 'mongoose';

import { auth } from '@/auth';
import Chat from '@/components/chat/chat';
import ChatDetails from '@/components/chat/chat-details';
import { fetchChat } from '@/lib/actions/chat.actions';
import { TChatData } from '@/lib/types/chat.types';

// Do not use edge runtime.
export const revalidate = 3600; // 1 hour

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return null;

  let chatData: TChatData | null = null;
  let userEmail = session.user.email!;
  let chatId = '';

  // Validate the chat object id
  if (params.id.length === 24) {
    const isChatIdValid = mongoose.Types.ObjectId.isValid(params.id);
    if (!isChatIdValid) throw new Error('Invalid chat id.');
    chatId = params.id;
  }

  // Fetch chat data
  const chatRes = await fetchChat({ chatId, userEmail });
  if (chatRes?.success) {
    chatData = {
      chatId,
      ...chatRes.data,
    };
  }

  return (
    <main className="relative">
      <Chat chatId={chatId} {...(chatData as TChatData)} />
      <ChatDetails {...(chatData as TChatData)} />
    </main>
  );
}
