import React from "react";

import { useCreateBoard, useWorkspace } from "./hooks";

import { Form, Input } from "@/components/form";
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
        <WorkspaceMenu
          isLoading={workspaceQuery.loading}
          boards={workspace?.boards}
          createBoardModalRef={createBoardModalRef}
        />
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
            onClick={toggleCreateBoardModal}
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
