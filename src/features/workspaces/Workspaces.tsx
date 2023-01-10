import React from "react";

import { useCreateWorkspace, useWorkspaces } from "./hooks";

import { Form, Input } from "@/components/form";
import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Modal } from "@/components/modal";
import { Navbar } from "@/components/navbar";
import { Button } from "@/ui/button";
import { HiPlus } from "react-icons/hi2";
import { Bar } from "./components/Bar";
import { WorkspacesPreview } from "./components/WorkspacesPreview";

export const Workspaces: React.FC<{}> = () => {
  const workspaces = useWorkspaces();

  const [
    createWorkspaceForm,
    handleCreateWorkspaceSubmit,
    createWorkspaceModalRef,
    toggleCreateWorkspaceModal,
  ] = useCreateWorkspace();

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
              onClick={toggleCreateWorkspaceModal}
            >
              Workspace
            </Button>
          }
        >
          <WorkspacesPreview
            workspaces={workspaces.data?.workspaces}
            isLoading={workspaces.loading}
            createWorkspaceModalRef={createWorkspaceModalRef}
          />
          <Modal
            title="Create a workspace"
            subtitle="The beginning is always now"
            ref={createWorkspaceModalRef}
          >
            <Form
              form={createWorkspaceForm}
              onSubmit={handleCreateWorkspaceSubmit}
            >
              <Input
                label="Title"
                placeholder="Enter the new workspace title"
                {...createWorkspaceForm.register("title")}
              />
              <Button
                type="submit"
                isLoading={createWorkspaceForm.formState.isSubmitting}
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
