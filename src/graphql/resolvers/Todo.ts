import { builder } from '@/graphql/builder';

export const TodoObject = builder.prismaObject('Todo', {
  fields: (t) => ({
    id: t.exposeID('id'),
    card: t.relation('card'),
    cardId: t.exposeString('cardId'),
    done: t.exposeBoolean('done'),
    description: t.exposeString('description'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
