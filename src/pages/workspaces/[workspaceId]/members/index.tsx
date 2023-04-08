import Head from 'next/head';

import type { NextPage } from 'next';

import { WorkspaceMembers } from '@/features/workspaceMembers';

const WorkspaceMembersPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Workspace members - Kanban</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
      </Head>

      <WorkspaceMembers />
    </>
  );
};

export default WorkspaceMembersPage;
