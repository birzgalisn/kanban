import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type WorkspaceSettingsQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['String'];
}>;

export type WorkspaceSettingsQuery = {
  __typename?: 'Query';
  workspace: { __typename?: 'Workspace'; id: string; title: string };
};

export type EditWorkspaceTitleMutationVariables = Types.Exact<{
  input: Types.EditWorkspaceTitleInput;
  workspaceId: Types.Scalars['String'];
}>;

export type EditWorkspaceTitleMutation = {
  __typename?: 'Mutation';
  editWorkspaceTitle:
    | {
        __typename?: 'MutationEditWorkspaceTitleSuccess';
        data: { __typename?: 'Workspace'; id: string; title: string };
      }
    | { __typename?: 'ZodError' };
};

export const WorkspaceSettingsDocument = gql`
  query WorkspaceSettings($workspaceId: String!) {
    workspace(id: $workspaceId) {
      id
      title
    }
  }
`;
export type WorkspaceSettingsQueryResult = Apollo.QueryResult<
  WorkspaceSettingsQuery,
  WorkspaceSettingsQueryVariables
>;
export const EditWorkspaceTitleDocument = gql`
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
`;
export type EditWorkspaceTitleMutationFn = Apollo.MutationFunction<
  EditWorkspaceTitleMutation,
  EditWorkspaceTitleMutationVariables
>;
export type EditWorkspaceTitleMutationResult = Apollo.MutationResult<EditWorkspaceTitleMutation>;
export type EditWorkspaceTitleMutationOptions = Apollo.BaseMutationOptions<
  EditWorkspaceTitleMutation,
  EditWorkspaceTitleMutationVariables
>;
