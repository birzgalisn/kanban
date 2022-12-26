import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
  UseFormReturn,
} from "react-hook-form";

import type { ComponentProps } from "react";
import type { TypeOf, ZodSchema } from "zod";

/** Provide additional option that would be zod schema */
interface UseFormProps<T extends ZodSchema<any>>
  extends UseHookFormProps<TypeOf<T>> {
  schema: T;
}

export const useForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseFormProps<T>) => {
  return useHookForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};

/**
 * Omit the native `onSubmit` event in favor of `SubmitHandler` event
 * the beauty of this is, the values returned by the submit handler are fully typed
 */
interface FormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

/**
 * Form component relies on `useForm()` hook
 * @param form accepts `useForm({ schema: z.object({ name: z.string() })})` hook with defined defined Zod schema inside
 * @param onSubmit returns schema registered field values on `submit` action, example, onSubmit={({ name }) => console.log({ name })}
 * @param children used to register form schema fields with `<Input {...form.register("name")} />` component
 * @returns HTML
 */
export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      {/** The `form` passed here is return value of useForm() hook */}
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <fieldset
          className={clsx("w-full", className ?? "flex flex-col gap-4")}
          disabled={form.formState.isSubmitting}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};
