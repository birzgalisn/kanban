import React from 'react';

export const FormFieldError: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <span className="mt-0 flex pl-[0.1rem] text-sm text-red-500" role="alert">
      {message}
    </span>
  );
};
