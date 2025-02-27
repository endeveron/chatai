'use server';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { AuthError, User } from 'next-auth';

import { signIn as nextSignIn } from '@/auth';
import { createUser } from '@/lib/actions/user.actions';
import { connectToDB } from '@/lib/db';
import UserModel from '@/lib/models/user.model';
import {
  TCredentials,
  TSignInArgs,
  TSignInSocialArgs,
  TSignUpArgs,
} from '@/lib/types/auth.types';
import { TServerActionResult } from '@/lib/types/common.types';
import { TUser, UserRole } from '@/lib/types/user.types';
import { handleActionError } from '@/lib/utils/error';
import { createVerificationEmail, sendEmail } from '@/lib/utils/nodemailer';
import { DEFAULT_REDIRECT } from '@/routes';

const baseUrl = process.env.BASE_URL as string;
const jwtAuthKey = process.env.JWT_KEY as string;
const jwtEmailKey = process.env.EMAIL_KEY as string;

type TJwtEmailPayload = {
  userObjId: string;
  exp: number;
};

/**
 * Generates a JWT token for email verification using a user's object ID.
 *
 * @param {string} userObjId user._id, a mongoDb ObjectId prop of the user object.
 * @returns a JSON Web Token (JWT) that is signed with the userObjId and jwtEmailKey. The token has an
 * expiration time of 24 hours.
 */
const generateEmailToken = (userObjId: string) => {
  return jwt.sign({ userObjId }, jwtEmailKey, { expiresIn: '24h' });
};

/**
 * Responsible for sending a verification email to a user, including generating a verification token and checking if the email is already in use.
 *
 * @param {string} params.email the email address to which the verification email will be sent.
 * @param {boolean} params.isSignup whether to check if the email is already in use.
 * @returns a Promise that resolves to a value of type `TServerActionResult` or `undefined`.
 */
export const sendVerificationEmail = async ({
  email,
  isSignup = false,
}: {
  email: string;
  isSignup?: boolean;
}): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Check if the user exists for the sign up case
    const user = await UserModel.findOne({ email: email });

    console.log('user', user);

    // Signup case: check if email in use
    if (isSignup && user) {
      return handleActionError('Email already in use');
    }

    // Resend case: check if email in use
    if (!isSignup && !user) {
      return handleActionError(
        'The user with the specified email does not exist'
      );
    }

    // Check if email is verified
    if (user?.emailVerified === true) {
      return handleActionError('Email has already been verified');
    }

    // Create a user.
    const res = await createUser({ email });
    if (!res?.success) {
      return handleActionError('Could not create user', res?.error, true);
    }

    // Get the user._id prop
    const userObjId = res.data.userObjId;

    // Create the verification token
    const token = generateEmailToken(userObjId);

    // Configure URI
    const url = `${baseUrl}/email/result?e=${email}&t=${token}&i=${userObjId}`;
    // Create an email
    const emailData = createVerificationEmail({ email, url: encodeURI(url) });
    // Send the email
    const messageId = await sendEmail(emailData);
    console.log('messageId', messageId);
    if (!messageId) {
      handleActionError('An email transporter error occured', null, true);
    }

    return { success: true };
  } catch (err: any) {
    return handleActionError('Could not send verification token', err);
  }
};

/**
 * Verifies the validity of an email verification token by checking the
 * token's expiration and comparing the user ObjectId in the token with the provided user ObjectId.
 *
 * @param {string} params.userObjId user._id, a mongoDb ObjectId prop of the user object that the token belongs to.
 * @param {string} params.token a token.
 * @returns an object with either an "error" property or a "data" property.
 */
export const verifyEmailToken = async ({
  userObjId,
  token,
}: {
  userObjId: string;
  token: string;
}): Promise<TServerActionResult> => {
  // Get token data
  const { userObjId: userObjIdFromToken, exp } = jwt.verify(
    token,
    jwtEmailKey
  ) as TJwtEmailPayload;

  // Check if token expired.
  if (Date.now() >= exp * 1000) {
    return {
      success: false,
      error: {
        code: 1,
        message: 'Token is expired',
      },
    };
  }

  // Check token validity.
  if (userObjId !== userObjIdFromToken) {
    return {
      success: false,
      error: {
        code: 2,
        message: 'Token is invalid',
      },
    };
  }

  try {
    await connectToDB();

    // Check if a user with the given `userObjId` exists in the db
    const user: TUser | null = await UserModel.findById(userObjId);
    if (user?.name) {
      return {
        success: true,
        data: 'created',
      };
    }

    return { success: true, data: 'onboard' };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      error: {
        code: 3,
        message: 'DB error',
      },
    };
  }
};

/**
 * Checks the validity of a user object ID and verifies if a user with that ID exists in the database.
 *
 * @param {string} userObjId user._id, a mongoDb ObjectId prop in the user object.
 * @returns a Promise that resolves to a value of type `TServerActionResult` or `undefined`.
 */
export const verifyUserObjId = async (
  userObjId: string
): Promise<TServerActionResult | undefined> => {
  try {
    // Check the `userObjId` validity
    if (!mongoose.Types.ObjectId.isValid(userObjId)) {
      handleActionError('Invalid ID data', null, true);
    }

    // Check if a user with the given `userObjId` exists in the db
    const user: TUser | null = await UserModel.findById(userObjId);
    if (!user) {
      handleActionError('Invalid user ID', null, true);
    }
  } catch (err: any) {
    return handleActionError('Unable to onboard', err, true);
  }
};

