import { builder } from "@/graphql/builder";

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
