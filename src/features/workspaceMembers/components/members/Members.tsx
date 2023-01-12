import React, { useMemo } from "react";

import { useAddMember } from "./hooks";

import type { MembersQuery } from "../../hooks/__generated__/useMembers.generated";

import { Form, Input } from "@/components/form";
import { Section } from "@/components/section";
import { Button } from "@/ui/button";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { Member } from "./components/Member";
import { MemberPreview } from "./components/MemberPreview";

type Members = MembersQuery["members"];

type MembersProps = {
  isLoading: boolean;
  members?: Members;
};

export const Members: React.FC<MembersProps> = ({ isLoading, members }) => {
  const [addMemberForm, handleAddMemberSubmit] = useAddMember();
  const workspaceOwner = useMemo(
    () => members?.find((m) => m.isOwner),
    [members],
  );

  return (
    <Section>
      <Form
        className="mb-6 flex flex-col gap-4"
        form={addMemberForm}
        onSubmit={handleAddMemberSubmit}
      >
        <h2 className="text-xl font-semibold">Add users to the workspace</h2>
        <div className="flex gap-4">
          <Input
            className="h-10"
            placeholder="Add by email address"
            {...addMemberForm.register("email")}
          />
          <Button
            icon={<HiOutlineUserPlus />}
            type="submit"
            variant="primary"
            size="sm"
          >
            Add
          </Button>
        </div>
      </Form>
      <h2 className="mb-4 text-xl font-semibold">Manage access</h2>
      <div className="flex w-full flex-col rounded-lg border">
        {!isLoading
          ? members &&
            members.map((member) => (
              <Member
                key={member.id}
                workspaceOwner={workspaceOwner}
                member={member}
              />
            ))
          : Array(4)
              .fill(0)
              .map((_, idx) => <MemberPreview key={idx} />)}
      </div>
    </Section>
  );
};
