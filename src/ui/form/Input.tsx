import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

import { HiOutlineExclamationCircle } from "react-icons/hi2";
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
    <div>
      <label
        className="flex w-full flex-col gap-1 pl-[0.1rem] text-sm font-normal"
        htmlFor={name}
      >
        {label}
      </label>
      <div
        className={clsx(
          "flex h-12 w-full flex-row items-center rounded-lg border border-gray-300 bg-white/10 px-4 text-base font-light outline-none duration-300 ease-in-out placeholder:text-gray-700 hover:bg-white/[20%]",
          message && "border-red-300 bg-red-50",
          className,
        )}
      >
        <input
          className={clsx(
            "w-full bg-transparent outline-none",
            message ? "placeholder-red-500" : "placeholder-gray-300",
          )}
          type={type}
          ref={ref}
          {...props}
        />
        {message && (
          <HiOutlineExclamationCircle className="h-6 w-6 stroke-1 text-red-500" />
        )}
      </div>
      {message && <FieldError message={message} />}
    </div>
  );
});
