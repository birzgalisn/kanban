import Head from "next/head";

import type { NextPage } from "next";

import { Workspaces } from "@/features/workspaces";

const WorkspacesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Workspaces - Kanban</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
      </Head>

      <Workspaces />
    </>
  );
};

export default WorkspacesPage;
