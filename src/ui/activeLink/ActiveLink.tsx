import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import type { LinkProps } from "next/link";

export const ActiveLink: React.FC<
  {
    title: string;
    disabled?: boolean;
  } & LinkProps
> = ({ title, disabled, ...props }) => {
  const router = useRouter();

  const isActiveLink = useMemo(() => {
    if (props.href instanceof Object) {
      return router.asPath.endsWith(props.href.href as string);
    }
    return router.asPath.endsWith(props.href);
  }, [props.href, router.asPath]);

  if (disabled)
    return (
      <div className="cursor-not-allowed select-none whitespace-nowrap border-b px-2 pb-2 pt-1 font-medium opacity-60 md:px-4">
        {title}
      </div>
    );

  return (
    <Link
      className={clsx(
        "whitespace-nowrap border-b px-2 pb-2 pt-1 font-medium hover:text-black hover:opacity-100 md:px-4",
        isActiveLink
          ? "border-b-2 border-blue-500"
          : "opacity-70 hover:border-b-2 hover:border-blue-300",
      )}
      {...props}
    >
      {title}
    </Link>
  );
};
