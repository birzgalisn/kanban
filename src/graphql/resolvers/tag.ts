import { builder } from "@/graphql/builder";

export const TagObject = builder.prismaObject("Tag", {
  fields: (t) => ({
    id: t.exposeID("id"),
    card: t.relation("card"),
    cardId: t.exposeString("cardId"),
    title: t.exposeString("title"),
    colorHex: t.exposeString("colorHex", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});
