import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { z } from "zod";

import { Container } from "@/components/container";
import { Form, Input, useZodForm } from "@/components/form";
import { Avatar } from "@/ui/avatar/Avatar";
import { Button } from "@/ui/button";
import { Logo } from "@/ui/logo";
import { GroupScaffold } from "./components/GroupScaffold";

const SignInSchema = z.object({
  email: z.string().nullish(),
});

export const Landing: React.FC<{}> = () => {
  const router = useRouter();
  const form = useZodForm({ schema: SignInSchema });

  return (
    <Container>
      <nav className="mb-12 flex h-12 w-full flex-row items-center justify-between gap-2 lg:mb-20">
        <Logo wrap width={21} height={21} />
        <ul className="flex flex-row items-center gap-4 lg:gap-12">
          <li>
            <Link href="/auth/signin">
              <Button variant="none">Sign in</Button>
            </Link>
          </li>
          <li>
            <Link href="/auth/signup">
              <Button variant="secondary">Sign up</Button>
            </Link>
          </li>
        </ul>
      </nav>

      <section className="mb-12 flex flex-col lg:mb-20">
        <h1 className="mb-12 text-5xl font-semibold subpixel-antialiased lg:mb-20 lg:text-7xl">
          Manage projects <br /> easily
        </h1>
        <Form
          className="flex max-w-sm flex-row"
          form={form}
          onSubmit={({ email }) => {
            router.push({ pathname: "/auth/signin", query: { email } });
          }}
        >
          <Input
            className="rounded-r-none"
            placeholder="Enter your email address"
            {...form.register("email")}
          />
          <Button className="shrink-0 rounded-l-none" type="submit">
            Sign in
          </Button>
        </Form>
      </section>

      <section className="flex-start mx-auto mt-16 flex w-full gap-12 pb-12 lg:pb-20">
        <GroupScaffold tasks={2} className="-ml-[36rem] lg:-ml-24" />
        <GroupScaffold tasks={1} />
        <GroupScaffold tasks={2}>
          <div className="relative h-20 w-full rounded-lg bg-gray-200">
            <div className="absolute -ml-8 -mt-20 flex h-32 w-80 flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-2xl">
              <h2 className="text-lg font-semibold subpixel-antialiased">
                How to increase the landing page conversion
              </h2>
              <span className="max-w-min rounded bg-purple-100 px-2 py-1 text-sm font-medium text-purple-700">
                Research
              </span>
              <Avatar
                className="absolute bottom-0 right-0 mb-4 mr-4"
                size="w-8 h-8"
              />
            </div>
          </div>
        </GroupScaffold>
        <GroupScaffold tasks={2} />
        <GroupScaffold tasks={1} />
      </section>
    </Container>
  );
};