/**
 * Generates a JWT token for the user authentication using a user's object ID.
 *
 * @param {string} userObjId user._id, a mongoDb ObjectId prop of the user object.
 * @returns a JSON Web Token (JWT) that is signed with the userObjId and jwtAuthKey. The token has an
 * expiration time of 24 hours.
 */
export const generateAuthToken = (userObjId: string) => {
  return jwt.sign({ userObjId }, jwtAuthKey, { expiresIn: '24h' });
};

/**
 * Resends a verification email to a user's email address for email verification.
 *
 * @param {string} params.email email address to which the verification email will be sent.
 * @returns a Promise that resolves to a value of type `TServerActionResult` or `undefined`.
 */
export const resendVerifyEmailLink = async ({
  email,
}: TSignUpArgs): Promise<TServerActionResult | undefined> => {
  try {
    // Verify the user email by sending authentication link
    const res = await sendVerificationEmail({ email });

    if (!res?.success) handleActionError('', res?.error, true);
    return { success: true };
  } catch (err: any) {
    return handleActionError('Unable to send a link', err);
  }
};

/**
 * Sends a verification email to a user's email address for email verification.
 *
 * @param {string} params.email email address to which the verification email will be sent.
 * @returns a Promise that resolves to a value of type `TServerActionResult` or `undefined`.
 */
export const signUp = async ({
  email,
}: TSignUpArgs): Promise<TServerActionResult | undefined> => {
  try {
    // Verify the user email by sending authentication link
    const res = await sendVerificationEmail({ email, isSignup: true });
    if (!res?.success) handleActionError('', res?.error, true);
    return { success: true };
  } catch (err: any) {
    return handleActionError('Unable to sign up', err);
  }
};

/**
 * Handles user sign-in using email and password, calling an authentication method.
 *
 * @param {string} params.email email address of the user.
 * @param {string} params.password password to the user account.
 * @returns a Promise that resolves to a value of type `TServerActionResult` or `undefined`.
 */
export const signIn = async ({
  email,
  password,
  redirectTo,
}: TSignInArgs): Promise<TServerActionResult | undefined> => {
  try {
    // Call the `auth.providers.Credentials.authorize` method (./auth.ts)
    await nextSignIn('credentials', {
      email,
      password,
      redirectTo: redirectTo ? `/${redirectTo}` : DEFAULT_REDIRECT,
    });
    return { success: true };
  } catch (err: any) {
    // Do not use handleActionError here
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            error: { message: 'Invalid email or password' },
          };
        default:
          return {
            success: false,
            error: { message: 'Unable to sign in' },
          };
      }
    }
    throw err;
  }
};

/**
 * Checks user credentials against a database and returns user data if authentication is successful.
 *
 * @param {string} params.email email address of the user.
 * @param {string} params.password password to the user account.
 * @returns either the user data (id, name, email, role) if the provided email and password match a user in the database, or `null` if no user is found or the password does not match.
 */
export const authorizeUser = async ({
  email,
  password,
}: TCredentials): Promise<User | null> => {
  try {
    await connectToDB();

    // Find a user document in the db that matches the provided email address.
    const user = await UserModel.findOne({ email });
    if (!user || !user.id || !user.name || !user.email || !user.role)
      return null;

    // Check the password
    const passwordsMatch = await bcrypt.compare(
      password,
      user.password as string
    );

    const userData = {
      id: user.id as string,
      name: user.name as string,
      email: user.email as string,
      role: user.role as UserRole,
    };

    if (passwordsMatch) return userData;
    return null;
  } catch (err: any) {
    return null;
  }
};

/**
 * Handles user sign-in with social providers, creating a new user or updating existing user information in the database.
 *
 * @param {string} params.provider SocialProvider enum value.
 * @param {string} params.email user's email address.
 * @param {boolean} params.emailVerified
 * @param {string} params.name name of the user.
 * @param {string} params.image image avatar of the user.
 * @returns a Promise that resolves to a value of type `TServerActionResult` or `undefined`.
 */
export const signInSocial = async ({
  provider,
  email,
  emailVerified,
  name,
  image,
}: TSignInSocialArgs): Promise<TServerActionResult | undefined> => {
  try {
    await connectToDB();

    // Check if the user exists
    let user = await UserModel.findOne({ email: email });

    if (!user) {
      if (!email) handleActionError('No email provided', null, true);

      // Create a new user in the database
      var _id = new mongoose.Types.ObjectId();
      user = new UserModel({
        _id,
        id: _id.toString(),
        provider,
        email,
        emailVerified,
        name,
        image,
      });
      await user.save();
    } else {
      if (user.provider && user.name && user.image && user.emailVerified) {
        return { success: true };
      }
      // Update an existing user fields in the database
      if (!user.provider) user.provider = provider;
      if (!user.name && name) user.name = name;
      if (!user.image && image) user.image = image;
      if (!user.emailVerified && emailVerified === true)
        user.emailVerified = true;
      await user.save();
    }
    return { success: true };
  } catch (err: any) {
    return handleActionError('Could not handle user data', err, true);
  }
};
