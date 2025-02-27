import SignInForm from '@/components/auth/signin-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Page = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
};

export default Page;
