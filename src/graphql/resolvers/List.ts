import { builder } from "@/graphql/builder";

export const ListObject = builder.prismaObject("List", {
  fields: (t) => ({
    id: t.exposeID("id"),
    board: t.relation("board"),
    boardId: t.exposeString("boardId"),
    title: t.exposeString("title"),
    cards: t.relation("cards"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});
