'use client';

import { useEffect, useRef } from 'react';

import ChatMessage from '@/components/chat/chat-message';
import Typing from '@/components/chat/typing';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TChatMessage } from '@/lib/types/chat.types';
import { AvatarKey } from '@/lib/types/person.types';

type TChatMessagesProps = {
  messages: TChatMessage[];
  avatarKey: AvatarKey;
  avatarBlur: string;
  isTyping: boolean;
};

const ChatMessages = ({
  messages,
  avatarKey,
  avatarBlur,
  isTyping,
}: TChatMessagesProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll to the last message
  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  const typingMessageEl = isTyping && (
    <div className="chat-message typing">
      <Typing />
    </div>
  );

  return (
    <ScrollArea className="chat-messages chat-container column-stack" ref={ref}>
      {messages.map((m: TChatMessage) => (
        <ChatMessage
          avatarKey={avatarKey}
          avatarBlur={avatarBlur}
          content={m.content}
          emotion={m.emotion}
          role={m.role}
          timestamp={m.timestamp}
          key={m.timestamp}
        />
      ))}
      {typingMessageEl}
    </ScrollArea>
  );
};

export default ChatMessages;
