import { db } from '@/lib/db';
import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import ValidationPlugin from '@pothos/plugin-validation';
import { GraphQLError } from 'graphql';

import type PrismaTypes from '@pothos/plugin-prisma/generated';
import type { JWT } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next/types';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: { Input: string; Output: Date };
    DateTime: { Input: string; Output: Date };
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
  scopeAuthOptions: {
    treatErrorsAsUnauthorized: true,
    unauthorizedError: (parent, context, info, result) => {
      throw new GraphQLError('You are not authorized to perform this action', {
        extensions: { code: 'FORBIDDEN' },
      });
    },
  },
  authScopes: async ({ req, token }) => {
    const workspaceId = req.headers.referer?.split('/').splice(4, 1).pop();
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
