import clsx from "clsx";
import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { FormFieldError } from "./FieldFieldError";

export interface Props extends PropsWithChildren {
  name: string;
  label?: string;
  className?: string;
}

export const FormField = ({ children, name, label, className }: Props) => {
  const ctx = useFormContext();
  const error = ctx.formState.errors[name]?.message as string;

  return (
    <div className="w-full">
      <label
        className="flex w-full flex-col gap-1 pl-[0.1rem] text-sm font-normal"
        htmlFor={name}
      >
        {label}
      </label>
      <div
        className={clsx(
          "flex h-12 w-full flex-row items-center rounded-lg border border-gray-300 bg-white/10 px-4 text-base font-light outline-none duration-300 ease-in-out placeholder:text-gray-700 hover:bg-white/[20%]",
          error && "border-red-300 bg-red-50",
          className,
        )}
      >
        {children}
        {error && (
          <HiOutlineExclamationCircle className="h-6 w-6 stroke-1 text-red-500" />
        )}
      </div>
      {error && <FormFieldError message={error} />}
    </div>
  );
};
