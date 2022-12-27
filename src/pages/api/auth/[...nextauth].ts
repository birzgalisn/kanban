import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";

import type { NextAuthOptions, User } from "next-auth";

/**
 * For more information on each option (and a full list of options) go to
 * https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: "identify email" } },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          select: {
            id: true,
            role: true,
            name: true,
            email: true,
            image: true,
            hashedPassword: true,
          },
          where: {
            email: credentials.email,
          },
        });

        if (!user?.hashedPassword) return null;

        const passwordCorrect = await compare(
          credentials.password,
          user.hashedPassword,
        );

        if (user && passwordCorrect) {
          /** Any object returned will be saved in `user` property of the JWT */
          const { hashedPassword, ...userToReturn } = user;
          return userToReturn as User;
        } else {
          /** If you return null then an error will be displayed advising the user to check their details. */
          return null;
          /** You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter */
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    // signIn: "/auth/signin", // Displays signin buttons
    // signOut: "/auth/signout", // Displays form with sign out button
    // error: "/auth/signin", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
