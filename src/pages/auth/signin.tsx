import Head from "next/head";

import type { NextPage } from "next";

import { SignIn } from "@/features/auth/signin";

const SignInPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in - Kanban</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
        <meta name="description" content="Sign in to your Kanban account" />
      </Head>

      <SignIn />
    </>
  );
};

export default SignInPage;
