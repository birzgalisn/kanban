import { WorkspacesQuery } from "../__generated__/Workspaces.generated";

import type { ModalHandle } from "@/components/modal";

import { Avatar } from "@/ui/avatar";
import { PreviewCard } from "./PreviewCard";
import { PreviewCardSekeleton } from "./PreviewCardSkeleton";
import { Scrollable } from "./Scrollable";

export const WorkspacesPreview: React.FC<{
  workspaces: WorkspacesQuery | undefined;
  isLoading: boolean;
  modalRef: React.RefObject<ModalHandle>;
}> = ({ workspaces, isLoading, modalRef }) => {
  return (
    <Scrollable>
      {isLoading &&
        Array(2)
          .fill(0)
          .map((item, idx) => <PreviewCardSekeleton key={idx} />)}
      {!isLoading &&
        workspaces &&
        workspaces.workspaces?.map((workspace) => (
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
      <button
        className="flex h-24 w-80 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-transparent text-lg font-semibold duration-300 ease-in-out hover:border-solid hover:bg-gray-50 hover:opacity-80"
        onClick={() => {
          if (modalRef.current) {
            modalRef.current.toggleVisibility();
          }
        }}
      >
        Create a workspace
      </button>
    </Scrollable>
  );
};
