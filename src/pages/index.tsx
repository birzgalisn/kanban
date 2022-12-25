import Head from "next/head";

import { Landing } from "@/features/landing";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kanban - Manage projects easily</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Manage your kanban projects easily" />
      </Head>

      <Landing />
    </>
  );
};

export default Home;
