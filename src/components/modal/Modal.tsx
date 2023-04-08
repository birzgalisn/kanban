import { Button } from '@/ui/button';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { HiXMark } from 'react-icons/hi2';

export type ModalHandle = {
  toggleVisibility: () => void;
};

type ModalProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export const Modal = forwardRef<ModalHandle, ModalProps>(({ title, subtitle, children }, refs) => {
  const [open, setOpen] = useState<boolean>();

  const toggleVisibility = () => {
    setOpen(!open);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-10 h-screen w-screen bg-white opacity-65"
        onClick={toggleVisibility}
      ></div>
      <div className="fixed inset-0 z-30 mx-auto mt-[10vh] flex min-h-min max-w-lg flex-col lg:mt-[20vh]">
        <div className="mx-auto flex h-min w-full max-w-lg flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-3xl lg:p-10">
          <div className="mb-4 flex justify-between lg:mb-6">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{title}</h1>
              {subtitle && <p className="font-semibold text-gray-900">{subtitle}</p>}
            </div>
            <Button
              icon={<HiXMark className="h-5 w-5" />}
              variant="transparent"
              size="xs"
              onClick={toggleVisibility}
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-6">{children}</div>
        </div>
      </div>
    </>
  );
});

Modal.displayName = 'Modal';
