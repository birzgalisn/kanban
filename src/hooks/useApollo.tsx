import { APOLLO_STATE_PROP_NAME, initializeApollo } from '@/graphql/client';
import { useMemo } from 'react';

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const client = useMemo(() => initializeApollo(state), [state]);
  return client;
}
