import { WorkspacesQuery } from '../hooks/__generated__/useWorkspaces.generated';

import type { ModalHandle } from '@/components/modal';

import { Avatar } from '@/ui/avatar';
import { BoardButton } from '@/ui/boardButton';
import { PreviewCard } from './PreviewCard';
import { PreviewCardSekeleton } from './PreviewCardSkeleton';

export const WorkspacesPreview: React.FC<{
  workspaces?: WorkspacesQuery['workspaces'];
  isLoading: boolean;
  createWorkspaceModalRef: React.RefObject<ModalHandle>;
}> = ({ workspaces, isLoading, createWorkspaceModalRef }) => {
  return (
    <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading
        ? Array(4)
            .fill(0)
            .map((_, idx) => <PreviewCardSekeleton key={idx} />)
        : workspaces &&
          workspaces.map((workspace) => (
            <PreviewCard
              key={workspace.id}
              title={workspace.title}
              href={`/workspaces/${workspace.id}`}
            >
              {workspace.members.map((member) => (
                <Avatar className="-ml-2" key={member.id} src={member.user.image} size="w-6 h-6" />
              ))}
            </PreviewCard>
          ))}
      <BoardButton
        title="Create a workspace"
        createModalRef={createWorkspaceModalRef}
        sizes="h-24 w-full"
      />
    </div>
  );
};
