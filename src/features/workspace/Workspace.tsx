import React from "react";

import { useCreateBoard, useWorkspace } from "./hooks";

import { Form, Input } from "@/components/form";
import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Modal } from "@/components/modal";
import { Navbar } from "@/components/navbar";
import { SectionWrapper } from "@/components/section";
import { SectionHeading } from "@/components/section/SectionHeading";
import { Button } from "@/ui/button";
import { HiPlus } from "react-icons/hi2";
import { Boards } from "./components/Boards";

export const Workspace: React.FC<{}> = () => {
  const workspaceQuery = useWorkspace();
  const workspace = workspaceQuery.data?.workspace;

  const [
    createBoardForm,
    handleCreateBoardSubmit,
    createBoardModalRef,
    toggleCreateBoardModal,
  ] = useCreateBoard();

  return (
    <LayoutWrapper>
      <Navbar
        isLoading={workspaceQuery.loading}
        path={[
          {
            title: workspace?.title,
            url: `/workspaces/${workspace?.id}`,
          },
        ]}
      />
      <Layout noMargin>
        <SectionWrapper>
          <SectionHeading
            title="All boards"
            subtitle="Personalize your workspace boards"
            action={
              <Button
                icon={<HiPlus />}
                size="sm"
                wrap
                onClick={toggleCreateBoardModal}
              >
                Board
              </Button>
            }
          />
          <Boards
            isLoading={workspaceQuery.loading}
            boards={workspace?.boards}
            openCreateBoard={toggleCreateBoardModal}
          />
        </SectionWrapper>
        <Modal
          title="Create a new board"
          subtitle="The secret to getting ahead is getting started"
          ref={createBoardModalRef}
        >
          <Form form={createBoardForm} onSubmit={handleCreateBoardSubmit}>
            <Input
              label="Title"
              placeholder="Enter the new board title"
              {...createBoardForm.register("title")}
              autoFocus
            />
            <Button
              type="submit"
              isLoading={createBoardForm.formState.isSubmitting}
            >
              Create
            </Button>
          </Form>
        </Modal>
      </Layout>
    </LayoutWrapper>
  );
};
