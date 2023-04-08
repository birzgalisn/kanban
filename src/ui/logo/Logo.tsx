import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { ImageProps } from 'next/image';
import type { LinkProps } from 'next/link';

export const Logo: React.FC<{
  className?: string;
  href?: LinkProps['href'];
  width: ImageProps['width'];
  height: ImageProps['height'];
  wrap?: boolean;
  noTitle?: boolean;
}> = ({ className, wrap = false, noTitle = false, width, height, href }) => {
  return (
    <Link
      className={clsx('flex min-h-fit min-w-fit items-center outline-none', className)}
      href={href ?? '/'}
    >
      <div className="relative h-full w-full">
        <Image
          className="object-contain"
          src="/assets/images/logo.svg"
          alt="Kanban logo"
          {...{ width, height }}
        />
      </div>
      {!noTitle && (
        <span className={clsx('ml-2 text-xl font-semibold', wrap && 'hidden xs:block')}>
          Kanban
        </span>
      )}
    </Link>
  );
};
