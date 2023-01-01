import { builder } from "@/graphql/builder";

export const InviteObject = builder.prismaObject("Invite", {
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    userId: t.exposeString("userId", { nullable: true }),
    member: t.relation("member"),
    memberId: t.exposeString("memberId", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});
