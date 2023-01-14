import { useRouter } from "next/router";
import { useEffect } from "react";

import { useEditSettings } from "./hooks";
import { useDeleteWorkspace } from "./hooks/useDeleteWorkspace";

import { Form, Input } from "@/components/form";
import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Navbar } from "@/components/navbar";
import { Section, SectionWrapper } from "@/components/section";
import { SectionHeading } from "@/components/section/SectionHeading";
import { ButtonSkeleton, TextSkeleton } from "@/components/skeleton";
import { Button } from "@/ui/button";
import { DangerZone } from "./components/DangerZone";
import { Zone } from "./components/Zone";

export const WorkspaceSettings: React.FC<{}> = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const [workspaceQuery, editWorkspaceForm, handleEditWorkspaecSubmit] =
    useEditSettings();
  const workspace = workspaceQuery.data?.workspace;

  const deleteWorkspace = useDeleteWorkspace();

  useEffect(() => {
    if (!workspace) return;
    editWorkspaceForm.reset({ title: workspace.title });
  }, [workspace, editWorkspaceForm]);

  return (
    <LayoutWrapper>
      <Navbar
        isLoading={workspaceQuery.loading}
        path={[
          {
            title: workspace?.title,
            url: `/workspaces/${workspace?.id}`,
          },
          {
            title: "Members",
            url: `/workspaces/${workspace?.id}/settings`,
          },
        ]}
      />
      <Layout noMargin>
        <SectionWrapper>
          <SectionHeading
            title="Settings"
            subtitle="Control all related information about the project"
          />
          <Section>
            <Form
              className="mb-6 flex gap-4"
              form={editWorkspaceForm}
              onSubmit={handleEditWorkspaecSubmit}
            >
              {workspaceQuery.loading ? (
                <>
                  <div className="flex w-full flex-col gap-1">
                    <TextSkeleton className="h-4 w-20" />
                    <TextSkeleton className="h-10" fluid />
                  </div>
                  <ButtonSkeleton size="xs" className="mt-5 w-14" />
                </>
              ) : (
                <>
                  <Input
                    className="h-10"
                    label="Project name"
                    placeholder="Enter the new workspace title"
                    {...editWorkspaceForm.register("title")}
                  />
                  <Button className="mt-5" type="submit" size="sm">
                    Save
                  </Button>
                </>
              )}
            </Form>
            <DangerZone>
              <Zone
                title="Delete project"
                subtitle="Once you delete a project, there is no going back. Please be certain"
                action={
                  <Button
                    variant="danger"
                    onClick={() => deleteWorkspace({ workspaceId })}
                  >
                    Delete
                  </Button>
                }
              />
            </DangerZone>
          </Section>
        </SectionWrapper>
      </Layout>
    </LayoutWrapper>
  );
};
