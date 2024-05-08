'use client';

import { useState } from 'react';

import LoadingIcon from '@/components/shared/loading-icon';
import { clearChat } from '@/lib/actions/chat.actions';
import CheckIcon from '@/public/assets/ui/check.svg';
import ClearChatIcon from '@/public/assets/ui/clear-chat.svg';
import XmarkIcon from '@/public/assets/ui/xmark.svg';

type TClearChatButtonProps = {
  chatId: string;
  path: string;
};

const ClearChatButton = ({ chatId, path }: TClearChatButtonProps) => {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClearChat = async () => {
    try {
      setLoading(true);
      const res = await clearChat({ chatId, path });
      if (!res?.success) {
        console.log('Could not clear chat');
      } else {
        console.log(res.data);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  const confirmEl = loading ? (
    <LoadingIcon />
  ) : (
    <div className="clear-chat-btn_confirm flex gap-4">
      <CheckIcon onClick={handleClearChat} className="action-icon" />
      <XmarkIcon onClick={() => setConfirm(false)} className="action-icon" />
    </div>
  );

  return (
    <div className="clear-chat-btn">
      {confirm ? (
        confirmEl
      ) : (
        <ClearChatIcon
          onClick={() => setConfirm(true)}
          className="action-icon"
        />
      )}
    </div>
  );
};

export default ClearChatButton;
