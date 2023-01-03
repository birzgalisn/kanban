import Link from "next/link";
import React from "react";

import type { LinkProps } from "next/link";

import { HiOutlineArrowRight } from "react-icons/hi2";

export const PreviewCard: React.FC<{
  title: string;
  href: LinkProps["href"];
  children?: React.ReactNode;
}> = ({ title, href, children, ...props }) => {
  return (
    <div
      className="min-h-24 flex w-80 shrink-0 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
      {...props}
    >
      <Link className="mb-2 text-lg font-semibold" {...{ href }}>
        {title}
      </Link>
      <div className="flex w-full flex-row items-center justify-between overflow-hidden">
        {children && <div className="mx-2 flex w-full flex-1">{children}</div>}
        <Link className="flex w-full justify-end" {...{ href }}>
          <HiOutlineArrowRight className="h-4 w-4 stroke-gray-400 stroke-2 duration-300 ease-in-out hover:-rotate-45 hover:stroke-black" />
        </Link>
      </div>
    </div>
  );
};
