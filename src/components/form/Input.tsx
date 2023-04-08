import { ComponentProps, forwardRef } from 'react';

import { FormField, Props as FormFieldProps } from './FormField';

interface Props extends FormFieldProps, ComponentProps<'input'> {
  name: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => (
  <FormField {...{ className }} {...props}>
    <input
      className="w-full bg-transparent text-inherit placeholder-gray-300 outline-none"
      id={props.name}
      ref={ref}
      {...props}
    />
  </FormField>
));

Input.displayName = 'Input';
