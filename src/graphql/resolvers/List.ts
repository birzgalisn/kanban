import { builder } from '@/graphql/builder';
import { db } from '@/lib/db';
import { ZodError } from 'zod';

import type { List as ListType } from '@/__generated__/types';

import { input as listValidateError } from '@/fixtures/list/error';

export const ListObject = builder.prismaObject('List', {
  fields: (t) => ({
    id: t.exposeID('id'),
    board: t.relation('board'),
    boardId: t.exposeString('boardId'),
    title: t.exposeString('title'),
    cards: t.relation('cards'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

builder.queryField('list', (t) =>
  t.prismaField({
    type: ListObject,
    authScopes: {
      member: true,
    },
    args: {
      id: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { id }, { token }, info) => {
      const list = await db.list.findFirst({
        ...query,
        where: {
          id,
        },
      });
      return list as ListType;
    },
  }),
);

const CreateListInput = builder.inputType('CreateListInput', {
  fields: (t) => ({
    title: t.string({
      required: true,
      validate: {
        minLength: [1, { message: listValidateError.title.length.tooSmall }],
        maxLength: [50, { message: listValidateError.title.length.tooBig }],
      },
    }),
  }),
});

builder.mutationField('createList', (t) =>
  t.prismaField({
    type: ListObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      member: true,
    },
    args: {
      input: t.arg({ type: CreateListInput, required: true }),
      boardId: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { input, boardId }, { token }, info) => {
      return db.list.create({
        ...query,
        data: {
          title: input.title,
          board: {
            connect: { id: boardId },
          },
        },
      });
    },
  }),
);

const RenameListInput = builder.inputType('RenameListInput', {
  fields: (t) => ({
    title: t.string({
      required: true,
      validate: {
        minLength: [1, { message: listValidateError.title.length.tooSmall }],
        maxLength: [50, { message: listValidateError.title.length.tooBig }],
      },
    }),
  }),
});

builder.mutationField('renameList', (t) =>
  t.prismaField({
    type: ListObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      member: true,
    },
    args: {
      input: t.arg({ type: RenameListInput, required: true }),
      id: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { input, id }, { token }, info) => {
      return db.list.update({
        ...query,
        data: {
          title: input.title,
        },
        where: {
          id,
        },
      });
    },
  }),
);

builder.mutationField('deleteList', (t) =>
  t.prismaField({
    type: ListObject,
    authScopes: {
      member: true,
    },
    args: {
      id: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { id }, { token }, info) => {
      return db.list.delete({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
);
