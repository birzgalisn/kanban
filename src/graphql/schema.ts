import { builder } from "@/graphql/builder";
import { DateResolver, DateTimeResolver } from "graphql-scalars";

import "./resolvers/user";

builder.queryType({});
builder.mutationType({});

builder.addScalarType("Date", DateResolver, {});
builder.addScalarType("DateTime", DateTimeResolver, {});

export const schema = builder.toSchema({});
