import clsx from "clsx";
import Link from "next/link";
import React from "react";

import type { UrlObject } from "url";

export const AuthModal: React.FC<{
  title: string;
  aside?: { title: string; subtitle: string };
  link?: { leading: string; href: string | UrlObject; title: string };
  back?: React.ReactElement | null;
  children: React.ReactNode;
}> = ({ title, aside, link, back, children }) => {
  return (
    <div className="mx-auto flex w-full flex-col lg:flex-row">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col lg:justify-start">
        {aside?.title && (
          <h1 className="text-5xl font-semibold lg:text-7xl">{aside.title}</h1>
        )}
        {aside?.subtitle && (
          <p className="mt-2 font-semibold text-gray-900 lg:mt-4">
            {aside.subtitle}
          </p>
        )}
      </div>
      <div className="flex w-full flex-1 lg:justify-end">
        <div
          className={clsx(
            "mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 rounded-lg border border-gray-200 bg-white px-6 pb-6 shadow-lg lg:mx-0 lg:gap-6 lg:px-10 lg:pb-10",
            link ? "pt-3 lg:pt-5" : "pt-6 lg:pt-10",
          )}
        >
          <div className="flex h-9 flex-row items-start justify-between">
            {back}
            {link && (
              <div className="flex flex-1 flex-row justify-end gap-1">
                <p>{link.leading}</p>
                <Link
                  className="text-kanban-blue outline-none"
                  href={link.href}
                >
                  {link.title}
                </Link>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};
