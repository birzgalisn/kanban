import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { z } from 'zod';

import { WORKSPACE_PREVIEW_FIELDS } from './useWorkspaces';

import type { ModalHandle } from '@/components/modal';
import type {
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables,
} from './__generated__/useCreateWorkspace.generated';

import { useZodForm } from '@/components/form';

import { input as workspaceValidateError } from '@/fixtures/workspace/error';

const WorkspaceSchema = z.object({
  title: z
    .string()
    .min(1, { message: workspaceValidateError.title.length.tooSmall })
    .max(50, { message: workspaceValidateError.title.length.tooBig }),
});

type UseCreateWorkspaceProps = CreateWorkspaceMutationVariables;

export function useCreateWorkspace() {
  const router = useRouter();

  const [createWorkspace] = useMutation<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(
    gql`
      mutation CreateWorkspace($input: CreateWorkspaceInput!) {
        createWorkspace(input: $input) {
          ... on MutationCreateWorkspaceSuccess {
            data {
              ...WorkspacePreviewFields
            }
          }
        }
      }
      ${WORKSPACE_PREVIEW_FIELDS}
    `,
    {
      update(cache, { data }) {
        if (data?.createWorkspace.__typename !== 'MutationCreateWorkspaceSuccess') return;

        /** Merge cached `workspaces` query with `createWorkspace` mutation result */
        const newWorkspace = data.createWorkspace.data;
        cache.modify({
          fields: {
            workspaces(existingWorkspaces = []) {
              return [...existingWorkspaces, newWorkspace];
            },
          },
        });
      },
      onCompleted({ createWorkspace }) {
        if (createWorkspace.__typename !== 'MutationCreateWorkspaceSuccess') return;

        router.push(`/workspaces/${createWorkspace.data.id}`);
      },
    },
  );

  const modalRef = useRef<ModalHandle>(null);
  const toggleModal = () => {
    if (modalRef.current) {
      modalRef.current.toggleVisibility();
    }
  };

  const form = useZodForm({ schema: WorkspaceSchema });
  const handleSubmit = async (input: UseCreateWorkspaceProps['input']) => {
    await createWorkspace({ variables: { input } });
  };

  return [form, handleSubmit, modalRef, toggleModal] as const;
}
