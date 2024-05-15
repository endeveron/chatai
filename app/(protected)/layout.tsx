import ChatList from '@/components/chat/chat-list';

import '@/components/chat/chat.css';

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {<ChatList />}

      {/* Chat | NewChat components */}
      {children}
    </>
  );
}
