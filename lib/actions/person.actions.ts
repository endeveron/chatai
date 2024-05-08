'use server';

import { ObjectId } from 'mongoose';

import { connectToDB } from '@/lib/db';
import PersonModel from '@/lib/models/person.model';
import { TServerActionResult } from '@/lib/types/common.types';
import { TPerson } from '@/lib/types/person.types';
import { handleActionError } from '@/lib/utils/error';

export const createPerson = async ({
  gender,
  avatarKey,
  personKey,
  status,
  bio,
  instructions,
  context,
}: TPerson): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Create a new person
    const newPerson = new PersonModel({
      gender,
      avatarKey,
      personKey,
      status,
      bio,
      instructions,
      context,
    });

    // Save the person
    await newPerson.save();

    return {
      success: true,
      data: { personId: newPerson._id },
    };
  } catch (err: any) {
    return handleActionError('Could not create a person', err);
  }
};

/**
 * Fetches a person from a database based on either an objectId or a person value.
 *
 * @returns a Promise that resolves to a `TServerActionResult` object or `undefined`.
 */
export const fetchPersonDataForLLM = async (
  _id: ObjectId
): Promise<TServerActionResult | undefined> => {
  if (!_id) {
    return handleActionError('Invalid object ID');
  }

  try {
    await connectToDB();

    const person = await PersonModel.findById(_id).select(
      'instructions context'
    );
    if (!person) {
      return {
        success: false,
        error: { message: 'Could not fetch person' },
      };
    }

    return {
      success: true,
      data: {
        instructions: person.instructions,
        context: person.context,
      },
    };
  } catch (err: any) {
    return handleActionError('Could not fetch person', err);
  }
};

/**
 * Fetches a people list from a database.
 *
 * @returns a Promise that resolves to a `TServerActionResult` object or `undefined`.
 */
export const fetchPeople = async (): Promise<
  TServerActionResult | undefined
> => {
  try {
    await connectToDB();

    const people = await PersonModel.find().select(
      '_id title gender avatarKey personKey status bio imgBlur avatarBlur'
    );

    return {
      success: true,
      // data: JSON.stringify(people),
      data: people,
    };
  } catch (err: any) {
    return handleActionError('Could not get person', err);
  }
};
