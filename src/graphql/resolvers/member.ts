import { builder } from "@/graphql/builder";

export const MemberObject = builder.prismaObject("Member", {
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    userId: t.exposeString("userId", { nullable: true }),
    workspace: t.relation("workspace"),
    workspaceId: t.exposeString("workspaceId", { nullable: true }),
    isOwner: t.exposeBoolean("isOwner"),
    invites: t.relation("invites"),
    comments: t.relation("comments"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});
