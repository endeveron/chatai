'use client';

import {
  UIEventHandler,
  WheelEvent,
  WheelEventHandler,
  useEffect,
  useRef,
} from 'react';

import PersonCard from '@/components/chat/person-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TPersonCardData, TSelectPerson } from '@/lib/types/person.types';

type TPeopleListProps = {
  people: TPersonCardData[];
  currentPersonId: string;
  onSelect: (person: TSelectPerson) => void;
};

const PeopleList = ({
  people,
  currentPersonId,
  onSelect,
}: TPeopleListProps) => {
  return (
    <ScrollArea className="people-list_wrapper">
      <div className="people-list">
        {people.map((p) => (
          <PersonCard
            {...(p as TPersonCardData)}
            currentPersonId={currentPersonId}
            onSelect={onSelect}
            key={p._id}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

PeopleList.displayName = 'PeopleList';

export default PeopleList;
