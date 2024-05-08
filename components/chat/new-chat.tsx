'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import NewChatForm from '@/components/chat/new-chat-form';
import PeopleList from '@/components/chat/people-list';
import Topbar from '@/components/chat/topbar';
import TopbarHeader from '@/components/chat/topbar-header';
import { createChat } from '@/lib/actions/chat.actions';
import { useErrorHandler } from '@/lib/hooks/error';
import { TCreateChatSchema } from '@/lib/schemas/chat';
import {
  Gender,
  TPersonChatData,
  TSelectPerson,
} from '@/lib/types/person.types';
import { cn, getRandomName } from '@/lib/utils';

const personInitValue: TSelectPerson = {
  _id: '',
  gender: Gender.female,
};

type TCreateChatProps = {
  userId: string;
  people: TPersonChatData<string>[];
  isSingle: boolean;
};

const NewChat = ({ userId, isSingle, people }: TCreateChatProps) => {
  const router = useRouter();
  const { toastError } = useErrorHandler();

  const [isPending, setPending] = useState(false);
  const [person, setPerson] = useState<TSelectPerson>(personInitValue);

  const handleFormSubmit = async (values: TCreateChatSchema) => {
    let personName = values.personName;
    // Assign a random AI person name if it hasn't been provided
    if (!personName) {
      personName = getRandomName(person.gender);
    }
    // Create chat
    try {
      setPending(true);

      // TODO: fix 'Failed to compile. Cannot get final name for export ...' error if calling server action
      const res = await createChat({
        userId,
        title: values.title,
        personId: person._id,
        personName,
      });
      if (!res?.success) {
        toastError(res);
        return;
      }
      const chatId = res.data;
      // Navigate to the chat page
      router.push(`/chat/${chatId}`);
    } catch (err: any) {
      toastError(err);
      setPending(false);
    }
  };

  const handleFormCancel = () => {
    if (isSingle) return;

    setPerson(personInitValue);
    // router.push(CHAT_LIST_PATH);
    router.back();
  };

  return (
    <section
      className={cn('new-chat', {
        'full-width': isSingle,
      })}
    >
      <Topbar>
        <TopbarHeader
          title="New Chat"
          navPath={isSingle ? '' : '-1'}
        ></TopbarHeader>
      </Topbar>

      <h3 className="pt-4">Choose an AI person</h3>
      <PeopleList
        people={people}
        currentPersonId={person._id}
        onSelect={setPerson}
      />
      <div className="chat-container column-stack">
        <NewChatForm
          isPending={isPending}
          isActive={!!person._id}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </div>
    </section>
  );
};

NewChat.displayName = 'NewChat';

export default NewChat;
