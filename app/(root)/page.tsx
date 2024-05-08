import { CHAT_LIST_PATH } from '@/routes';
import { redirect } from 'next/navigation';

// import SignInButton from '@/components/auth/sign-in-button';

// Do not use edge runtime. See: https://mongoosejs.com/docs/nextjs.html
// export const runtime = 'edge';

export default function Home() {
  redirect(CHAT_LIST_PATH);
  // return (
  //   <main className="min-h-dvh flex flex-col justify-center items-center">
  //     {/* <h1 className="py-4">Home</h1> */}
  //     <SignInButton className="min-w-40 my-8" />
  //   </main>
  // );
}
