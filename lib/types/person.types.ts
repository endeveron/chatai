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

export enum PersonKey {
  artFuture = 'artFuture',
  devJourney = 'devJourney',
  modelArtist = 'modelArtist',
  positiveShot = 'positiveShot',
}

export enum AvatarKey {
  blonde = 'blonde',
  brunette = 'brunette',
  choco = 'choco',
  honey = 'honey',
}

export type TSelectPerson = {
  _id: string;
  gender: Gender;
};
