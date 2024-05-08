import SignUpForm from '@/components/auth/signup-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TPageProps = {};

const Page = async (props: TPageProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
};

export default Page;
