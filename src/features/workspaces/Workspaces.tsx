import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { z } from "zod";

import type {
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables,
  WorkspacesQuery,
} from "./__generated__/Workspaces.generated";

import { Form, Input, useZodForm } from "@/components/form";
import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Modal, ModalHandle } from "@/components/modal";
import { Navbar } from "@/components/navbar";
import { Button } from "@/ui/button";
import { HiPlus } from "react-icons/hi2";
import { Bar } from "./components/Bar";
import { WorkspacesPreview } from "./components/WorkspacesPreview";

import { input as workspaceValidateError } from "@/fixtures/workspace/error";

const WorkspaceSchema = z.object({
  title: z
    .string()
    .min(1, { message: workspaceValidateError.title.length.tooSmall })
    .max(50, { message: workspaceValidateError.title.length.tooBig }),
});

export const WORKSPACE_PREVIEW_FIELDS = gql`
  fragment WorkspacePreviewFields on Workspace {
    id
    title
    members {
      id
      user {
        image
      }
    }
  }
`;

export const Workspaces: React.FC<{}> = () => {
  const router = useRouter();
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

  const workspaceForm = useZodForm({ schema: WorkspaceSchema });
  const createWorkspaceModalRef = useRef<ModalHandle>(null);

  return (
    <LayoutWrapper>
      <Navbar />
      <Layout>
        <Bar
          title="Workspaces"
          subtitle="Your most recent workspaces"
          action={
            <Button
              icon={<HiPlus />}
              size="sm"
              wrap
              onClick={() => {
                if (createWorkspaceModalRef.current) {
                  createWorkspaceModalRef.current.toggleVisibility();
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
            createWorkspaceModalRef={createWorkspaceModalRef}
          />
          <Modal
            title="Create a workspace"
            subtitle="The beginning is always now"
            ref={createWorkspaceModalRef}
          >
            <Form
              form={workspaceForm}
              onSubmit={async (input) => {
                await createWorkspace({ variables: { input } });
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
      </Layout>
    </LayoutWrapper>
  );
};
