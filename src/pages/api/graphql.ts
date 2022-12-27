import { schema } from "@/graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getToken } from "next-auth/jwt";

import type { NextApiRequest, NextApiResponse } from "next";

type NextApiContext = {
  req: NextApiRequest;
  res: NextApiResponse;
};

const apolloServer = new ApolloServer<NextApiContext>({
  schema,
  introspection: process.env.NODE_ENV !== "production",
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => {
    const token = await getToken({ req });
    return { req, res, token };
  },
});
