'use client';

import Image from 'next/image';

import { AvatarKey } from '@/lib/types/person.types';

type TAvatarProps = {
  avatarKey: AvatarKey;
  avatarBlur: string;
  emotion?: string;
};

const Avatar = ({
  avatarKey,
  avatarBlur,
  emotion = 'friendly',
}: TAvatarProps) => {
  const src = `/assets/people/${avatarKey}/${emotion}.jpg`;

  return (
    <div className="avatar">
      <div className="avatar_image-wrapper h-full overflow-hidden relative rounded-full bg-muted">
        <Image
          src={src}
          placeholder="blur"
          blurDataURL={avatarBlur}
          className="avatar_image object-cover aspect-square h-full w-full"
          sizes="56px"
          fill
          alt="avatar"
          // priority
        />
      </div>
      <div className="avatar_emotion text-xs">{emotion}</div>
    </div>
  );
};

export default Avatar;