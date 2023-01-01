import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { ImageProps } from "next/image";
import type { LinkProps } from "next/link";

export const Logo: React.FC<{
  className?: string;
  wrap?: boolean;
  width: ImageProps["width"];
  height: ImageProps["height"];
  href?: LinkProps["href"];
}> = ({ className, wrap = false, width, height, href }) => {
  return (
    <Link
      className={clsx(
        "flex min-h-fit min-w-fit items-center text-xl font-bold outline-none",
        className,
      )}
      href={href ?? "/"}
    >
      <div className="relative h-full w-full">
        <Image
          className="object-contain"
          src="/assets/images/logo.svg"
          alt="Kanban logo"
          {...{ width, height }}
        />
      </div>
      <span className={clsx("ml-2", wrap && "hidden xs:block")}>Kanban</span>
    </Link>
  );
};
