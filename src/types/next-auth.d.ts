import "next-auth";
import "next-auth/jwt";

import type { User as PrismaUser } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends PrismaUser {}

  interface Session extends PrismaUser {
    user: {
      id: JWT["sub"];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {}
}
