'use client';

import Avatar from '@/components/chat/avatar';
import { TBaseChatMessage } from '@/lib/types/chat.types';
import { AvatarKey, MessageRole } from '@/lib/types/person.types';
import { cn } from '@/lib/utils';

type TChatMessageProps = TBaseChatMessage & {
  avatarKey: AvatarKey;
  avatarBlur: string;
};

const ChatMessage = ({
  avatarKey,
  avatarBlur,
  content,
  emotion,
  role,
  timestamp,
}: TChatMessageProps) => {
  const isAi = role === MessageRole.ai;
  const isHuman = role === MessageRole.human;

  const avatar = isAi && (
    <Avatar avatarKey={avatarKey} avatarBlur={avatarBlur} emotion={emotion} />
  );

  return (
    <div
      className={cn('chat-message flex gap-2', {
        'role-hm': isHuman,
        'role-ai': isAi,
      })}
    >
      {avatar}
      <div className="chat-message_content-wrapper flex items-center">
        <div className="chat-message_content py-4 px-6 rounded-3xl rounded-tl-0 text-sm">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
