import { TChatData } from '@/lib/types/chat.types';
import Image from 'next/image';

type TChatDetailsProps = TChatData & {};

const ChatDetails = async ({ person }: TChatDetailsProps) => {
  if (!person) return null;

  const imageSrc = `/assets/people/${person.avatarKey}/card.jpg`;

  return (
    <div className="chat-details">
      <div className="chat-details_content">
        <div className="chat-details_image">
          <Image
            src={imageSrc}
            placeholder="blur"
            blurDataURL={person.imgBlur}
            className="max-w-[288px]"
            width={288}
            height={352}
            alt={person.bio}
          />
        </div>
        <div className="p-10">
          <h2>{person.title}</h2>
          <div className="mt-1 text-sm font-medium opacity-60">
            {person.status}
          </div>
          <div className="mt-6 text-sm font-medium opacity-85">
            <p>{person.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
