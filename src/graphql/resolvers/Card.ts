import { builder } from "@/graphql/builder";
import { db } from "@/lib/db";
import { ZodError } from "zod";

import { input as cardValidateError } from "@/fixtures/card/error";

export const CardObject = builder.prismaObject("Card", {
  fields: (t) => ({
    id: t.exposeID("id"),
    list: t.relation("list"),
    listId: t.exposeString("listId"),
    title: t.exposeString("title"),
    description: t.exposeString("description", { nullable: true }),
    deadline: t.expose("deadline", { type: "DateTime", nullable: true }),
    tags: t.relation("tags"),
    todos: t.relation("todos"),
    comments: t.relation("comments"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

builder.mutationField("moveCard", (t) =>
  t.prismaField({
    type: CardObject,
    authScopes: {
      user: true,
    },
    args: {
      id: t.arg({ type: "String", required: true }),
      destination: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { id, destination }, { token }, info) => {
      return db.card.update({
        data: {
          listId: destination,
        },
        where: {
          id,
        },
      });
    },
  }),
);

const CreateCardInput = builder.inputType("CreateCardInput", {
  fields: (t) => ({
    title: t.string({
      required: true,
      validate: {
        minLength: [1, { message: cardValidateError.title.length.tooSmall }],
        maxLength: [50, { message: cardValidateError.title.length.tooBig }],
      },
    }),
  }),
});

builder.mutationField("createCard", (t) =>
  t.prismaField({
    type: CardObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      user: true,
    },
    args: {
      input: t.arg({ type: CreateCardInput, required: true }),
      listId: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { input, listId }, { token }, info) => {
      return db.card.create({
        data: {
          title: input.title,
          list: {
            connect: { id: listId },
          },
        },
      });
    },
  }),
);
