import React, { useEffect } from "react";

import { useDeleteMe, useMe } from "./hooks";

import { DangerZone, Zone } from "@/components/dangerZone";
import { Form, Input } from "@/components/form";
import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Navbar } from "@/components/navbar";
import { Section, SectionWrapper } from "@/components/section";
import { SectionHeading } from "@/components/section/SectionHeading";
import { InputSkeleton } from "@/components/skeleton";
import { Button } from "@/ui/button";

export const Settings: React.FC<{}> = () => {
  const [meQuery, editMeForm, handleEditMeSubmit] = useMe();
  const me = meQuery.data?.me;

  const deleteMe = useDeleteMe();

  useEffect(() => {
    if (!me) return;
    editMeForm.reset({ name: me.name ?? "" });
  }, [me, editMeForm]);

  return (
    <LayoutWrapper>
      <Navbar />
      <Layout noMargin>
        <SectionWrapper>
          <SectionHeading
            title="Account"
            subtitle="Edit information related to your account"
          />
          <Section>
            <Form
              className="mb-6 flex gap-4"
              form={editMeForm}
              onSubmit={(input) => handleEditMeSubmit({ input, me: me!.id })}
            >
              {meQuery.loading ? (
                <div className="flex w-full flex-col">
                  <span className="pl-[0.1rem] text-sm font-normal">Name</span>
                  <InputSkeleton className="h-10" fluid />
                </div>
              ) : (
                <Input
                  className="h-10"
                  label="Name"
                  placeholder="Enter yout new name"
                  {...editMeForm.register("name")}
                />
              )}
              <Button
                className="mt-5"
                size="sm"
                type="submit"
                disabled={meQuery.loading}
                isLoading={editMeForm.formState.isSubmitting}
              >
                Save
              </Button>
            </Form>
            <DangerZone>
              <Zone
                title="Delete account"
                subtitle="Note that deleting your account will also delete any workspaces in which you are the only member"
                action={
                  <Button
                    variant="danger"
                    disabled={meQuery.loading}
                    onClick={() => deleteMe()}
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
