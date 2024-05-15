import NextAuth from 'next-auth';

import authConfig from '@/lib/configs/auth.config';
import {
  DEFAULT_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isSignedIn = !!req.auth;
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  // The order is matter.

  // Allow the api next-auth routes (start with `api/auth`).
  if (isApiAuthRoute) return;

  // If the user is signed in on an auth route, redirect to `DEFAULT_REDIRECT`.
  if (isSignedIn && isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  // Allow routes from the `authRoutes` list.
  if (isAuthRoute) return;

  // If the user is NOT signed in on a private route, redirect to `/sign-in`.
  if (!isSignedIn && !isPublicRoute) {
    return Response.redirect(new URL('/sign-in', nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths.
export const config = {
  // Use matcher provided by Clerk.
  // See https://clerk.com/docs/references/nextjs/auth-middleware#usage
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
