import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { GET_MEMBERS } from "@/features/workspaceMembers/hooks";
import { GET_WORKSPACES } from "@/features/workspaces/hooks";

import type {
  MembersQuery,
  MembersQueryVariables,
} from "@/features/workspaceMembers/hooks/__generated__/useMembers.generated";
import {
  WorkspacesQuery,
  WorkspacesQueryVariables,
} from "@/features/workspaces/hooks/__generated__/useWorkspaces.generated";
import type {
  RemoveMemberMutation,
  RemoveMemberMutationVariables,
} from "./__generated__/useRemoveMember.generated";

type UseRemoveMemberProps = {} & RemoveMemberMutationVariables;

export function useRemoveMember() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const [removeMember] = useMutation<
    RemoveMemberMutation,
    RemoveMemberMutationVariables
  >(
    gql`
      mutation RemoveMember($memberId: String!) {
        removeMember(memberId: $memberId) {
          ... on MutationRemoveMemberSuccess {
            data {
              id
            }
          }
        }
      }
    `,
  );

  return (variables: UseRemoveMemberProps) =>
    removeMember({
      variables,
      update(cache, { data }) {
        const removedMember = data?.removeMember;

        if (removedMember?.__typename !== "MutationRemoveMemberSuccess") return;

        const existingMembers = cache.readQuery<
          MembersQuery,
          MembersQueryVariables
        >({
          query: GET_MEMBERS,
          variables: {
            workspaceId,
          },
        });

        if (!existingMembers) return;

        cache.writeQuery<MembersQuery, MembersQueryVariables>({
          query: GET_MEMBERS,
          variables: { workspaceId },
          data: {
            ...existingMembers,
            members: existingMembers.members.filter(
              (member) => member.id !== removedMember.data.id,
            ),
          },
        });

        const existingWorkspaces = cache.readQuery<
          WorkspacesQuery,
          WorkspacesQueryVariables
        >({ query: GET_WORKSPACES });

        if (!existingWorkspaces?.workspaces) return;

        cache.writeQuery<WorkspacesQuery, WorkspacesQueryVariables>({
          query: GET_WORKSPACES,
          data: {
            workspaces: existingWorkspaces.workspaces?.map((workspace) => {
              if (workspace.id === workspaceId)
                return {
                  ...workspace,
                  members: workspace.members.filter(
                    (member) => member.id !== variables.memberId,
                  ),
                };
              return workspace;
            }),
          },
        });
      },
    });
}
