import "next-auth";
import "next-auth/jwt";

import type { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User extends PrismaUser {}

  interface Session {}
}

declare module "next-auth/jwt" {
  interface JWT {
    role: PrismaUser["role"];
  }
}
