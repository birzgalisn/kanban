import { gql, useMutation } from "@apollo/client";
import { signIn } from "next-auth/react";
import React from "react";
import { z } from "zod";

import type {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "./__generated__/SignUp.generated";

import { input as signUpValidateError } from "@/fixtures/auth/error";

import { Container } from "@/components/container";
import { Form, Input, useZodForm } from "@/components/form";
import { Button } from "@/ui/button";
import { AuthModal } from "../components/AuthModal";
import { Heading } from "../components/Heading";

const PasswordValidate = z
  .string()
  .min(6, { message: signUpValidateError.password.length.tooSmall })
  .max(64, { message: signUpValidateError.password.length.tooBig });

const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(8, { message: signUpValidateError.email.length.tooSmall })
      .max(32, { message: signUpValidateError.email.length.tooBig })
      .email({ message: signUpValidateError.email.invalid }),
    name: z
      .string()
      .min(1, { message: signUpValidateError.name.length.tooSmall })
      .max(32, { message: signUpValidateError.name.length.tooBig }),
    password: PasswordValidate,
    confirmPassword: PasswordValidate,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: signUpValidateError.confirmPassword.invalid,
  });

export const SignUp: React.FC<{}> = () => {
  const form = useZodForm({ schema: SignUpSchema });
  const [createUser] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(
    gql`
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          ... on MutationCreateUserSuccess {
            data {
              id
            }
          }
          ... on ZodError {
            fieldErrors {
              message
              path
            }
          }
        }
      }
    `,
  );

  return (
    <Container>
      <Heading />
      <AuthModal
        title="Sign up"
        aside={{
          title: "Smooth project managament",
          subtitle: "In teamwork, silence isn't golden - it's deadly.",
        }}
        link={{
          leading: "Already have an account?",
          title: "Sign in",
          href: "/auth/signin",
        }}
      >
        <Form
          form={form}
          onSubmit={async ({ confirmPassword, ...input }) => {
            const createUserResult = await createUser({ variables: { input } });
            const data = createUserResult?.data?.createUser;
            if (data?.__typename === "ZodError") {
              return data.fieldErrors.forEach((error) => {
                const field = error.path.pop() as any;
                form.setError(field, { message: error.message });
              });
            }
            await signIn("credentials", {
              email: input.email,
              password: input.password,
              callbackUrl: "/workspaces",
            });
          }}
          autoComplete="on"
        >
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            autoComplete="email"
            {...form.register("email")}
            autoFocus
          />
          <Input
            label="Name"
            placeholder="Enter your name"
            autoComplete="given-name"
            {...form.register("name")}
          />
          <Input
            type="password"
            label="Password"
            placeholder="• • • • • • • •"
            autoComplete="new-password"
            {...form.register("password")}
          />
          <Input
            type="password"
            label="Confirm password"
            placeholder="• • • • • • • •"
            autoComplete="new-password"
            {...form.register("confirmPassword")}
          />
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Sign up
          </Button>
        </Form>
      </AuthModal>
    </Container>
  );
};
