import ChatList from '@/components/chat/chat-list';

import '@/components/chat/chat.css';

export default function HomeLayout({
  children,
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
