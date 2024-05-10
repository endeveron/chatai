'use client';

import Avatar from '@/components/chat/avatar';
import { useToast } from '@/components/ui/use-toast';
import useCopyToClipboard from '@/lib/hooks/useCopyToClipboard';
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
  const toast = useToast();
  const [copy] = useCopyToClipboard();

  const isAi = role === MessageRole.ai;
  const isHuman = role === MessageRole.human;

  const handleContentClick = () => {
    copy(content);
    toast.toast({
      title: 'Message text copied to clipboard',
      duration: 3000,
    });
  };

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
        <p onClick={handleContentClick} className="chat-message_content">
          {content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
