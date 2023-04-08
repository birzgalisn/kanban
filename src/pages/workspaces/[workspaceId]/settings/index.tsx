import Head from 'next/head';

import type { NextPage } from 'next';

import { WorkspaceSettings } from '@/features/workspaceSettings';

const WorkspaceSettingsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Workspace settings - Kanban</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
      </Head>

      <WorkspaceSettings />
    </>
  );
};

export default WorkspaceSettingsPage;
