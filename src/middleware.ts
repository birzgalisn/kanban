import { withAuth } from 'next-auth/middleware';

/**
 * More on how NextAuth.js middleware works:
 * https://next-auth.js.org/configuration/nextjs#middleware */
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      /**
       * `/workspaces`
       * or
       * '/settings'
       *  routes requires the user to be signed in */
      return !!token;
    },
  },
});

export const config = { matcher: ['/workspaces/:path*', '/settings/:path*'] };
