import clsx from 'clsx';
import { forwardRef } from 'react';

import { Spinner } from '@/ui/spinner';

const variants = {
  primary: 'bg-kanban-blue text-white',
  secondary: 'bg-gray-100 border border-transparent enabled:hover:border-gray-300',
  transparent: 'bg-transparent enabled:hover:bg-gray-100',
  danger: 'bg-transparent text-red-600 enabled:hover:bg-red-50',
  none: '',
};

export const sizes = {
  xs: 'py-1 px-3 text-sm h-9',
  sm: 'py-2 px-4 text-sm h-10',
  md: 'py-2 px-6 text-md h-12',
  lg: 'py-3 px-8 text-lg h-14',
};

type IconProps = { icon?: React.ReactElement };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  wrap?: boolean;
  left?: boolean;
  fluid?: boolean;
} & IconProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      icon,
      isLoading = false,
      wrap = false,
      left = false,
      fluid = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex items-center rounded-lg text-base font-normal outline-none duration-300 ease-in-out hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70',
          variants[variant],
          sizes[size],
          !left && 'justify-center',
          fluid && 'w-full',
          className,
        )}
        {...(isLoading && { disabled: true })}
        {...props}
      >
        {isLoading ? <Spinner size={size} /> : icon}
        {props.children && (
          <span className={clsx((icon || isLoading) && 'mx-2', wrap && 'hidden xs:block')}>
            {props.children}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
