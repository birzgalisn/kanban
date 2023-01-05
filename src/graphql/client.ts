import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import deepmerge from "deepmerge";
import { isEqual } from "lodash";

import type { NormalizedCacheObject } from "@apollo/client";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    connectToDevTools: process.env.NODE_ENV !== "production",
    link: createHttpLink({ uri: "/api/graphql" }),
    cache: new InMemoryCache({
      typePolicies: {
        List: {
          fields: {
            cards: {
              merge(existing = [], incoming: any[]) {
                return deepmerge(existing, incoming, {
                  arrayMerge: (destinationArray, sourceArray) => [
                    ...sourceArray,
                    ...destinationArray.filter((d) =>
                      sourceArray.every((s) => isEqual(d, s)),
                    ),
                  ],
                });
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.cache.extract();
    const data = deepmerge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }
  if (typeof window === "undefined") {
    return _apolloClient;
  }
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }
  return _apolloClient;
}
