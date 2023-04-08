# Manage projects easily - Kanban

Kanban board management software with focus to simplicity.

Workspace members can easily add other users to it, read, create and update issues created by themselves or others.

View live version now at: [https://www.kanban.lv](https://www.kanban.lv)

## Used solutions to achieve MVP

The project is build with [TypeScript](https://www.typescriptlang.org) and [React](https://reactjs.org) by leveraging powerfull features of [Next.js](https://nextjs.org) framework.

All server and client side communication is accomplished with [GraphQL](https://graphql.org) via [Apollo Client](https://www.apollographql.com) and [Apollo Server](https://www.apollographql.com). Client side fetched data is memory cached and after each request is updated with latest information.

GraphQL schema is built by using [Pothos GraphQL](https://pothos-graphql.dev) with additional plugins:

- [Auth plugin](https://pothos-graphql.dev/docs/plugins/scope-auth) - to ensure that only authorized users can interact with assigned workspace;

- [Prisma plugin](https://pothos-graphql.dev/docs/plugins/prisma) - to tighter integrate Pothos with Prisma and making easier to define Prisma based object types and resolve queries fater;

- [Validation plugin](https://pothos-graphql.dev/docs/plugins/validation) - to always validate query fields arguments based on [Zod](https://zod.dev) schema;

- [Error plugin](https://pothos-graphql.dev/docs/plugins/errors) - for easily including error types in GraphQL schema and hooking up error types to resolvers.

All user generated data is saved to [PlanetScale](https://planetscale.com) serverless [MySQL](https://www.mysql.com) database.

[Next Auth](https://next-auth.js.org) was used to handle user authnetication and sign in with [Discord](https://discord.com) or [GitHub](https://github.com).

For styling the user interface, custom React components were written by using [Tailwind CSS](https://tailwindcss.com/) [(v3.2)](https://tailwindcss.com/blog/tailwindcss-v3-2).

The project is deployed on [Vercel](https://vercel.com) with automatic continuous integration (CI) and continuous delivery (CD).

## Getting started

First, clone the project from GitHub and install all necesary dependencies:

```bash
git clone https://github.com/birzgalisn/kanban.git
cd kanban/
npm ci
```

After project is cloned and packages are installed, environment variables needs to be set. Clone `.env.example` and fill in blank fields:

```bash
cp .env.example .env
```

Then setup [Docker](https://www.docker.com) development environment:

```bash
make dev
```

When all is configured, push the Prisma schema and insert data into the database:

```bash
make db-init
```

NB: To push the schema to DB, the Docker development environment needs to be running.

When Docker is running and DB is setup, the application is available at [http://kanban.localhost](http://kanban.localhost); Prisma studio - [http://studio.kanban.localhost](http://studio.kanban.localhost)
