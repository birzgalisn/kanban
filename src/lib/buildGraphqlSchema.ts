import { schema } from "@/graphql/schema";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";

const targetDir = "src/__generated__/";
const schemaAsString = printSchema(lexicographicSortSchema(schema));

if (!existsSync(targetDir)) {
  mkdirSync(targetDir);
}

writeFileSync(`${targetDir}/schema.graphql`, schemaAsString);
