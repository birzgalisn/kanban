import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

import type { BuiltInProviderType } from 'next-auth/providers';
import type { SignInOptions, SignInResponse } from 'next-auth/react';

import { Container } from '@/components/container';
import { Form, Input, useZodForm } from '@/components/form';
import { Button } from '@/ui/button';
// import { FaDiscord, FaGithub } from 'react-icons/fa';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import { AuthModal } from '../components/AuthModal';
import { Divider } from '../components/Divider';
import { ErrorMessage } from '../components/ErrorMessage';
import { Heading } from '../components/Heading';

import { input as signInValidateError } from '@/fixtures/auth/error';

const SignInSchema = z.object({
  email: z
    .string()
    .min(8, { message: signInValidateError.email.length.tooSmall })
    .max(32, { message: signInValidateError.email.length.tooBig })
    .email({ message: signInValidateError.email.invalid }),
  password: z
    .string()
    .min(6, { message: signInValidateError.password.length.tooSmall })
    .max(64, { message: signInValidateError.password.length.tooBig }),
});

export const SignIn: React.FC = () => {
  const router = useRouter();
  const error = router.query.error as string;
  const email = router.query.email as string;
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [withCredentials, setWithCredentials] = useState<boolean>();
  const form = useZodForm({ schema: SignInSchema });

  useEffect(() => {
    if (error) {
      setMessage('Hmm... something is wrong with the account');
    }
    if (email) {
      setWithCredentials(true);
      form.reset({ email });
    }
  }, [email, error, form]);

  useEffect(() => {
    if (message) setTimeout(() => setMessage(undefined), 6000);
  }, [message]);

  const signInWith = async (provider: BuiltInProviderType, options: SignInOptions) => {
    const res = (await signIn(provider, {
      ...(provider === 'credentials' && {
        email: options?.email,
        password: options?.password,
      }),
      callbackUrl: options.callbackUrl,
      redirect: options.redirect || false,
    })) as SignInResponse;
    if (res?.ok && options.callbackUrl) {
      return router.push(options.callbackUrl);
    } else if (res?.error) {
      setMessage('Hmm... either email or password is wrong here');
    }
  };

  return (
    <Container>
      <Heading />
      <AuthModal
        title="Sign in"
        aside={{
          title: 'Welcome back!',
          subtitle: "It's great to see you again!",
        }}
        link={{
          leading: "Don't have an account yet?",
          title: 'Sign up',
          href: '/auth/signup',
        }}
        back={
          withCredentials ? (
            <Button
              variant="transparent"
              size="xs"
              icon={<HiOutlineArrowLeft className="h-5 w-5" />}
              onClick={() => setWithCredentials(false)}
            />
          ) : null
        }
      >
        <ErrorMessage message={message} />
        {!withCredentials ? (
          <>
            {/* <Button
              variant="secondary"
              icon={<FaGithub />}
              onClick={() => signInWith('github', { callbackUrl: '/workspaces' })}
            >
              Sign in with GitHub
            </Button>
            <Button
              variant="secondary"
              icon={<FaDiscord />}
              onClick={() => signInWith('discord', { callbackUrl: '/workspaces' })}
            >
              Sign in with Discord
            </Button> */}
            <Button variant="secondary" onClick={() => setWithCredentials(true)}>
              Continue with email and password
            </Button>
            <Divider text="Or" />
            <Button
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                signInWith('credentials', {
                  email: 'guest@kanban.lv',
                  password: 'N77BFCm1o2obv5L36rER',
                  callbackUrl: '/workspaces',
                });
              }}
            >
              Continue as guest
            </Button>
          </>
        ) : (
          <>
            <Form
              form={form}
              onSubmit={({ email, password }) =>
                signInWith('credentials', {
                  email,
                  password,
                  callbackUrl: '/workspaces',
                })
              }
              autoComplete="on"
            >
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email address"
                autoComplete="email"
                {...form.register('email')}
                autoFocus
              />
              <Input
                type="password"
                label="Password"
                placeholder="• • • • • • • •"
                autoComplete="current-password"
                {...(email && { autoFocus: true })}
                {...form.register('password')}
              />
              <Button type="submit" isLoading={form.formState.isSubmitting}>
                Sign in
              </Button>
            </Form>
          </>
        )}
      </AuthModal>
    </Container>
  );
};
