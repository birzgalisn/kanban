import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { z } from "zod";

import type {
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables,
  WorkspacesQuery,
} from "./__generated__/Workspaces.generated";

import { Layout } from "@/components/layout";
import { Modal, ModalHandle } from "@/components/modal";
import { Button } from "@/ui/button";
import { Form, Input, useZodForm } from "@/ui/form";
import { HiPlus } from "react-icons/hi2";
import { Bar } from "./components/Bar";
import { CreateButton } from "./components/CreateButton";
import { Scrollable } from "./components/Scrollable";
import { WorkspacesPreview } from "./components/WorkspacesPreview";

import { input as workspaceValidateError } from "@/fixtures/workspace/error";

const WorkspaceSchema = z.object({
  title: z
    .string()
    .min(1, { message: workspaceValidateError.title.length.tooSmall })
    .max(50, { message: workspaceValidateError.title.length.tooBig }),
});

export const WORKSPACE_PREVIEW_MEMBERS = gql`
  fragment WorkspacePreviewMembers on Workspace {
    members {
      id
      user {
        image
      }
    }
  }
`;

const WORKSPACE_PREVIEW_FIELDS = gql`
  fragment WorkspacePreviewFields on Workspace {
    id
    title
    ...WorkspacePreviewMembers
  }
  ${WORKSPACE_PREVIEW_MEMBERS}
`;

export const Workspaces: React.FC<{}> = () => {
  const router = useRouter();
  const workspaceForm = useZodForm({ schema: WorkspaceSchema });
  const workspaceModalRef = useRef<ModalHandle>(null);

  const workspacesResult = useQuery<WorkspacesQuery>(
    gql`
      query Workspaces {
        workspaces {
          ...WorkspacePreviewFields
        }
      }
      ${WORKSPACE_PREVIEW_FIELDS}
    `,
  );
  const [createWorkspace] = useMutation<
    CreateWorkspaceMutation,
    CreateWorkspaceMutationVariables
  >(
    gql`
      mutation CreateWorkspace($input: CreateWorkspaceInput!) {
        createWorkspace(input: $input) {
          ... on MutationCreateWorkspaceSuccess {
            data {
              ...WorkspacePreviewFields
            }
          }
        }
      }
      ${WORKSPACE_PREVIEW_FIELDS}
    `,
    {
      update(cache, { data }) {
        if (
          data?.createWorkspace.__typename !== "MutationCreateWorkspaceSuccess"
        )
          return;

        /** Merge cached `workspaces` query with `createWorkspace` mutation result */
        const newWorkspace = data.createWorkspace.data;
        cache.modify({
          fields: {
            workspaces(existingWorkspaces = []) {
              return [...existingWorkspaces, newWorkspace];
            },
          },
        });
      },
      onCompleted(data) {
        if (
          data.createWorkspace.__typename !== "MutationCreateWorkspaceSuccess"
        )
          return;

        router.push(`/workspaces/${data.createWorkspace.data.id}`);
      },
    },
  );

  return (
    <Layout className="gap-4">
      <Bar
        title="Workspaces"
        subtitle="Your most recent workspaces"
        action={
          <Button
            startIcon={<HiPlus className="h-4 w-4" />}
            size="sm"
            wrap
            onClick={() => {
              if (workspaceModalRef.current) {
                workspaceModalRef.current.toggleVisibility();
              }
            }}
          >
            Workspace
          </Button>
        }
      >
        <WorkspacesPreview
          workspaces={workspacesResult?.data?.workspaces}
          isLoading={workspacesResult.loading}
          modalRef={workspaceModalRef}
        />
        <Modal
          title="Create a workspace"
          subtitle="The beginning is always now"
          ref={workspaceModalRef}
        >
          <Form
            form={workspaceForm}
            onSubmit={async (input) => {
              await createWorkspace({ variables: { input } });
              if (workspaceModalRef.current) {
                workspaceForm.reset();
                workspaceModalRef.current.toggleVisibility();
              }
            }}
          >
            <Input
              label="Title"
              placeholder="Enter the new workspace title"
              {...workspaceForm.register("title")}
            />
            <Button
              type="submit"
              isLoading={workspaceForm.formState.isSubmitting}
            >
              Create
            </Button>
          </Form>
        </Modal>
      </Bar>
      <Bar
        title="Starred"
        subtitle="Your hand picked workspaces"
        action={
          <Button
            startIcon={<HiPlus className="h-4 w-4" />}
            size="sm"
            wrap
            disabled
          >
            Star
          </Button>
        }
      >
        <Scrollable>
          <CreateButton title="Star a workspace" disabled />
        </Scrollable>
      </Bar>
      <Bar
        title="Archived"
        subtitle="Your unused workspaces"
        action={
          <Button
            startIcon={<HiPlus className="h-4 w-4" />}
            size="sm"
            wrap
            disabled
          >
            Archive
          </Button>
        }
      >
        <Scrollable>
          <CreateButton title="Archive a workspace" disabled />
        </Scrollable>
      </Bar>
    </Layout>
  );
};
