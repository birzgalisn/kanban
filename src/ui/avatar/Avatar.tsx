import clsx from "clsx";
import Image from "next/image";
import React from "react";

import type { ImageProps } from "next/image";

export const Avatar: React.FC<{
  className?: string;
  src?: ImageProps["src"] | null;
  alt?: ImageProps["alt"] | null;
  sizes: ImageProps["sizes"];
}> = ({ className, src, alt, sizes }) => {
  return (
    <div className={clsx(sizes, className)}>
      <div className="relative h-full w-full">
        <Image
          className="rounded-full object-contain"
          src={src ?? "/avatars/0.svg"}
          alt={alt ? `${alt} avatar` : "Avatar"}
          fill
          {...{ sizes }}
        />
      </div>
    </div>
  );
};
