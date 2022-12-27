import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Heading: React.FC<{}> = () => {
  return (
    <div className="mb-12 flex h-12 flex-row items-center gap-2 lg:mb-20">
      <Link
        className="flex flex-row items-center gap-2 text-xl font-semibold outline-none"
        href="/"
      >
        <Image src="/kanban.svg" alt="kanban logo" width={21} height={21} />
        Kanban
      </Link>
    </div>
  );
};
