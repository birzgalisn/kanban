import { builder } from "@/graphql/builder";
import { db } from "@/lib/db";
import { ZodError } from "zod";

import type { Workspace as WorkspaceType } from "@/__generated__/types";

import { input as createWorkspaceValidateError } from "@/fixtures/workspace/error";

export const WorkspaceObject = builder.prismaObject("Workspace", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    members: t.relation("members"),
    boards: t.relation("boards"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

builder.queryField("workspace", (t) =>
  t.prismaField({
    type: WorkspaceObject,
    authScopes: {
      member: true,
    },
    args: {
      id: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { id }, { token }, info) => {
      const memberOf = await db.member.findFirstOrThrow({
        include: {
          workspace: {
            ...query,
          },
        },
        where: {
          workspaceId: id,
          userId: token.sub,
        },
      });
      return memberOf?.workspace as WorkspaceType;
    },
  }),
);

builder.queryField("workspaces", (t) =>
  t.prismaField({
    type: [WorkspaceObject],
    nullable: true,
    authScopes: {
      user: true,
    },
    resolve: async (query, root, args, { token }, info) => {
      const memberOf = await db.member.findMany({
        include: {
          workspace: {
            ...query,
          },
        },
        where: {
          userId: token.sub,
        },
      });
      const workspaces = memberOf.map((workspace) => workspace.workspace);
      return workspaces as Array<WorkspaceType>;
    },
  }),
);

const CreateWorkspaceInput = builder.inputType("CreateWorkspaceInput", {
  fields: (t) => ({
    title: t.string({
      required: true,
      validate: {
        minLength: [
          1,
          { message: createWorkspaceValidateError.title.length.tooSmall },
        ],
        maxLength: [
          50,
          { message: createWorkspaceValidateError.title.length.tooBig },
        ],
      },
    }),
  }),
});

builder.mutationField("createWorkspace", (t) =>
  t.prismaField({
    type: WorkspaceObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      user: true,
    },
    args: {
      input: t.arg({ type: CreateWorkspaceInput, required: true }),
    },
    resolve: async (query, root, { input }, { token }, info) => {
      const memberOf = await db.member.create({
        data: {
          workspace: {
            create: {
              title: input.title,
            },
          },
          user: {
            connect: { id: token.sub },
          },
          isOwner: true,
        },
        include: {
          workspace: {
            ...query,
          },
        },
      });
      return memberOf.workspace;
    },
  }),
);
