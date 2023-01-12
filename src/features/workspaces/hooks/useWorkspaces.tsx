import { gql, useQuery } from "@apollo/client";

import type { WorkspacesQuery } from "./__generated__/useWorkspaces.generated";

export const WORKSPACE_PREVIEW_FIELDS = gql`
  fragment WorkspacePreviewFields on Workspace {
    id
    title
    members {
      id
      user {
        image
      }
    }
  }
`;

export const GET_WORKSPACES = gql`
  query Workspaces {
    workspaces {
      ...WorkspacePreviewFields
    }
  }
  ${WORKSPACE_PREVIEW_FIELDS}
`;

export function useWorkspaces() {
  const workspacesResult = useQuery<WorkspacesQuery>(GET_WORKSPACES);

  return workspacesResult;
}
