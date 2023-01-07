module.exports = {
  client: {
    includes: ["src/**/!(*.generated).{graphql,js,ts,jsx,tsx}"],
    excludes: ["**/__generated__/**/*"],
    service: {
      localSchemaFile: "src/__generated__/schema.graphql",
    },
  },
};
