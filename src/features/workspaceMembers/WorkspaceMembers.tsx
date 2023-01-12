import React from "react";

import { useMembers } from "./hooks";

import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Navbar } from "@/components/navbar";
import { Section, WorkspaceMembersWrapper } from "../../components/section/";
import { Members } from "./components/members";

export const WorkspaceMembers: React.FC<{}> = () => {
  const membersQuery = useMembers();
  const members = membersQuery.data?.members;
  const workspace = membersQuery.data?.workspace;

  return (
    <LayoutWrapper>
      <Navbar
        isLoading={membersQuery.loading}
        path={[
          {
            title: workspace?.title,
            url: `/workspaces/${workspace?.id}`,
          },
          {
            title: "Members",
            url: `/workspaces/${workspace?.id}/members`,
          },
        ]}
      />
      <Layout noMargin>
        <WorkspaceMembersWrapper>
          <Section>
            <h1 className="text-3xl font-bold">Members</h1>
            <p className="mt-2 font-semibold text-gray-900">
              All assigned members to the workspace
            </p>
          </Section>
          <Members isLoading={membersQuery.loading} members={members} />
        </WorkspaceMembersWrapper>
      </Layout>
    </LayoutWrapper>
  );
};
