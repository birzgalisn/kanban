import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useEditSettings } from './hooks';
import { useDeleteWorkspace } from './hooks/useDeleteWorkspace';

import { Form, Input } from '@/components/form';
import { Layout } from '@/components/layout';
import { LayoutWrapper } from '@/components/layoutWrapper';
import { Navbar } from '@/components/navbar';
import { Section, SectionWrapper } from '@/components/section';
import { SectionHeading } from '@/components/section/SectionHeading';
import { InputSkeleton } from '@/components/skeleton';
import { Button } from '@/ui/button';
import { DangerZone } from '../../components/dangerZone/DangerZone';
import { Zone } from '../../components/dangerZone/Zone';

export const WorkspaceSettings: React.FC = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const [workspaceQuery, editWorkspaceForm, handleEditWorkspaecSubmit] = useEditSettings();
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
            title: 'Settings',
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
                <div className="flex w-full flex-col">
                  <span className="pl-[0.1rem] text-sm font-normal">Project name</span>
                  <InputSkeleton className="h-10" fluid />
                </div>
              ) : (
                <Input
                  className="h-10"
                  label="Project name"
                  placeholder="Enter the new workspace title"
                  {...editWorkspaceForm.register('title')}
                />
              )}
              <Button
                className="mt-5"
                type="submit"
                size="sm"
                disabled={workspaceQuery.loading}
                isLoading={editWorkspaceForm.formState.isSubmitting}
              >
                Save
              </Button>
            </Form>
            <DangerZone>
              <Zone
                title="Delete project"
                subtitle="Once you delete a project, there is no going back. Please be certain"
                action={
                  <Button
                    variant="danger"
                    disabled={workspaceQuery.loading}
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
