import clsx from "clsx";
import { FaExclamationCircle } from "react-icons/fa";

export function FieldError({
  className,
  message,
  ...props
}: {
  className?: string;
  message: string;
}) {
  /** The useFormContext hook returns the current state of hook form */
  return (
    <span
      className={clsx(
        "mt-1 flex flex-row items-center gap-1 text-sm font-semibold text-red-500",
        className,
      )}
      role="alert"
      aria-label={message}
      {...props}
    >
      <FaExclamationCircle />
      {message}
    </span>
  );
}
