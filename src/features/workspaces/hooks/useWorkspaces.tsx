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

export function useWorkspaces() {
  const workspacesResult = useQuery<WorkspacesQuery>(
    gql`
      query Workspaces {
        workspaces {
          ...WorkspacePreviewFields
        }
      }
      ${WORKSPACE_PREVIEW_FIELDS}
    `,
  );

  return workspacesResult;
}
