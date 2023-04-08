/** @type {import('graphql-confi').IGraphQLConfig} */
module.exports = {
  schema: 'src/__generated__/schema.graphql',
  documents: 'src/**/!(*.generated).{graphql,js,ts,jsx,tsx}',
};
