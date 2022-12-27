import { builder } from "@/graphql/builder";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";

import { input as createUserValidateError } from "@/fixtures/auth/error";

const UserObjectRole = builder.enumType("Roles", {
  description: "User roles",
  values: ["USER", "ADMIN"] as const,
});

const UserObject = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    role: t.expose("role", { type: UserObjectRole }),
    email: t.exposeString("email", { nullable: true }),
    name: t.exposeString("name", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

builder.queryField("me", (t) =>
  t.prismaField({
    type: UserObject,
    authScopes: {
      user: true,
    },
    resolve: async (query, root, args, { token }, info) =>
      db.user.findUniqueOrThrow({
        ...query,
        where: {
          id: token.sub,
        },
      }),
  }),
);

const CreateUserInput = builder.inputType("CreateUserInput", {
  fields: (t) => ({
    email: t.string({
      required: true,
      validate: {
        minLength: [
          8,
          { message: createUserValidateError.email.length.tooSmall },
        ],
        maxLength: [
          32,
          { message: createUserValidateError.email.length.tooBig },
        ],
      },
    }),
    name: t.string({
      required: true,
      validate: {
        minLength: [
          1,
          { message: createUserValidateError.name.length.tooSmall },
        ],
        maxLength: [
          32,
          { message: createUserValidateError.name.length.tooBig },
        ],
      },
    }),
    password: t.string({
      required: true,
      validate: {
        minLength: [
          1,
          { message: createUserValidateError.password.length.tooSmall },
        ],
        maxLength: [
          64,
          { message: createUserValidateError.password.length.tooBig },
        ],
      },
    }),
  }),
});

builder.mutationField("createUser", (t) =>
  t.prismaField({
    type: UserObject,
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    async resolve(query, root, { input }, ctx, info) {
      try {
        return db.user.create({
          ...query,
          data: {
            email: input.email,
            name: input.name,
            hashedPassword: await hash(input.password, 10),
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          const target = e.meta?.target as Array<string>;
          /**
           * P2022: Unique constraint failed
           * Prisma error codes: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
           */
          if (e.code === "P2002" && target.includes("email")) {
            throw new Error("Email address is already taken");
          }
        }
        throw e;
      }
    },
  }),
);
