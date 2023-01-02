import { gql, useQuery } from "@apollo/client";
import React, { useRef } from "react";
import { z } from "zod";

import { WorkspacesQuery } from "./__generated__/Workspaces.generated";

import { Layout } from "@/components/layout";
import { Modal, ModalHandle } from "@/components/modal";
import { Button } from "@/ui/button";
import { Form, Input, useZodForm } from "@/ui/form";
import { HiOutlinePlus } from "react-icons/hi2";
import { Bar } from "./components/Bar";
import { WorkspacesPreview } from "./components/WorkspacesPreview";

import { input as workspaceValidateError } from "@/fixtures/workspace/error";

const WorkspaceSchema = z.object({
  title: z
    .string()
    .min(1, { message: workspaceValidateError.title.length.tooSmall })
    .max(50, { message: workspaceValidateError.title.length.tooBig }),
});

export const Workspaces: React.FC<{}> = () => {
  const workspacesResult = useQuery<WorkspacesQuery>(gql`
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
  `);

  const workspaceForm = useZodForm({ schema: WorkspaceSchema });
  const workspaceModalRef = useRef<ModalHandle>(null);

  return (
    <Layout>
      <Bar
        title="Workspaces"
        subtitle="Your most recent workspaces"
        action={
          <Button
            className="ml-2"
            startIcon={<HiOutlinePlus className="h-5 w-5" />}
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
          workspaces={workspacesResult?.data}
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
            onSubmit={(input) => {
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
    </Layout>
  );
};
