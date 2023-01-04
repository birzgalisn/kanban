import { builder } from "@/graphql/builder";
import { db } from "@/lib/db";
import { ZodError } from "zod";

import type { Board as BoardType } from "@/__generated__/types";

import { input as boardValidateError } from "@/fixtures/board/error";

export const BoardObject = builder.prismaObject("Board", {
  fields: (t) => ({
    id: t.exposeID("id"),
    workspace: t.relation("workspace"),
    workspaceId: t.exposeString("workspaceId"),
    title: t.exposeString("title"),
    lists: t.relation("lists"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

builder.queryField("board", (t) =>
  t.prismaField({
    type: BoardObject,
    authScopes: {
      user: true,
    },
    args: {
      id: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { id }, { token }, info) => {
      const board = await db.board.findFirstOrThrow({
        ...query,
        where: {
          id,
        },
      });
      return board as BoardType;
    },
  }),
);

const CreateBoardInput = builder.inputType("CreateBoardInput", {
  fields: (t) => ({
    title: t.string({
      required: true,
      validate: {
        minLength: [1, { message: boardValidateError.title.length.tooSmall }],
        maxLength: [50, { message: boardValidateError.title.length.tooBig }],
      },
    }),
  }),
});

builder.mutationField("createBoard", (t) =>
  t.prismaField({
    type: BoardObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      user: true,
    },
    args: {
      input: t.arg({ type: CreateBoardInput, required: true }),
      workspaceId: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { input, workspaceId }, { token }, info) => {
      return db.board.create({
        data: {
          title: input.title,
          workspace: {
            connect: { id: workspaceId },
          },
        },
      });
    },
  }),
);
