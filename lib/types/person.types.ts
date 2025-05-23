export enum Gender {
  male = 'male',
  female = 'female',
}

export enum MessageRole {
  system = 'system',
  human = 'human',
  ai = 'ai',
}

export type TPersonBaseData = {
  title: string;
  gender: Gender;
  avatarKey: AvatarKey;
  personKey: PersonKey;
  status: string;
  bio: string;
  avatarBlur: string;
  imgBlur: string;
};

export type TPerson = TPersonBaseData & {
  instructions: string;
  context: string[];
  // context: string;
  // vectorStore: {
  //   chunkSize?: number;
  //   chunkOverlap?: number;
  // };
};

export type TPersonChatData<PersonId> = TPersonBaseData & {
  _id: PersonId;
};

export type TPersonCardData = Omit<TPersonBaseData, 'bio' | 'avatarBlur'> & {
  _id: string;
};

export enum PersonKey {
  artFuture = 'artFuture',
  devJourney = 'devJourney',
  modelArtist = 'modelArtist',
  musican = 'musican',
  positiveShot = 'positiveShot',
}

export enum AvatarKey {
  blonde = 'blonde',
  brunette = 'brunette',
  choco = 'choco',
  cutie = 'cutie',
  honey = 'honey',
}

export type TSelectPerson = {
  _id: string;
  gender: Gender;
};
