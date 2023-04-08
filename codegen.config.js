/** @type {import('@graphql-codegen/cli').CodegenConfig} */
module.exports = {
  overwrite: true,
  schema: 'src/__generated__/schema.graphql',
  documents: 'src/**/!(*.generated).{ts,tsx}',
  generates: {
    'src/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '__generated__/types.ts', // From `src/`
        folder: '__generated__',
        extension: '.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        ocumentMode: 'documentNode',
        immutableTypes: false,
        withComponent: false,
        withHooks: false,
        enumsAsConst: true,
        namingConvention: {
          enumValues: 'upper-case#upperCase',
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};
