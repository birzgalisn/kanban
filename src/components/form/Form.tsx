import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

import type { ComponentProps } from 'react';
import type { TypeOf, ZodSchema } from 'zod';

interface UseZodFormProps<Z extends ZodSchema>
  extends Exclude<UseFormProps<TypeOf<Z>>, 'resolver'> {
  schema: Z;
}

export const useZodForm = <Z extends ZodSchema>({ schema, ...formProps }: UseZodFormProps<Z>) =>
  useForm({
    ...formProps,
    resolver: zodResolver(schema),
  });

interface Props<T extends FieldValues> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: Props<T>) => (
  <FormProvider {...form}>
    <form className="w-full" onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <fieldset
        className={clsx('w-full', className ?? 'flex flex-col gap-4 lg:gap-6')}
        disabled={form.formState.isSubmitting}
      >
        {children}
      </fieldset>
    </form>
  </FormProvider>
);
