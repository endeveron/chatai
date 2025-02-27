'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TNewChatButtonProps = {
  className?: string;
};

const NewChatButton = ({ className }: TNewChatButtonProps) => {
  const pathname = usePathname();
  const href = `/chat`;

  if (pathname === href) return null;

  return (
    <Link href={href} className={cn('flex', className)}>
      <Button variant="secondary" className="new-chat-button">
        New chat
      </Button>
    </Link>
  );
};

export default NewChatButton;
