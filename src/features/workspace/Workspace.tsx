import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

import { WORKSPACE_PREVIEW_FIELDS } from "../workspaces";

import type { WorkspaceQuery } from "./__generated__/Workspace.generated";

import { Layout } from "@/components/layout";
import { WorkspaceNavbar } from "@/components/workspaceNavbar";
import { Button } from "@/ui/button";
import {
  HiOutlineGlobeEuropeAfrica,
  HiOutlineStar,
  HiOutlineUserPlus,
  HiPlus,
} from "react-icons/hi2";
import { WorkspaceLayout } from "../../components/workspaceLayout/WorkspaceLayout";
import { GreetingModal } from "./components/GreetingModal";
import { WorkspaceMenu } from "./components/WorkspaceMenu";

export const Workspace: React.FC<{}> = () => {
  const router = useRouter();
  const workspaceResult = useQuery<WorkspaceQuery>(
    gql`
      query Workspace($id: String!) {
        workspace(id: $id) {
          ...WorkspacePreviewFields
          boards {
            id
            title
          }
        }
      }
      ${WORKSPACE_PREVIEW_FIELDS}
    `,
    {
      variables: {
        id: router.query.workspaceId,
      },
    },
  );

  const workspace = workspaceResult.data?.workspace;

  return (
    <Layout noMargin>
      <WorkspaceNavbar
        title={workspace?.title}
        members={workspace?.members}
        isLoading={workspaceResult.loading}
      />
      <WorkspaceLayout>
        <WorkspaceMenu
          boards={workspace?.boards}
          isBoardsLoading={workspaceResult.loading}
        />
        <GreetingModal
          title="Great, you have a workspace already!"
          subtitle="Let's start with basics. What would you like to do first?"
        >
          <Button
            variant="transparent"
            startIcon={<HiPlus className="h-4 w-4" />}
            left
            fluid
          >
            Create a new board
          </Button>
          <Button
            variant="transparent"
            startIcon={<HiOutlineUserPlus className="h-4 w-4" />}
            left
            fluid
            disabled
          >
            Invite people to the workspace
          </Button>
          <Button
            variant="transparent"
            startIcon={<HiOutlineStar className="h-4 w-4" />}
            left
            fluid
            disabled
          >
            Star the workspace
          </Button>
          <Button
            variant="transparent"
            startIcon={<HiOutlineGlobeEuropeAfrica className="h-4 w-4" />}
            left
            fluid
            disabled
          >
            Make the workspace public
          </Button>
        </GreetingModal>
      </WorkspaceLayout>
    </Layout>
  );
};
