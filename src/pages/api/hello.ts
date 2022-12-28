// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const john = await db.user.findFirst({
    select: {
      email: true,
      name: true,
    },
    where: {
      name: "John Doe",
    },
  });

  res.status(200).json({ user: john });
}
