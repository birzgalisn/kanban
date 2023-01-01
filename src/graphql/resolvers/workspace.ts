import { builder } from "@/graphql/builder";
import { db } from "@/lib/db";

import type { Workspace as WorkspaceType } from "@/__generated__/types";

export const WorkspaceObject = builder.prismaObject("Workspace", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    members: t.relation("members"),
    boards: t.relation("boards"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

builder.queryField("workspaces", (t) =>
  t.prismaField({
    type: [WorkspaceObject],
    nullable: true,
    authScopes: {
      user: true,
    },
    resolve: async (query, root, args, { token }, info) => {
      const memberOf = await db.member.findMany({
        include: {
          workspace: {
            ...query,
          },
        },
        where: {
          userId: token.sub,
        },
      });
      const workspaces = memberOf.map((workspace) => workspace.workspace);
      return workspaces as Array<WorkspaceType>;
    },
  }),
);
