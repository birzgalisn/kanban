import { builder } from "@/graphql/builder";
import { flattenErrors } from "@/lib/flattenErrors";
import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import { DateResolver, DateTimeResolver } from "graphql-scalars";
import { ZodError } from "zod";

import "./resolvers";

const ErrorInterface = builder.interfaceRef<Error>("Error").implement({
  fields: (t) => ({
    message: t.exposeString("message"),
  }),
});

/** A type for the individual validation issues */
const ZodFieldError = builder
  .objectRef<{
    message: string;
    path: string[];
  }>("ZodFieldError")
  .implement({
    fields: (t) => ({
      message: t.exposeString("message"),
      path: t.exposeStringList("path"),
    }),
  });

/** The actual error type */
builder.objectType(ZodError, {
  name: "ZodError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    fieldErrors: t.field({
      type: [ZodFieldError],
      resolve: (err) => flattenErrors(err.format(), []),
    }),
  }),
});

builder.queryType({});
builder.mutationType({});

builder.addScalarType("Date", DateResolver, {});
builder.addScalarType("DateTime", DateTimeResolver, {});

const schema = builder.toSchema({});

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync("src/__generated__/schema.graphql", schemaAsString);

export { schema };
