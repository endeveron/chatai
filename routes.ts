/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 */
// export const publicRoutes: string[] = ['/'];
export const publicRoutes: string[] = [];

/**
 * An array of routes that are used for authentication.
 */
export const authRoutes: string[] = [
  '/email/error',
  '/email/result',
  '/email/verify',
  '/onboarding',
  '/sign-up',
  '/sign-in',
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for auth purposes.
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * Default redirect path after user signed in.
 */
export const DEFAULT_REDIRECT = '/';

/**
 * Default redirect path after user signed out.
 */
export const DEFAULT_SIGNIN_REDIRECT = '/sign-in';
