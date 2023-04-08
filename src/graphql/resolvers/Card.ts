import { builder } from '@/graphql/builder';
import { db } from '@/lib/db';
import { ZodError } from 'zod';

import { input as cardValidateError } from '@/fixtures/card/error';

export const CardObject = builder.prismaObject('Card', {
  fields: (t) => ({
    id: t.exposeID('id'),
    list: t.relation('list'),
    listId: t.exposeString('listId'),
    title: t.exposeString('title'),
    description: t.exposeString('description', { nullable: true }),
    deadline: t.expose('deadline', { type: 'DateTime', nullable: true }),
    tags: t.relation('tags'),
    todos: t.relation('todos'),
    comments: t.relation('comments'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

builder.queryField('card', (t) =>
  t.prismaField({
    type: CardObject,
    authScopes: {
      member: true,
    },
    args: {
      id: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { id }, { token }, info) => {
      const card = await db.card.findFirstOrThrow({
        ...query,
        where: {
          id,
        },
      });
      return card;
    },
  }),
);

builder.mutationField('moveCard', (t) =>
  t.prismaField({
    type: CardObject,
    authScopes: {
      member: true,
    },
    args: {
      id: t.arg({ type: 'String', required: true }),
      destination: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { id, destination }, { token }, info) => {
      return db.card.update({
        ...query,
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

const CreateCardInput = builder.inputType('CreateCardInput', {
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

builder.mutationField('createCard', (t) =>
  t.prismaField({
    type: CardObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      member: true,
    },
    args: {
      input: t.arg({ type: CreateCardInput, required: true }),
      listId: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { input, listId }, { token }, info) => {
      return db.card.create({
        ...query,
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

const EditCardTitleInput = builder.inputType('EditCardTitleInput', {
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

builder.mutationField('editCardTitle', (t) =>
  t.prismaField({
    type: CardObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      member: true,
    },
    args: {
      input: t.arg({ type: EditCardTitleInput, required: true }),
      cardId: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { input, cardId }, { token }, info) => {
      return db.card.update({
        ...query,
        data: {
          title: input.title,
        },
        where: {
          id: cardId,
        },
      });
    },
  }),
);

const EditCardDescriptionInput = builder.inputType('EditCardDescriptionInput', {
  fields: (t) => ({
    description: t.string({
      required: true,
      validate: {
        minLength: [1, { message: cardValidateError.description.length.tooSmall }],
        maxLength: [255, { message: cardValidateError.description.length.tooBig }],
      },
    }),
  }),
});

builder.mutationField('editCardDescription', (t) =>
  t.prismaField({
    type: CardObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      member: true,
    },
    args: {
      input: t.arg({ type: EditCardDescriptionInput, required: true }),
      cardId: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { input, cardId }, { token }, info) => {
      return db.card.update({
        ...query,
        data: {
          description: input.description,
        },
        where: {
          id: cardId,
        },
      });
    },
  }),
);

builder.mutationField('deleteCard', (t) =>
  t.prismaField({
    type: CardObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      member: true,
    },
    args: {
      id: t.arg({ type: 'String', required: true }),
    },
    resolve: async (query, root, { id }, { token }, info) => {
      return db.card.delete({ ...query, where: { id } });
    },
  }),
);
