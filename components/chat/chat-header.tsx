'use client';

import { usePathname } from 'next/navigation';
import ClearChatButton from '@/components/chat/clear-chat-btn';

type TChatHeaderProps = {
  chatId: string;
  showClearChatBtn: boolean;
  title?: string;
};

const ChatHeader = ({ chatId, showClearChatBtn, title }: TChatHeaderProps) => {
  const pathname = usePathname();

  const clearChatBtn = showClearChatBtn ? (
    <ClearChatButton chatId={chatId} path={pathname} />
  ) : null;

  return (
    <div className="chat-header relative w-full flex items-center justify-center">
      <h2 className="py-4 font-bold">{title || `Chat AI`}</h2>
      {clearChatBtn}
    </div>
  );
};

export default ChatHeader;
