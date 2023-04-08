import Head from 'next/head';

import type { NextPage } from 'next';

import { SignUp } from '@/features/auth/signup';

const SignUpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign up - Kanban</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
        <meta name="description" content="Sign up for your Kanban account" />
      </Head>

      <SignUp />
    </>
  );
};

export default SignUpPage;
