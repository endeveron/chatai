'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TCreateChatSchema, createChatSchema } from '@/lib/schemas/chat';
import { cn } from '@/lib/utils';

type TCreateChatProps = {
  isPending: boolean;
  isActive: boolean;
  onSubmit: (values: TCreateChatSchema) => void;
  onCancel: () => void;
};

const NewChatForm = (props: TCreateChatProps) => {
  const router = useRouter();
  const form = useForm<TCreateChatSchema>({
    resolver: zodResolver(createChatSchema),
    defaultValues: {
      personName: '',
      title: '',
    },
  });

  const onSubmit = async (values: TCreateChatSchema) => {
    props.onSubmit(values);
    form.reset();
  };

  const optionalEl = <span className="ml-2 text-muted">(optional)</span>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('new-chat-form card', {
          inactive: props.isPending || !props.isActive,
        })}
      >
        <div className="new-chat-form_fields">
          <FormField
            control={form.control}
            name="personName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <strong>AI person name</strong>
                  {optionalEl}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* <FormDescription>The field is optional</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <strong>Chat title</strong>
                  {optionalEl}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* <FormDescription>The field is optional</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="new-chat-form_buttons flex my-2 justify-center gap-4">
          <Button loading={props.isPending} type="submit">
            Start chat
          </Button>
          <Button
            loading={props.isPending}
            variant={'secondary'}
            onClick={props.onCancel}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

NewChatForm.displayName = 'NewChatForm';

export default NewChatForm;
