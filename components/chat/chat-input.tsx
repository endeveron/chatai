'use client';

import { ChatInputValidation } from '@/lib/validations/chat.validations';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

type TChatInputProps = {
  onSubmit: (input: string) => void;
  isPending: boolean;
};

const ChatInput = ({ onSubmit, isPending }: TChatInputProps) => {
  const form = useForm<zod.infer<typeof ChatInputValidation>>({
    resolver: zodResolver(ChatInputValidation),
    defaultValues: { message: '' },
  });

  const handleSubmit = async (
    values: zod.infer<typeof ChatInputValidation>
  ) => {
    onSubmit(values.message);
    form.reset();
  };

  return (
    <div className="chat-input chat-container">
      <Form {...form}>
        <form
          className={cn('w-full', { pending: isPending })}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                {/* <FormMessage /> */}
                <FormControl>
                  <Input
                    placeholder="Type something..."
                    className="rounded-3xl p-6 bg-card"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
