import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { WORKSPACE_PREVIEW_FIELDS } from "@/features/workspaces/hooks";

import type {
  WorkspaceQuery,
  WorkspaceQueryVariables,
} from "./__generated__/useWorkspace.generated";

export const BOARD_PREVIEW_FIELDS = gql`
  fragment BoardPreviewFields on Board {
    id
    title
  }
`;

export const GET_WORKSPACE = gql`
  query Workspace($workspaceId: String!) {
    workspace(id: $workspaceId) {
      ...WorkspacePreviewFields
      boards {
        ...BoardPreviewFields
      }
    }
  }
  ${WORKSPACE_PREVIEW_FIELDS}
  ${BOARD_PREVIEW_FIELDS}
`;

export function useWorkspace() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const workspaceResult = useQuery<WorkspaceQuery, WorkspaceQueryVariables>(
    GET_WORKSPACE,
    {
      variables: { workspaceId },
      /**
       * IMPORTANT: Need to pause the request, before router is ready, in order,
       * to avoid making request with incorrect variables
       */
      skip: !router.isReady,
    },
  );

  return workspaceResult;
}
