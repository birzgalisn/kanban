import Head from "next/head";

import { Landing } from "@/features/landing";

import type { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Manage projects easily - Kanban</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Manage your Kanban projects easily" />
      </Head>

      <Landing />
    </>
  );
};

export default HomePage;
