import clsx from "clsx";

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
      className={clsx("mt-0 flex text-sm text-red-500", className)}
      role="alert"
      aria-label={message}
      {...props}
    >
      {message}
    </span>
  );
}
