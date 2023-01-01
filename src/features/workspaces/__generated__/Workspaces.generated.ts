import * as Types from "../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type WorkspacesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type WorkspacesQuery = {
  __typename?: "Query";
  workspaces?: Array<{
    __typename?: "Workspace";
    id: string;
    title: string;
    members: Array<{
      __typename?: "Member";
      id: string;
      user: { __typename?: "User"; image?: string | null };
    }>;
  }> | null;
};

export const WorkspacesDocument = gql`
  query Workspaces {
    workspaces {
      id
      title
      members {
        id
        user {
          image
        }
      }
    }
  }
`;
export type WorkspacesQueryResult = Apollo.QueryResult<
  WorkspacesQuery,
  WorkspacesQueryVariables
>;
