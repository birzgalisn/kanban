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
    totalLists: t.field({
      type: "Int",
      resolve: async (parent) => {
        const lists = await db.list.aggregate({
          _count: { id: true },
          where: { boardId: parent.id },
        });
        return lists._count.id;
      },
    }),
    totalCards: t.field({
      type: "Int",
      resolve: async (parent) => {
        const lists = await db.list.findMany({
          select: { id: true },
          where: { boardId: parent.id },
        });
        const cards = await db.card.aggregate({
          _count: { id: true },
          where: { listId: { in: lists.map((list) => list.id) } },
        });
        return cards._count.id;
      },
    }),
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
        ...query,
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

const EditBoardTitleInput = builder.inputType("EditBoardTitleInput", {
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

builder.mutationField("editBoardTitle", (t) =>
  t.prismaField({
    type: BoardObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      user: true,
    },
    args: {
      input: t.arg({ type: EditBoardTitleInput, required: true }),
      boardId: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { input, boardId }, { token }, info) => {
      return db.board.update({
        ...query,
        data: {
          title: input.title,
        },
        where: {
          id: boardId,
        },
      });
    },
  }),
);

builder.mutationField("deleteBoard", (t) =>
  t.prismaField({
    type: BoardObject,
    authScopes: {
      user: true,
    },
    args: {
      boardId: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { boardId }, { token }, info) => {
      return db.board.delete({
        where: {
          id: boardId,
        },
      });
    },
  }),
);
