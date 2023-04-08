import React from 'react';

export const Zone: React.FC<{
  title: string;
  subtitle: string;
  action: React.ReactElement;
}> = ({ title, subtitle, action }) => {
  return (
    <div className="flex h-full w-full flex-col items-center border-b p-4 last:border-b-0 sm:flex-row">
      <div className="flex min-h-[4rem] w-full flex-col items-center justify-between sm:flex-row">
        <div className="flex w-full flex-col justify-start">
          <h3 className="font-semibold">{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="flex w-full justify-end sm:w-fit">{action}</div>
      </div>
    </div>
  );
};
