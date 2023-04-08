import { useZodForm } from '@/components/form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { GET_WORKSPACE } from '@/features/workspace/hooks';
import { GET_WORKSPACES } from '@/features/workspaces/hooks';

import type {
  EditWorkspaceTitleMutation,
  EditWorkspaceTitleMutationVariables,
  WorkspaceSettingsQuery,
  WorkspaceSettingsQueryVariables,
} from './__generated__/useEditSettings.generated';

import type {
  WorkspaceQuery,
  WorkspaceQueryVariables,
} from '@/features/workspace/hooks/__generated__/useWorkspace.generated';
import type {
  WorkspacesQuery,
  WorkspacesQueryVariables,
} from '@/features/workspaces/hooks/__generated__/useWorkspaces.generated';

import { input as workspaceValidateError } from '@/fixtures/workspace/error';

const WorkspaceSchema = z.object({
  title: z
    .string()
    .min(1, { message: workspaceValidateError.title.length.tooSmall })
    .max(50, { message: workspaceValidateError.title.length.tooBig }),
});

type UseEditSettingsProps = EditWorkspaceTitleMutationVariables;

export function useEditSettings() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const workspaceQuery = useQuery<WorkspaceSettingsQuery, WorkspaceSettingsQueryVariables>(
    gql`
      query WorkspaceSettings($workspaceId: String!) {
        workspace(id: $workspaceId) {
          id
          title
        }
      }
    `,
    {
      variables: { workspaceId },
      skip: !router.isReady,
    },
  );

  const [editWorkspace] = useMutation<
    EditWorkspaceTitleMutation,
    EditWorkspaceTitleMutationVariables
  >(
    gql`
      mutation EditWorkspaceTitle($input: EditWorkspaceTitleInput!, $workspaceId: String!) {
        editWorkspaceTitle(input: $input, workspaceId: $workspaceId) {
          ... on MutationEditWorkspaceTitleSuccess {
            data {
              id
              title
            }
          }
        }
      }
    `,
    {
      update(cache, { data }) {
        const editedWorkspace = data?.editWorkspaceTitle;

        if (editedWorkspace?.__typename !== 'MutationEditWorkspaceTitleSuccess') return;

        const existingWorkspace = cache.readQuery<WorkspaceQuery, WorkspaceQueryVariables>({
          query: GET_WORKSPACE,
          variables: { workspaceId },
        })?.workspace;

        if (!existingWorkspace) return;

        cache.writeQuery<WorkspaceQuery, WorkspaceQueryVariables>({
          query: GET_WORKSPACE,
          variables: { workspaceId },
          data: {
            workspace: {
              ...existingWorkspace,
              title: editedWorkspace.data.title,
            },
          },
        });

        const existingWorkspaces = cache.readQuery<WorkspacesQuery, WorkspacesQueryVariables>({
          query: GET_WORKSPACES,
        })?.workspaces;

        if (!existingWorkspaces) return;

        cache.writeQuery<WorkspacesQuery, WorkspacesQueryVariables>({
          query: GET_WORKSPACES,
          data: {
            workspaces: existingWorkspaces.map((workspace) => {
              if (workspace.id === editedWorkspace.data.id)
                return {
                  ...workspace,
                  title: editedWorkspace.data.title,
                };
              return workspace;
            }),
          },
        });
      },
    },
  );

  const form = useZodForm({ schema: WorkspaceSchema });
  const handleSubmit = async (input: UseEditSettingsProps['input']) => {
    await editWorkspace({
      variables: { input, workspaceId },
      optimisticResponse: {
        editWorkspaceTitle: {
          data: {
            id: workspaceId,
            title: input.title,
          },
        },
      },
    });
  };

  return [workspaceQuery, form, handleSubmit] as const;
}
