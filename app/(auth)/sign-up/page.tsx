import Link from 'next/link';

// import SignUpForm from '@/components/auth/signup-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TPageProps = {};

const Page = async (props: TPageProps) => {
  // return (
  //   <Card>
  //     <CardHeader>
  //       <CardTitle>Sign Up</CardTitle>
  //     </CardHeader>
  //     <CardContent>
  //       <SignUpForm />
  //     </CardContent>
  //   </Card>
  // );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="mb-2 text-center text-sm text-secondary-foreground">
            Unable to register in the preview mode
          </div>
          <Link href="/sign-in" className="auth-form_link">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
