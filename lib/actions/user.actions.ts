'use server';

import bcrypt from 'bcryptjs';

import UserModel from '@/lib/models/user.model';
import { connectToDB } from '@/lib/db';
import { TCreateUserArgs } from '@/lib/types/auth.types';
import { TOnboardUserArgs } from '@/lib/types/auth.types';
import { TServerActionResult } from '@/lib/types/common.types';
import { handleActionError } from '@/lib/utils/error';
import mongoose, { ObjectId } from 'mongoose';
import { TUser } from '@/lib/types/user.types';
import ChatModel from '@/lib/models/chat.model';

/**
 * Creates a new user in a database and returns the user's object ID.
 *
 * @param {string} params.email email address of the user.
 * @returns a Promise that resolves to either a TServerActionResult object or undefined.
 */
export const createUser = async ({
  email,
}: TCreateUserArgs): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    var _id = new mongoose.Types.ObjectId();
    const userObjId = _id.toString();
    const user = new UserModel({
      _id,
      id: userObjId,
      email,
      emailVerified: true,
    });
    await user.save();

    return {
      success: true,
      data: { userObjId },
    };
  } catch (err: any) {
    return handleActionError('Could not create a new user', err);
  }
};

/**
 * Creates a new user in a database, hash their password, and add stringified.
 * Used in the `OnboardingForm` client component.
 *
 * @param {string} userObjId user._id, a mongoDb ObjectId prop of the user object.
 * @param {string} params.name name of the user.
 * @param {string} params.password password to the user account.
 * @returns a Promise that resolves to a TServerActionResult object or undefined.
 */
export const onboardUser = async ({
  userObjId,
  name,
  password,
}: TOnboardUserArgs): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Find the user
    const user = await UserModel.findById(userObjId);
    if (!user) {
      handleActionError('Invalid user ID', null, true);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating a user
    if (user?.password !== hashedPassword) {
      user.id = userObjId; // Add a stringified version of userObjId
      user.name = name;
      user.password = hashedPassword;
      await user.save();
    }

    return {
      success: true,
    };
  } catch (err: any) {
    return handleActionError('Could not create a new user', err);
  }
};

/**
 * Retrieves a user from the database by their email.
 *
 * @param {string} email user's email address.
 * @param {boolean} checkHasChats check if the user has chats.
 * @returns a Promise that resolves to a `TServerActionResult` object or `undefined`.
 */
export const fetchUserByEmail = async (
  email: string,
  checkHasChats?: boolean
): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    const user = await UserModel.findOne({ email: email }).select('id');
    if (!user) {
      return handleActionError('Could not find a user for the provided email');
    }

    if (checkHasChats) {
      const userChats = await ChatModel.find({ user: user._id }).select('_id');

      console.log('userChats', userChats);
      return {
        success: true,
        data: {
          user,
          hasChats: !!userChats.length,
        },
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (err: any) {
    return handleActionError('Could not fetch user', err);
  }
};

// /**
//  * Retrieves a user from the database by their ID.
//  *
//  * @param {ObjectId | string} userObjId user._id, a mongoDb ObjectId prop of the user object.
//  * @returns a Promise that resolves to a `TServerActionResult` object or `undefined`.
//  */
// export const getUserById = async (
//   userObjId: ObjectId | string
// ): Promise<TServerActionResult | undefined> => {
//   try {
//     await connectToDB();

//     const user = await UserModel.findById(userObjId);
//     if (!user) {
//       handleActionError('Invalid user ID', null, true);
//     }

//     return {
//       success: true,
//       data: { user },
//     };
//   } catch (err: any) {
//     return handleActionError('Could not get user', err);
//   }
// };
