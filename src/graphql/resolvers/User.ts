import { builder } from "@/graphql/builder";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { ZodError } from "zod";
import { InputError } from "../errors";

import { input as createUserValidateError } from "@/fixtures/auth/error";

const UserObjectRole = builder.enumType("Roles", {
  description: "User roles",
  values: ["USER", "ADMIN"] as const,
});

export const UserObject = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    role: t.expose("role", { type: UserObjectRole }),
    email: t.exposeString("email", { nullable: true }),
    emailVerified: t.expose("emailVerified", {
      type: "DateTime",
      nullable: true,
    }),
    name: t.exposeString("name", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    workspaces: t.relation("workspaces"),
    invites: t.relation("invites"),
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
    resolve: async (query, root, args, { token }, info) => {
      return db.user.findUniqueOrThrow({
        ...query,
        where: {
          id: token.sub,
        },
      });
    },
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
          6,
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
    errors: {
      types: [ZodError],
    },
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) => {
      const user = await db.user.findFirst({
        select: {
          id: true,
        },
        where: {
          email: input.email,
        },
      });

      if (user) {
        throw new InputError("Email address is already taken", [
          "input",
          "email",
        ]);
      }

      return db.user.create({
        data: {
          email: input.email,
          name: input.name,
          hashedPassword: await hash(input.password, 10),
          image: `${process.env.NEXT_PUBLIC_URL}/avatars/${Math.floor(
            Math.random() * 12,
          )}.svg`,
        },
      });
    },
  }),
);
