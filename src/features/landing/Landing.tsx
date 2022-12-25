import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Avatar } from "./components/Avatar";
import { GroupSkeleton } from "./components/GroupSkeleton";

export const Landing: React.FC<{}> = () => {
  return (
    <>
      <div className="absolute h-screen w-full bg-gradient-to-br from-kanban-green to-kanban-blue"></div>

      <main className="relative flex h-screen w-full flex-col overflow-x-hidden bg-white/95 backdrop-blur-xl">
        <nav className="mx-2 my-8 flex flex-row items-center justify-between sm:mx-4 md:mx-8 lg:mx-16">
          <div className="flex flex-row items-center gap-2 text-xl font-semibold">
            <Image src="/kanban.svg" alt="kanban logo" width={21} height={21} />
            Kanban
          </div>
          <div className="flex flex-row items-center gap-1 sm:gap-4 md:gap-8 lg:gap-12">
            <Link
              className="whitespace-nowrap rounded-lg py-2 px-6 text-sm font-medium text-gray-900"
              href={"/auth/signin"}
            >
              Sign in
            </Link>
            <Link
              className="whitespace-nowrap rounded-lg border border-gray-200 px-6 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
              href={"/auth/signup"}
            >
              Sign up
            </Link>
          </div>
        </nav>

        <div className="my-12 mx-auto flex w-full max-w-4xl flex-col px-2">
          <h1 className="mb-12 text-5xl font-semibold subpixel-antialiased lg:text-6xl">
            Manage projects <br /> easily
          </h1>
          <Link
            href={"/auth/signin"}
            className="w-full max-w-fit rounded-lg bg-blue-700 px-6 py-3 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Sign in &rarr;
          </Link>
        </div>

        <div className="flex-start mx-auto my-12 flex h-full w-full gap-12">
          <div className="-ml-16 flex flex-row gap-12">
            <GroupSkeleton tasks={2} />
            <GroupSkeleton tasks={3} />
            <GroupSkeleton tasks={1} />
          </div>

          <GroupSkeleton tasks={1} className="max-w-min">
            <div className="relative flex h-full max-h-20 w-64 flex-1 items-center justify-center rounded-lg bg-gray-200">
              <div className="absolute -mt-24 flex max-h-32 w-80 flex-col gap-2 rounded-lg bg-white p-4 shadow-lg">
                <h2 className="text-lg font-semibold subpixel-antialiased">
                  How to increase the landing page conversion
                </h2>
                <span className="max-w-min rounded-full bg-purple-100 px-2 py-1 pt-0 text-sm font-semibold text-purple-700">
                  Research
                </span>
                <Avatar className="absolute bottom-0 right-0 mb-4 mr-4 h-8 w-8" />
              </div>
            </div>
          </GroupSkeleton>

          <div className="flex flex-row gap-12">
            <GroupSkeleton tasks={3} />
            <GroupSkeleton tasks={1} />
            <GroupSkeleton tasks={2} />
            <GroupSkeleton tasks={3} />
          </div>
        </div>
      </main>
    </>
  );
};
