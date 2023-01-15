import { gql, useMutation, useQuery } from "@apollo/client";
import { z } from "zod";

import type {
  EditMeMutation,
  EditMeMutationVariables,
  MeQuery,
} from "./__generated__/useMe.generated";

import { useZodForm } from "@/components/form";

import { input as meValidateError } from "@/fixtures/user/error";

const MeSchema = z.object({
  name: z
    .string()
    .min(1, { message: meValidateError.name.length.tooSmall })
    .max(30, { message: meValidateError.name.length.tooBig }),
});

type UseMeProps = { me: string } & EditMeMutationVariables;

export function useMe() {
  const meQuery = useQuery<MeQuery>(
    gql`
      query Me {
        me {
          id
          name
          email
        }
      }
    `,
  );

  const [editMe] = useMutation<EditMeMutation, EditMeMutationVariables>(gql`
    mutation EditMe($input: EditMeNameInput!) {
      editMeName(input: $input) {
        ... on MutationEditMeNameSuccess {
          data {
            id
            name
          }
        }
      }
    }
  `);

  const form = useZodForm({ schema: MeSchema });
  const handleSubmit = async ({ me, input }: UseMeProps) => {
    await editMe({
      variables: { input },
      optimisticResponse: {
        editMeName: { data: { id: me, name: input.name } },
      },
    });
    await fetch("/api/auth/session?update");
    document.dispatchEvent(new Event("visibilitychange"));
  };

  return [meQuery, form, handleSubmit] as const;
}
