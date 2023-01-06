import React, { forwardRef, useImperativeHandle, useState } from "react";

import { Button } from "@/ui/button";
import { HiXMark } from "react-icons/hi2";

export type DrawerHandle = {
  toggleVisibility: () => void;
};

type DrawerProps = {
  title?: string;
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
          className="fixed inset-0 z-10 h-screen w-screen bg-black opacity-50"
          onClick={toggleVisibility}
        ></div>
        <div className="fixed inset-0 left-auto z-20 h-full w-full max-w-4xl border-l border-gray-200 shadow-lg">
          <div className="flex h-full w-full flex-col bg-white p-6 lg:p-10">
            <div className="mb-4 flex justify-between border-b border-gray-200 pb-4 lg:mb-6 lg:pb-6">
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{title}</h1>
              </div>
              <Button
                startIcon={<HiXMark className="h-5 w-5" />}
                variant="transparent"
                size="sm"
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
