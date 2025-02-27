'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUp } from '@/lib/actions/auth.actions';
import { useErrorHandler } from '@/lib/hooks/error';
import { TSignUpSchema, signUpSchema } from '@/lib/schemas/auth';
import { cn } from '@/lib/utils';
import FormLoading from '@/components/shared/form-loading';

type TSignUpFormProps = {};

const SignUpForm = (props: TSignUpFormProps) => {
  const router = useRouter();
  const { toastError } = useErrorHandler();
  const [isPending, setPending] = useState(false);

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: TSignUpSchema) => {
    try {
      setPending(true);
      const res = await signUp({ email: values.email });
      if (!res?.success) {
        toastError(res);
        setPending(false);
        return;
      }

      // If success, redirect to the email verify page
      router.push(`/email/verify?e=${values.email}`);
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
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          loading={isPending}
          className="auth-form_button !mt-7"
          type="submit"
        >
          Continue
        </Button>
        <div className="flex mt-4 justify-center">
          <Link href="/sign-in" className="auth-form_link">
            Already have an account ?
          </Link>
        </div>
        <FormLoading loadigIconClassName="-mt-14" isPending={isPending} />
      </form>
    </Form>
  );
};

export default SignUpForm;
