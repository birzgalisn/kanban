import { builder } from "@/graphql/builder";

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
