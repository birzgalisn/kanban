import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type MemberPreviewFieldsFragment = {
  __typename?: "Member";
  id: string;
  isOwner: boolean;
  createdAt: any;
  user: {
    __typename?: "User";
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
};

export type MembersQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars["String"];
}>;

export type MembersQuery = {
  __typename?: "Query";
  members: Array<{
    __typename?: "Member";
    id: string;
    isOwner: boolean;
    createdAt: any;
    user: {
      __typename?: "User";
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }>;
  workspace: { __typename?: "Workspace"; id: string; title: string };
};

export const MemberPreviewFieldsFragmentDoc = gql`
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
export const MembersDocument = gql`
  query Members($workspaceId: String!) {
    members(workspaceId: $workspaceId) {
      ...MemberPreviewFields
    }
    workspace(id: $workspaceId) {
      id
      title
    }
  }
  ${MemberPreviewFieldsFragmentDoc}
`;
export type MembersQueryResult = Apollo.QueryResult<
  MembersQuery,
  MembersQueryVariables
>;
