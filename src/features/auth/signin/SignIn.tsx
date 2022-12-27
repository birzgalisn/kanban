import { useRouter } from "next/router";
import React from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { z } from "zod";

import { Container } from "@/components/container";
import { Button } from "@/ui/button";
import { Form, Input, useZodForm } from "@/ui/form";
import { Divider } from "../components/Divider";
import { Heading } from "../components/Heading";
import { Modal } from "../components/Modal";

import { input as signInValidateError } from "@/fixtures/auth/error";

const SignInSchema = z.object({
  email: z
    .string()
    .min(6, { message: signInValidateError.email.length.tooSmall })
    .max(32, { message: signInValidateError.email.length.tooBig })
    .email({ message: signInValidateError.email.invalid }),
  password: z
    .string()
    .min(6, { message: signInValidateError.password.length.tooSmall })
    .max(64, { message: signInValidateError.password.length.tooBig }),
});

export const SignIn: React.FC<{}> = () => {
  const router = useRouter();
  const form = useZodForm({ schema: SignInSchema });

  return (
    <Container>
      <Heading />
      <Modal
        title="Sign in"
        aside={{
          title: "Welcome back!",
          subtitle: "It's great to see you again!",
        }}
        link={{
          leading: "Don't have an account yet?",
          title: "Sign up",
          href: "/auth/signup",
        }}
      >
        <Button startIcon={<FaGithub />} variant="secondary">
          Sign in with GitHub
        </Button>
        <Button startIcon={<FaDiscord />} variant="secondary">
          Sign in with Discord
        </Button>

        <Divider text="Or" />

        <Form form={form} onSubmit={(input) => ({})}>
          <Input
            label="Email"
            placeholder="Enter your email address"
            {...form.register("email")}
          />
          <Input
            type="password"
            label="Password"
            placeholder="• • • • • • • •"
            {...form.register("password")}
          />
          <Button type="submit">Sign in</Button>
        </Form>
      </Modal>
    </Container>
  );
};
