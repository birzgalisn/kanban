import React from "react";

import { useMembers } from "./hooks";

import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Navbar } from "@/components/navbar";
import { SectionHeading } from "@/components/section/SectionHeading";
import { SectionWrapper } from "../../components/section/";
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
        <SectionWrapper>
          <SectionHeading
            title="Members"
            subtitle="All assigned members to the workspace"
          />
          <Members isLoading={membersQuery.loading} members={members} />
        </SectionWrapper>
      </Layout>
    </LayoutWrapper>
  );
};
