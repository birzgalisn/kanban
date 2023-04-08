import Head from 'next/head';

import type { NextPage } from 'next';

import { Settings } from '@/features/settings';

const SettingsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings - Kanban</title>
        <link rel="icon" href="/assets/images/favicon.ico" />
      </Head>

      <Settings />
    </>
  );
};

export default SettingsPage;
