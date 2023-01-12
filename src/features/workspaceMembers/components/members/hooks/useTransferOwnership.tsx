import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { GET_MEMBERS } from "@/features/workspaceMembers/hooks";

import type {
  MembersQuery,
  MembersQueryVariables,
} from "@/features/workspaceMembers/hooks/__generated__/useMembers.generated";
import type {
  TransferOwnershipMutation,
  TransferOwnershipMutationVariables,
} from "./__generated__/useTransferOwnership.generated";

type UseTransferOwnershipProps = {
  ownerId: string;
} & TransferOwnershipMutationVariables;

export function useTransferOwnership() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const [transferOwnership] = useMutation<
    TransferOwnershipMutation,
    TransferOwnershipMutationVariables
  >(
    gql`
      mutation TransferOwnership($memberId: String!) {
        transferOwnership(memberId: $memberId) {
          ... on MutationTransferOwnershipSuccess {
            data {
              id
            }
          }
        }
      }
    `,
  );

  return (variables: UseTransferOwnershipProps) =>
    transferOwnership({
      variables,
      update(cache, { data }) {
        const transferedToUser = data?.transferOwnership;

        if (transferedToUser?.__typename !== "MutationTransferOwnershipSuccess")
          return;

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
            members: existingMembers.members.map((member) => {
              if (member.id === transferedToUser.data.id)
                return { ...member, isOwner: true };
              if (member.user.id === variables.ownerId)
                return { ...member, isOwner: false };
              return member;
            }),
          },
        });
      },
    });
}
