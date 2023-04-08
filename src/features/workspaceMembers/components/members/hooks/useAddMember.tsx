import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { GET_WORKSPACES } from '@/features/workspaces/hooks';
import { GET_MEMBERS, MEMBER_PREVIEW_FIELDS } from '../../../hooks/useMembers';

import type {
  MembersQuery,
  MembersQueryVariables,
} from '@/features/workspaceMembers/hooks/__generated__/useMembers.generated';
import type {
  WorkspacesQuery,
  WorkspacesQueryVariables,
} from '@/features/workspaces/hooks/__generated__/useWorkspaces.generated';
import type {
  AddMemberMutation,
  AddMemberMutationVariables,
} from './__generated__/useAddMember.generated';

import { useZodForm } from '@/components/form';

import { input as memberValidateError } from '@/fixtures/member/error';

const Memberchema = z.object({
  email: z
    .string()
    .min(8, { message: memberValidateError.email.length.tooSmall })
    .max(32, { message: memberValidateError.email.length.tooBig })
    .email({ message: memberValidateError.email.invalid }),
});

type UseAddMemberProps = AddMemberMutationVariables;

export function useAddMember() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const [addMember] = useMutation<AddMemberMutation, AddMemberMutationVariables>(
    gql`
      mutation AddMember($input: AddMemberInput!, $workspaceId: String!) {
        addMember(input: $input, workspaceId: $workspaceId) {
          ... on MutationAddMemberSuccess {
            data {
              ...MemberPreviewFields
            }
          }
          ... on ZodError {
            fieldErrors {
              path
              message
            }
          }
        }
      }
      ${MEMBER_PREVIEW_FIELDS}
    `,
    {
      update(cache, { data }) {
        const addedMember = data?.addMember;

        if (addedMember?.__typename === 'ZodError') {
          addedMember.fieldErrors.forEach((error) => {
            const [field] = error.path.slice(-1) as any;
            form.setError(field, { message: error.message });
          });
          return;
        }

        if (addedMember?.__typename !== 'MutationAddMemberSuccess') return;

        const existingMembers = cache.readQuery<MembersQuery, MembersQueryVariables>({
          query: GET_MEMBERS,
          variables: { workspaceId },
        });

        if (!existingMembers) return;

        cache.writeQuery<MembersQuery, MembersQueryVariables>({
          query: GET_MEMBERS,
          variables: { workspaceId },
          data: {
            ...existingMembers,
            members: existingMembers.members.concat(addedMember.data),
          },
        });

        const existingWorkspaces = cache.readQuery<WorkspacesQuery, WorkspacesQueryVariables>({
          query: GET_WORKSPACES,
        });

        if (!existingWorkspaces?.workspaces) return;

        cache.writeQuery<WorkspacesQuery, WorkspacesQueryVariables>({
          query: GET_WORKSPACES,
          data: {
            workspaces: existingWorkspaces.workspaces?.map((workspace) => {
              if (workspace.id === workspaceId)
                return {
                  ...workspace,
                  members: workspace.members.concat(addedMember.data),
                };
              return workspace;
            }),
          },
        });
      },
      onCompleted({ addMember }) {
        if (addMember.__typename !== 'MutationAddMemberSuccess') return;

        form.reset();
      },
    },
  );

  const form = useZodForm({ schema: Memberchema });
  const handleSubmit = async (input: UseAddMemberProps['input']) => {
    await addMember({
      variables: { input, workspaceId },
    });
  };

  return [form, handleSubmit] as const;
}
