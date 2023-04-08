import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import type { MembersQuery, MembersQueryVariables } from './__generated__/useMembers.generated';

export const MEMBER_PREVIEW_FIELDS = gql`
  fragment MemberPreviewFields on Member {
    id
    user {
      id
      email
      name
      image
    }
    isOwner
    createdAt
  }
`;

export const GET_MEMBERS = gql`
  query Members($workspaceId: String!) {
    members(workspaceId: $workspaceId) {
      ...MemberPreviewFields
    }
    workspace(id: $workspaceId) {
      id
      title
    }
  }
  ${MEMBER_PREVIEW_FIELDS}
`;

export function useMembers() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const members = useQuery<MembersQuery, MembersQueryVariables>(GET_MEMBERS, {
    variables: { workspaceId },
    skip: !router.isReady,
  });

  return members;
}
