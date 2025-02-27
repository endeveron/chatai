'use client';

import Image from 'next/image';

import { TPersonCardData, TSelectPerson } from '@/lib/types/person.types';
import { cn } from '@/lib/utils';

type TPersonCardProps = TPersonCardData & {
  currentPersonId: string;
  onSelect: (person: TSelectPerson) => void;
};

const PersonCard = ({
  _id,
  title,
  gender,
  avatarKey,
  status,
  imgBlur,
  currentPersonId,
  onSelect,
}: TPersonCardProps) => {
  const imageSrc = `/assets/people/${avatarKey}/card.jpg`;

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
          className="object-cover w-full h-auto"
          placeholder="blur"
          blurDataURL={imgBlur}
          sizes="144px"
          fill
          alt={title}
        />
      </div>
      <div className="person-card_content">
        <div className="person-card_title font-bold elipsis">{title}</div>
        <div className="person-card_description elipsis">{status}</div>
      </div>
    </div>
  );
};

export default PersonCard;
