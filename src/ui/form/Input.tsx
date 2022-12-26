import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FieldError } from "./FieldError";

interface InputProps extends ComponentProps<"input"> {
  className?: string;
  label?: string;
}

/**
 * Input element should only be used in combination with `useForm()` hook and `<Form />` component
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, type = "text", ...props },
  ref,
) {
  const {
    formState: { errors },
  } = useFormContext();

  const name = props?.name;

  if (!name) return null;

  const message = errors[name]?.message as string;

  return (
    <div className="relative flex w-full flex-col">
      <label className="w-inherit flex flex-col gap-1 text-sm font-normal">
        {label}
        <input
          className={clsx(
            "w-inherit rounded border border-gray-300 bg-white/10 p-2 px-3 text-sm font-light outline-none duration-300 ease-in-out placeholder:text-gray-700 hover:bg-white/[20%]",
            message && "ring-1 ring-red-500",
            className,
          )}
          type={type}
          ref={ref}
          {...props}
        />
      </label>
      {message && (
        <FieldError
          className="absolute left-0 -bottom-6 whitespace-nowrap"
          message={message}
        />
      )}
    </div>
  );
});
