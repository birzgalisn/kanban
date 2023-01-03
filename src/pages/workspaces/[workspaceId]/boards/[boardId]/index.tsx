import Head from "next/head";

import type { NextPage } from "next";

import { Board } from "@/features/board";

const BoardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Board - Kanban</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
      </Head>

      <Board />
    </>
  );
};

export default BoardPage;
