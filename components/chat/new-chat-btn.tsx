'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

type TNewChatButtonProps = {};

const NewChatButton = (props: TNewChatButtonProps) => {
  const pathname = usePathname();
  const href = `/chat`;

  if (pathname === href) return null;

  return (
    <Link href={href} className="flex">
      <Button variant="secondary" className="new-chat-button">
        New chat
      </Button>
    </Link>
  );
};

export default NewChatButton;
