import { type ClassValue, clsx } from 'clsx';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';

import { names } from '@/lib/data/names';
import { Gender } from '@/lib/types/person.types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
); // 7-character random string

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const logOutputData = (data: any) => {
  let output;
  if (typeof data === 'object') output = JSON.stringify(data);
  else output = data;
  console.log(`\x1b[36m${output}\x1b[0m\n`);
};

export const getRandom = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomName = (gender: Gender = Gender.female) => {
  let list = names[gender];
  return list[Math.floor(Math.random() * list.length)];
};
