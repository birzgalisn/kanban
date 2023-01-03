import { WorkspacesQuery } from "../__generated__/Workspaces.generated";

import type { ModalHandle } from "@/components/modal";

import { Avatar } from "@/ui/avatar";
import { CreateButton } from "./CreateButton";
import { PreviewCard } from "./PreviewCard";
import { PreviewCardSekeleton } from "./PreviewCardSkeleton";
import { Scrollable } from "./Scrollable";

export const WorkspacesPreview: React.FC<{
  workspaces?: WorkspacesQuery["workspaces"];
  isLoading: boolean;
  modalRef: React.RefObject<ModalHandle>;
}> = ({ workspaces, isLoading, modalRef }) => {
  return (
    <Scrollable>
      {isLoading
        ? Array(2)
            .fill(0)
            .map((_, idx) => <PreviewCardSekeleton key={idx} />)
        : workspaces &&
          workspaces?.map((workspace) => (
            <PreviewCard
              key={workspace.id}
              title={workspace.title}
              href={`/workspaces/${workspace.id}`}
            >
              {workspace.members.map((member) => (
                <Avatar
                  className="-ml-2"
                  key={member.id}
                  src={member.user.image}
                  sizes="w-6 h-6"
                />
              ))}
            </PreviewCard>
          ))}
      <CreateButton title="Create a workspace" {...{ modalRef }} />
    </Scrollable>
  );
};
