'use client';
import { useRouter } from 'next/navigation';

import MenuDotsVButton from '@/components/shared/menu-dots-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clearChat as clear, deleteChat } from '@/lib/actions/chat.actions';
import { useErrorHandler } from '@/lib/hooks/error';
import { CHAT_LIST_PATH } from '@/routes';

type TChatMenuProps = {
  clearChat: {
    show: boolean;
    chatId: string;
    path: string;
  };
};

const ChatMenu = ({ clearChat }: TChatMenuProps) => {
  const router = useRouter();
  const { toastError } = useErrorHandler();

  const handleClearChat = async () => {
    try {
      const res = await clear({
        chatId: clearChat.chatId,
        path: clearChat.path,
      });
      if (!res?.success) {
        toastError(res);
        return;
      }
    } catch (err: any) {
      console.log(err);
      toastError(err);
    }
  };

  const handleDeleteChat = async () => {
    try {
      const res = await deleteChat({
        chatId: clearChat.chatId,
        path: clearChat.path,
      });
      if (!res?.success) {
        toastError(res);
        return;
      }

      // Navigate to chat list page
      router.push(CHAT_LIST_PATH);
    } catch (err: any) {
      console.log(err);
      toastError(err);
    }
  };

  return (
    <div className="chat-menu h-6">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuDotsVButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          {clearChat.show && (
            <DropdownMenuItem onClick={handleClearChat}>
              Clear chat
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleDeleteChat}>
            Delete chat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatMenu;
