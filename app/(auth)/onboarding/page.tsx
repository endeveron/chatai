import OnboardingForm from '@/components/auth/onboarding-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { verifyUserObjId } from '@/lib/actions/auth.actions';

type TPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = async ({ searchParams }: TPageProps) => {
  const userObjId = searchParams.t as string;
  if (!userObjId) throw new Error('Invalid page url.');

  // Check the validity of the user objectId
  await verifyUserObjId(userObjId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>Email successfully verified</CardDescription>
      </CardHeader>
      <CardContent>
        <OnboardingForm userObjId={userObjId} />
      </CardContent>
    </Card>
  );
};

export default Page;
