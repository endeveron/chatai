import { auth } from '@/auth';

import NewChat from '@/components/chat/new-chat';
import Loading from '@/components/shared/loading-fragment';
import { fetchPeople } from '@/lib/actions/person.actions';
import { fetchUserByEmail } from '@/lib/actions/user.actions';
import { TPersonCardData } from '@/lib/types/person.types';

// Do not use edge runtime. See: https://mongoosejs.com/docs/nextjs.html

// Page route: '/chat'
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
