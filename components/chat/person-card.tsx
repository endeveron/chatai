'use client';

import Image from 'next/image';

import { TPersonChatData, TSelectPerson } from '@/lib/types/person.types';
import { cn } from '@/lib/utils';

type TPersonCardProps = TPersonChatData<string> & {
  currentPersonId: string;
  onSelect: (person: TSelectPerson) => void;
};

const PersonCard = ({
  _id,
  title,
  gender,
  avatarKey,
  personKey,
  bio,
  status,
  imgBlur,
  avatarBlur,
  currentPersonId,
  onSelect,
}: TPersonCardProps) => {
  const imageSrc = `/assets/people/${avatarKey}/card/avatar.jpg`;

  return (
    <div
      className={cn('person-card card', {
        selected: currentPersonId === _id,
      })}
      onClick={() =>
        onSelect({
          _id,
          gender,
        })
      }
    >
      <div className="person-card_image relative">
        <Image
          src={imageSrc}
          placeholder="blur"
          blurDataURL={imgBlur}
          className="object-cover w-full h-auto"
          sizes="144px"
          fill
          alt={bio}
          // priority
        />
      </div>
      <div className="person-card_content">
        <div className="person-card_title font-bold">{title}</div>
        <div className="person-card_description">{status}</div>
      </div>
    </div>
  );
};

export default PersonCard;
