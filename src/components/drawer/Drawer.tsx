import React, { forwardRef, useImperativeHandle, useState } from "react";

import { Button } from "@/ui/button";
import { HiXMark } from "react-icons/hi2";

export type DrawerHandle = {
  toggleVisibility: () => void;
};

type DrawerProps = {
  title?: React.ReactNode | string;
  children: React.ReactNode;
};

export const Drawer = forwardRef<DrawerHandle, DrawerProps>(
  ({ title, children }, refs) => {
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
        <div className="fixed inset-0 left-auto z-20 h-full w-full max-w-7xl border-l border-gray-200 shadow-3xl">
          <div className="flex h-full w-full flex-col bg-white">
            <div className="flex items-start justify-between border-b border-gray-200 p-6">
              {title}
              <Button
                className="ml-4"
                icon={<HiXMark className="h-5 w-5" />}
                variant="transparent"
                size="xs"
                onClick={toggleVisibility}
              />
            </div>
            {children}
          </div>
        </div>
      </>
    );
  },
);

Drawer.displayName = "Drawer";
