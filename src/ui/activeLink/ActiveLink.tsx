import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import type { LinkProps } from "next/link";

export const ActiveLink: React.FC<
  {
    title?: string;
    icon?: React.ReactElement;
    active?: boolean;
  } & LinkProps
> = ({ title, icon, active = true, ...props }) => {
  const router = useRouter();

  const isActiveLink = useMemo(() => {
    if (!active) return false;
    if (props.href instanceof Object) {
      return router.asPath.endsWith(props.href.href as string);
    }
    return router.asPath.endsWith(props.href);
  }, [active, props.href, router.asPath]);

  return (
    <Link
      className={clsx(
        "flex w-full items-center rounded-lg border border-transparent px-4 py-2 font-medium duration-300 ease-in-out hover:border-gray-300 hover:opacity-80",
        isActiveLink
          ? "bg-gray-100 hover:border"
          : "hover:border hover:bg-gray-50",
      )}
      {...props}
    >
      {icon}
      {title && <span className="mx-2 hidden xs:block">{title}</span>}
    </Link>
  );
};
