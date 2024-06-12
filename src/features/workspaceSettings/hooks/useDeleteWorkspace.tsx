import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { GET_WORKSPACES } from '@/features/workspaces/hooks';

import type {
  WorkspacesQuery,
  WorkspacesQueryVariables,
} from '@/features/workspaces/hooks/__generated__/useWorkspaces.generated';
import type {
  DeleteWorkspaceMutation,
  DeleteWorkspaceMutationVariables,
} from './__generated__/useDeleteWorkspace.generated';

type UseDeleteWorkspace = DeleteWorkspaceMutationVariables;

export function useDeleteWorkspace() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const [deleteWorkspace] = useMutation<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>(
    gql`
      mutation DeleteWorkspace($workspaceId: String!) {
        deleteWorkspace(workspaceId: $workspaceId) {
          id
        }
      }
    `,
    {
      update(cache, { data }) {
        const deletedWorkspace = data?.deleteWorkspace;

        if (!deletedWorkspace) return;

        const existingWorkspaces = cache.readQuery<WorkspacesQuery, WorkspacesQueryVariables>({
          query: GET_WORKSPACES,
        })?.workspaces;

        if (!existingWorkspaces) return;

        cache.writeQuery<WorkspacesQuery, WorkspacesQueryVariables>({
          query: GET_WORKSPACES,
          data: {
            workspaces: existingWorkspaces.filter(
              (workspace) => workspace.id !== deletedWorkspace.id,
            ),
          },
        });
      },
      onCompleted({ deleteWorkspace }) {
        if (!deleteWorkspace) return;

        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/workspaces`);
      },
    },
  );

  return (variables: UseDeleteWorkspace) =>
    deleteWorkspace({
      variables,
      optimisticResponse: {
        deleteWorkspace: {
          id: variables.workspaceId,
        },
      },
    });
}
