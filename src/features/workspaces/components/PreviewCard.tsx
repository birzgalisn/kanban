import Link from "next/link";
import React from "react";

import type { LinkProps } from "next/link";

import { HiOutlineArrowRight } from "react-icons/hi2";

export const PreviewCard: React.FC<{
  title: string;
  href: LinkProps["href"];
  children?: React.ReactNode;
}> = ({ title, href, children }) => {
  return (
    <Link
      className="min-h-24 flex w-80 shrink-0 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow duration-300 ease-in-out hover:shadow-lg"
      {...{ href }}
    >
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <div className="flex w-full flex-row items-center justify-between overflow-hidden">
        {children && <div className="mx-2 flex w-full flex-1">{children}</div>}
        <HiOutlineArrowRight className="h-5 w-5" />
      </div>
    </Link>
  );
};
