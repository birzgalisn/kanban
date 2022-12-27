import "graphql/error";

/**
 * See built-in error codes
 * https://www.apollographql.com/docs/apollo-server/data/errors/#built-in-error-codes
 */
type ApolloErrorCode =
  | "GRAPHQL_PARSE_FAILED"
  | "GRAPHQL_VALIDATION_FAILED"
  | "BAD_USER_INPUT"
  | "PERSISTED_QUERY_NOT_FOUND"
  | "PERSISTED_QUERY_NOT_SUPPORTED"
  | "OPERATION_RESOLUTION_FAILURE"
  | "BAD_REQUEST"
  | "INTERNAL_SERVER_ERROR";

type Code = ApolloErrorCode | "UNAUTHENTICATED";

declare module "graphql/error" {
  interface GraphQLErrorExtensions {
    code: Code;
  }
}
