import clsx from 'clsx';
import React from 'react';

export const Counter: React.FC<{
  size?: string;
  text?: string;
  value: string | number;
}> = ({ size = 'w-5 h-5', text = 'text-sm', value }) => {
  return (
    <div className={clsx('mx-2 flex items-center justify-center rounded-full bg-gray-100', size)}>
      <span className={clsx('font-medium text-gray-600', text)}>{value}</span>
    </div>
  );
};
