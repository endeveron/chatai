import mongoose from 'mongoose';

import { auth } from '@/auth';
import { fetchChat } from '@/lib/actions/chat.actions';
import {
  TChat,
  TChatData,
  TChatItem,
  TChatMessage,
} from '@/lib/types/chat.types';
import { cn } from '@/lib/utils';

import Chat from '@/components/chat/chat';
import ChatDetails from '@/components/chat/chat-details';
import NewChat from '@/components/chat/new-chat';
import { TPersonCardData, TPersonChatData } from '@/lib/types/person.types';
import { fetchPeople } from '@/lib/actions/person.actions';
import { fetchUserByEmail } from '@/lib/actions/user.actions';
import Loading from '@/components/shared/loading-fragment';

// Do not use edge runtime. See: https://mongoosejs.com/docs/nextjs.html
// export const runtime = 'edge';

export default async function Page() {
  const session = await auth();
  if (!session?.user) return null;

  let userId = session.user.id!;
  let userEmail = session.user.email!;
  let people: TPersonCardData[] | null = null;

  // Handle case if the user id provided by google
  if (userId.length !== 24) {
    const userRes = await fetchUserByEmail(userEmail);
    if (!userRes?.success) {
      throw new Error('Could not fetch the user id.');
    }
    userId = userRes.data.id;
  }

  const peopleRes = await fetchPeople();
  if (!peopleRes?.success) {
    throw new Error(peopleRes?.error.message || 'Could not fetch people data.');
  } else {
    people = peopleRes.data;
  }

  return (
    <main className="relative">
      {people ? <NewChat userId={userId} people={people} /> : <Loading />}
    </main>
  );
}
