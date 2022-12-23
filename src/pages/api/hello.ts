// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";

import type { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: User | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const john = await db.user.findFirst({
    where: {
      name: "John Doe",
    },
  });

  res.status(200).json({ user: john });
}
