import { builder } from "@/graphql/builder";
import { db } from "@/lib/db";
import { ZodError } from "zod";

import { InputError } from "../errors";

import { input as memberValidateError } from "@/fixtures/member/error";

export const MemberObject = builder.prismaObject("Member", {
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    userId: t.exposeString("userId"),
    workspace: t.relation("workspace"),
    workspaceId: t.exposeString("workspaceId"),
    isOwner: t.exposeBoolean("isOwner"),
    invites: t.relation("invites"),
    comments: t.relation("comments"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

builder.queryField("members", (t) =>
  t.prismaField({
    type: [MemberObject],
    authScopes: {
      member: true,
    },
    args: {
      workspaceId: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { workspaceId }, { token }, info) => {
      return db.member.findMany({
        ...query,
        where: {
          workspaceId,
        },
      });
    },
  }),
);

const AddMemberInput = builder.inputType("AddMemberInput", {
  fields: (t) => ({
    email: t.string({
      required: true,
      validate: {
        minLength: [8, { message: memberValidateError.email.length.tooSmall }],
        maxLength: [32, { message: memberValidateError.email.length.tooBig }],
      },
    }),
  }),
});

builder.mutationField("addMember", (t) =>
  t.prismaField({
    type: MemberObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      member: true,
    },
    args: {
      input: t.arg({ type: AddMemberInput, required: true }),
      workspaceId: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { input, workspaceId }, { token }, info) => {
      const userToAdd = await db.user.findFirst({
        select: { id: true },
        where: { email: input.email },
      });

      if (!userToAdd)
        throw new InputError("User with that email address does not exist", [
          "input",
          "email",
        ]);

      const isMemberAlready = await db.member.findFirst({
        select: { id: true },
        where: {
          userId: userToAdd.id,
          workspaceId,
        },
      });

      if (isMemberAlready)
        throw new InputError("User is already member of the workspace", [
          "input",
          "email",
        ]);

      return db.member.create({
        ...query,
        data: {
          user: {
            connect: { id: userToAdd.id },
          },
          workspace: {
            connect: { id: workspaceId },
          },
        },
      });
    },
  }),
);

builder.mutationField("transferOwnership", (t) =>
  t.prismaField({
    type: MemberObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      member: true,
    },
    args: {
      memberId: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { memberId }, { token }, info) => {
      const initiator = await db.member.findFirst({
        select: { id: true },
        where: { userId: token.sub, isOwner: true },
      });

      if (!initiator)
        throw new InputError("Workspace transfer initiator is not an owner", [
          "memberId",
        ]);

      await db.member.update({
        where: {
          id: initiator.id,
        },
        data: {
          isOwner: false,
        },
      });

      return db.member.update({
        ...query,
        where: {
          id: memberId,
        },
        data: {
          isOwner: true,
        },
      });
    },
  }),
);

builder.mutationField("removeMember", (t) =>
  t.prismaField({
    type: MemberObject,
    errors: {
      types: [ZodError],
    },
    authScopes: {
      member: true,
    },
    args: {
      memberId: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, { memberId }, { token }, info) => {
      const initiator = await db.member.findFirst({
        select: { id: true, isOwner: true },
        where: { userId: token.sub },
      });

      if (!initiator || !initiator.isOwner)
        throw new InputError(
          "Workspace user remove initiator is not an owner",
          ["memberId"],
        );

      return db.member.delete({ ...query, where: { id: memberId } });
    },
  }),
);
