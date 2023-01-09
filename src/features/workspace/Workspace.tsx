import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { z } from "zod";

import { WORKSPACE_PREVIEW_FIELDS } from "@/features/workspaces";

import type { ModalHandle } from "@/components/modal";
import type {
  CreateBoardMutation,
  CreateBoardMutationVariables,
  WorkspaceQuery,
  WorkspaceQueryVariables,
} from "./__generated__/Workspace.generated";

import { Form, Input, useZodForm } from "@/components/form";
import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Modal } from "@/components/modal";
import { Navbar } from "@/components/navbar";
import { Button } from "@/ui/button";
import {
  HiOutlineGlobeEuropeAfrica,
  HiOutlineStar,
  HiOutlineUserPlus,
  HiPlus,
} from "react-icons/hi2";
import { GreetingModal } from "./components/GreetingModal";
import { WorkspaceMenu } from "./components/WorkspaceMenu";

import { input as boardValidateError } from "@/fixtures/board/error";

const BoardSchema = z.object({
  title: z
    .string()
    .min(1, { message: boardValidateError.title.length.tooSmall })
    .max(50, { message: boardValidateError.title.length.tooBig }),
});

export const BOARD_PREVIEW_FIELDS = gql`
  fragment BoardPreviewFields on Board {
    id
    title
  }
`;

export const GET_WORKSPACE = gql`
  query Workspace($workspaceId: String!) {
    workspace(id: $workspaceId) {
      ...WorkspacePreviewFields
      boards {
        ...BoardPreviewFields
      }
    }
  }
  ${WORKSPACE_PREVIEW_FIELDS}
  ${BOARD_PREVIEW_FIELDS}
`;

export const Workspace: React.FC<{}> = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;
  const workspaceResult = useQuery<WorkspaceQuery, WorkspaceQueryVariables>(
    GET_WORKSPACE,
    {
      variables: { workspaceId },
      /**
       * IMPORTANT: Need to pause the request, before router is ready, in order,
       * to avoid making request with incorrect variables
       */
      skip: !router.isReady,
    },
  );
  const [createBoard] = useMutation<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >(
    gql`
      mutation CreateBoard($input: CreateBoardInput!, $workspaceId: String!) {
        createBoard(input: $input, workspaceId: $workspaceId) {
          ... on MutationCreateBoardSuccess {
            data {
              ...BoardPreviewFields
            }
          }
        }
      }
      ${BOARD_PREVIEW_FIELDS}
    `,
    {
      update(cache, { data }) {
        const createdBoard = data?.createBoard;

        if (createdBoard?.__typename !== "MutationCreateBoardSuccess") return;

        /** Merge cached `workspace` query field `boards` with `createBoard` mutation result */
        const existingWorkspace = cache.readQuery<
          WorkspaceQuery,
          WorkspaceQueryVariables
        >({
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
              boards: existingWorkspace.boards.concat(createdBoard.data),
            },
          },
        });
      },
    },
  );

  const workspace = workspaceResult.data?.workspace;
  const createBoardForm = useZodForm({ schema: BoardSchema });
  const createBoardModalRef = useRef<ModalHandle>(null);

  return (
    <LayoutWrapper>
      <Navbar
        isLoading={workspaceResult.loading}
        path={[{ title: workspace?.title, url: `/workspaces/${workspaceId}` }]}
      />
      <Layout noMargin>
        <WorkspaceMenu
          isLoading={workspaceResult.loading}
          boards={workspace?.boards}
          createBoardModalRef={createBoardModalRef}
        />
        <Modal
          title="Create a new board"
          subtitle="The secret to getting ahead is getting started"
          ref={createBoardModalRef}
        >
          <Form
            form={createBoardForm}
            onSubmit={async (input) => {
              await createBoard({ variables: { input, workspaceId } });
              if (createBoardModalRef.current) {
                createBoardForm.reset();
                createBoardModalRef.current.toggleVisibility();
              }
            }}
          >
            <Input
              label="Title"
              placeholder="Enter the new board title"
              {...createBoardForm.register("title")}
            />
            <Button
              type="submit"
              isLoading={createBoardForm.formState.isSubmitting}
            >
              Create
            </Button>
          </Form>
        </Modal>
        <GreetingModal
          title="Great, you have a workspace already!"
          subtitle="Let's start with basics. What would you like to do first?"
        >
          <Button
            variant="transparent"
            icon={<HiPlus />}
            left
            fluid
            onClick={() => {
              if (createBoardModalRef && createBoardModalRef.current) {
                createBoardModalRef.current.toggleVisibility();
              }
            }}
          >
            Create a new board
          </Button>
          <Button
            variant="transparent"
            icon={<HiOutlineUserPlus />}
            left
            fluid
            disabled
          >
            Invite people to the workspace
          </Button>
          <Button
            variant="transparent"
            icon={<HiOutlineStar />}
            left
            fluid
            disabled
          >
            Star the workspace
          </Button>
          <Button
            variant="transparent"
            icon={<HiOutlineGlobeEuropeAfrica />}
            left
            fluid
            disabled
          >
            Make the workspace public
          </Button>
        </GreetingModal>
      </Layout>
    </LayoutWrapper>
  );
};
