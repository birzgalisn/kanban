import Image from "next/image";
import Link from "next/link";
import React from "react";
import { z } from "zod";

import { Button } from "@/ui/button";
import { Form, Input, useForm } from "@/ui/form";
import { useRouter } from "next/router";
import { Avatar } from "./components/Avatar";
import { GroupSkeleton } from "./components/GroupSkeleton";

const SigninSchema = z.object({
  email: z.string().nullish(),
});

export const Landing: React.FC<{}> = () => {
  const router = useRouter();
  const form = useForm({ schema: SigninSchema });

  return (
    <div className="absolute w-full bg-gradient-to-br from-kanban-green to-kanban-blue">
      <div className="relative flex flex-col overflow-x-hidden bg-white/95 backdrop-blur-xl">
        <main className="mx-auto flex h-full min-h-screen w-full max-w-screen-xl flex-col px-2 pt-8">
          <nav className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2 text-xl font-semibold">
              <Image
                src="/kanban.svg"
                alt="kanban logo"
                width={21}
                height={21}
              />
              Kanban
            </div>
            <ul className="flex flex-row items-center gap-12">
              <li>
                <Link
                  className="whitespace-nowrap rounded py-2 px-6 text-sm font-medium text-gray-700 outline-none duration-300 ease-in-out hover:text-kanban-blue"
                  href={"/auth/signin"}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  className="whitespace-nowrap rounded border border-gray-200 px-6 py-2 text-sm font-medium text-gray-700 outline-none duration-300 ease-in-out hover:border-transparent hover:bg-kanban-blue hover:text-white"
                  href={"/auth/signup"}
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>

          <section className="my-20 flex flex-col">
            <h1 className="mb-20 text-6xl font-semibold subpixel-antialiased">
              Manage projects <br /> easily
            </h1>
            <Form
              className="flex max-w-xs flex-row"
              form={form}
              onSubmit={({ email }) => {
                router.push({ pathname: "/auth/signin", query: { email } });
              }}
            >
              <Input
                className="rounded-r-none"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                {...form.register("email")}
              />
              <Button
                className="z-10 whitespace-nowrap rounded-l-none py-0"
                size="sm"
                type="submit"
              >
                Sign in
              </Button>
            </Form>
          </section>

          <section className="flex-start mx-auto mt-16 flex w-full gap-12 pb-16">
            <GroupSkeleton tasks={2} className="-ml-[36rem] lg:-ml-24" />
            <GroupSkeleton tasks={1} />
            <GroupSkeleton tasks={2}>
              <div className="relative h-20 w-full rounded-lg bg-gray-200">
                <div className="absolute -mt-20 -ml-8 flex h-32 w-80 flex-col gap-2 rounded-lg bg-white p-4 shadow-lg">
                  <h2 className="text-lg font-semibold subpixel-antialiased">
                    How to increase the landing page conversion
                  </h2>
                  <span className="max-w-min rounded-full bg-purple-100 px-2 py-1 text-sm font-medium text-purple-700">
                    Research
                  </span>
                  <Avatar className="absolute bottom-0 right-0 mb-4 mr-4 h-8 w-8" />
                </div>
              </div>
            </GroupSkeleton>
            <GroupSkeleton tasks={2} />
            <GroupSkeleton tasks={1} />
          </section>
        </main>

        <footer className="flex h-24 w-full items-center justify-center gap-2 border-t bg-white">
          <div className="flex flex-row items-center gap-2">
            <Image src="/kanban.svg" alt="kanban logo" width={17} height={17} />
            Kanban.
          </div>
          <span>All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
};
