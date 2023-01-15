import { gql, useMutation } from "@apollo/client";
import { signOut } from "next-auth/react";

import type {
  DeleteMeMutation,
  DeleteMeMutationVariables,
} from "./__generated__/useDeleteMe.generated";

export function useDeleteMe() {
  const [deleteMe] = useMutation<DeleteMeMutation, DeleteMeMutationVariables>(
    gql`
      mutation DeleteMe {
        deleteMe {
          id
        }
      }
    `,
    {
      onCompleted() {
        signOut({ callbackUrl: "/" });
      },
    },
  );

  return deleteMe;
}
