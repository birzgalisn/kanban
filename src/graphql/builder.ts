import { db } from "@/lib/db";
import SchemaBuilder from "@pothos/core";
import ErrorsPlugin from "@pothos/plugin-errors";
import PrismaPlugin from "@pothos/plugin-prisma";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ValidationPlugin from "@pothos/plugin-validation";

import type PrismaTypes from "@pothos/plugin-prisma/generated";
import type { JWT } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next/types";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: { Input: String; Output: Date };
    DateTime: { Input: String; Output: Date };
  };
  Context: {
    req: NextApiRequest;
    res: NextApiResponse;
    token: JWT;
  };
  AuthScopes: {
    user: boolean;
    member: boolean;
  };
  AuthContexts: {
    token: JWT;
  };
}>({
  prisma: {
    client: db,
    filterConnectionTotalCount: true,
  },
  plugins: [ErrorsPlugin, ValidationPlugin, ScopeAuthPlugin, PrismaPlugin],
  authScopes: async ({ req, token }) => {
    const workspaceId = req.headers.referer?.split("/").splice(4, 1).pop();
    const member = await db.member.findFirst({
      select: { id: true },
      where: { userId: token.sub, workspaceId },
    });

    return {
      user: !!token,
      member: !!member,
    };
  },
});
