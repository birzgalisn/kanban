import { builder } from '@/graphql/builder';

export const CommentObject = builder.prismaObject('Comment', {
  fields: (t) => ({
    id: t.exposeID('id'),
    card: t.relation('card'),
    cardId: t.exposeString('cardId', { nullable: true }),
    member: t.relation('member'),
    memberId: t.exposeString('memberId', { nullable: true }),
    comment: t.exposeString('comment'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
