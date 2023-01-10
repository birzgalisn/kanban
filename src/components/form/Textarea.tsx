import { ComponentProps, forwardRef } from "react";

import { FormField, Props as FormFieldProps } from "./FormField";

interface Props extends FormFieldProps, ComponentProps<"textarea"> {
  name: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => (
    <FormField {...{ className }} {...props} fluid>
      <textarea
        className="w-full bg-transparent placeholder-gray-300 outline-none"
        id={props.name}
        ref={ref}
        {...props}
      />
    </FormField>
  ),
);

Textarea.displayName = "Textarea";
