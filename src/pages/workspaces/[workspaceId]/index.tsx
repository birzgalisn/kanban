import Head from 'next/head';

import type { NextPage } from 'next';

import { Workspace } from '@/features/workspace';

const WorkspacePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Workspace - Kanban</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
      </Head>

      <Workspace />
    </>
  );
};

export default WorkspacePage;
