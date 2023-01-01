import clsx from "clsx";
import { forwardRef } from "react";

import { Spinner } from "@/ui/spinner";

const variants = {
  primary: "bg-kanban-blue text-white",
  secondary:
    "bg-gray-100 border border-transparent enabled:hover:border-gray-300",
  transparent: "bg-transparent enabled:hover:bg-gray-100",
  danger: "bg-red-600 text-white",
  custom: "",
};

const sizes = {
  sm: "py-2 px-4 text-sm h-10",
  md: "py-2 px-6 text-md h-12",
  lg: "py-3 px-8 text-lg h-14",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  wrap?: boolean;
} & IconProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      wrap = false,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "flex items-center justify-center rounded-lg text-base font-medium outline-none duration-300 ease-in-out hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && startIcon}
        {props.children && (
          <span className={clsx("mx-2", wrap && "hidden xs:block")}>
            {props.children}
          </span>
        )}
        {!isLoading && endIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
