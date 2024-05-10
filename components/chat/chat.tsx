'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ChatInput from '@/components/chat/chat-input';
import ChatMenu from '@/components/chat/chat-menu';
import ChatMessages from '@/components/chat/chat-messages';
import Topbar from '@/components/chat/topbar';
import TopbarHeader from '@/components/chat/topbar-header';
import { askAI } from '@/lib/actions/chat.actions';
import { errAnswerList } from '@/lib/data/phrases';
import { TChatItem, TChatMessage } from '@/lib/types/chat.types';
import { MessageRole } from '@/lib/types/person.types';
import { getRandom } from '@/lib/utils';
import { CHAT_LIST_PATH } from '@/routes';

type TChatProps = TChatItem & {
  fetchedMessages: TChatMessage[];
};

const Chat = ({
  chatId,
  title,
  person,
  personName,
  fetchedMessages,
}: TChatProps) => {
  const pathname = usePathname();

  const [messages, setMessages] = useState<TChatMessage[]>([]);
  const [isPending, setPending] = useState(false);

  const createErrorMessage = () => {
    const errAnswer = getRandom(errAnswerList);
    const errorMessage = {
      chatId,
      content: errAnswer,
      role: MessageRole.ai,
      timestamp: new Date().getTime(),
      emotion: 'peaceful',
      path: '',
    };
    return errorMessage;
  };

  const handleInputSubmit = async (input: string) => {
    try {
      setPending(true);
      // Create a human's message
      const humanMessage = {
        chatId,
        content: input,
        role: MessageRole.human,
        timestamp: new Date().getTime(),
        path: pathname,
      };
      // Add them to the local messages (optimistic update)
      setMessages((msgs) => [...msgs, humanMessage]);

      // Get answer from AI
      const res = await askAI(humanMessage);
      if (!res?.success) {
        console.log(res?.error.message || 'Could not get answer from AI.');
        const errorMessage = createErrorMessage();
        setMessages((msgs) => [...msgs, errorMessage]);
      }
      // else { console.log('askAI res', res.data) }; // { emotion, message }
    } catch (err: any) {
      console.log(err);
      const errorMessage = createErrorMessage();
      setMessages((msgs) => [...msgs, errorMessage]);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    setMessages(fetchedMessages);
  }, [fetchedMessages]);

  return (
    <section className="chat">
      <Topbar>
        <TopbarHeader title={title || personName} navPath={CHAT_LIST_PATH}>
          <ChatMenu
            clearChat={{ show: !!messages.length, chatId, path: pathname }}
          />
        </TopbarHeader>
      </Topbar>
      <ChatMessages
        messages={messages}
        avatarKey={person.avatarKey}
        avatarBlur={person.avatarBlur}
        isTyping={isPending}
      />
      <ChatInput onSubmit={handleInputSubmit} isPending={isPending} />
    </section>
  );
};

export default Chat;
