import Topbar from '@/components/chat/topbar';
import { TChatItem } from '@/lib/types/chat.types';
import Image from 'next/image';

type TChatDetailsProps = TChatItem & {};

const ChatDetails = async ({ person }: TChatDetailsProps) => {
  if (!person) return null;

  const imageSrc = `/assets/people/${person.avatarKey}/card/avatar.jpg`;

  return (
    <div className="chat-details">
      {/* <Topbar></Topbar> */}
      <div className="chat-details_content">
        <div className="chat-details_image h-80 relative">
          <Image
            src={imageSrc}
            placeholder="blur"
            blurDataURL={person.imgBlur}
            className="object-cover w-full h-auto"
            sizes="280px"
            fill
            alt={person.bio}
          />
        </div>
        <div className="p-10">
          <h2>{person.title}</h2>
          <div className="mt-1 text-sm font-medium opacity-50">
            {person.status}
          </div>
          <div className="mt-5 text-sm font-medium leading-6 opacity-80">
            {person.bio}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
