import clsx from "clsx";
import Image from "next/image";
import React from "react";

import type { ImageProps } from "next/image";

export const Avatar: React.FC<{
  src?: ImageProps["src"] | null;
  alt?: ImageProps["alt"] | null;
  size: ImageProps["sizes"];
  className?: string;
}> = ({ className, src, alt, size }) => {
  return (
    <div className={clsx(size, className)}>
      <div className="relative h-full w-full">
        <Image
          className="rounded-full object-contain"
          src={src ?? "/avatars/0.svg"}
          alt={alt ? `${alt} avatar` : "Avatar"}
          sizes={size}
          fill
        />
      </div>
    </div>
  );
};
