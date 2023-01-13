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
        Query: {
          fields: {
            members: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
        Workspace: {
          fields: {
            boards: {
              merge(existing, incoming) {
                return incoming;
              },
            },
            members: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
        Board: {
          fields: {
            lists: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
        List: {
          fields: {
            cards: {
              merge(existing, incoming) {
                return incoming;
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
