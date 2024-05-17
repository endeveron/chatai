'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import SocialButtons from '@/components/auth/social-buttons';
import VisibilityToggle from '@/components/auth/visibility-toggle';
import FormLoading from '@/components/shared/form-loading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormControlIcon,
  FormControlWithIcon,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signIn } from '@/lib/actions/auth.actions';
import { useErrorHandler } from '@/lib/hooks/error';
import { TSignInSchema, signInSchema } from '@/lib/schemas/auth';
import { TSignInArgs } from '@/lib/types/auth.types';
import { cn } from '@/lib/utils';

type TSignInFormProps = {};

const SignInForm = (props: TSignInFormProps) => {
  const searchParams = useSearchParams();
  const { toastError } = useErrorHandler();

  const [isPending, setPending] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const redirectTo = searchParams.get('redirectTo') || undefined;

  const onSubmit = async (values: TSignInSchema) => {
    const signinData: TSignInArgs = {
      email: values.email,
      password: values.password,
      redirectTo,
    };

    try {
      setPending(true);
      const res = await signIn(signinData);
      if (!res?.success) {
        toastError(res);
        setPending(false);
        return;
      }
    } catch (err: any) {
      toastError(err);
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('auth-form', { inactive: isPending })}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControlWithIcon>
                <FormControlIcon>
                  <VisibilityToggle
                    onClick={() => setPwdVisible((prev) => !prev)}
                  />
                </FormControlIcon>
                <Input {...field} type={pwdVisible ? 'text' : 'password'} />
              </FormControlWithIcon>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          loading={isPending}
          className="auth-form_button !mt-7"
          type="submit"
        >
          Sign In
        </Button>
        <SocialButtons />
        <div className="flex justify-center">
          <Link href="/sign-up" className="auth-form_link">
            Create an account
          </Link>
        </div>
        <FormLoading loadigIconClassName="-mt-20" isPending={isPending} />
      </form>
    </Form>
  );
};

export default SignInForm;
