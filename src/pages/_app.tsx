import "@/styles/globals.css";

import { useApollo } from "@/hooks/useApollo";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = useApollo(pageProps);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
