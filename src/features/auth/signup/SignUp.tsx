import { gql, useMutation } from "@apollo/client";
import { signIn } from "next-auth/react";
import React from "react";
import { z } from "zod";
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "./__generated__/SignUp.generated";

import { Container } from "@/components/container";
import { Button } from "@/ui/button";
import { Form, Input, useZodForm } from "@/ui/form";
import { Heading } from "../components/Heading";
import { Modal } from "../components/Modal";

import { input as signUpValidateError } from "@/fixtures/auth/error";

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
      <Modal
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
              redirectUrl: "/",
            });
          }}
        >
          <Input
            label="Email"
            placeholder="Enter your email"
            {...form.register("email")}
          />
          <Input
            label="Name"
            placeholder="Enter your name"
            {...form.register("name")}
          />
          <Input
            type="password"
            label="Password"
            placeholder="• • • • • • • •"
            {...form.register("password")}
          />
          <Input
            type="password"
            label="Confirm password"
            placeholder="• • • • • • • •"
            {...form.register("confirmPassword")}
          />
          <Button type="submit">Sign up</Button>
        </Form>
      </Modal>
    </Container>
  );
};
