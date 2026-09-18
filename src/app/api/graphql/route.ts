import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "@/lib/graphql/schema";
import { resolvers } from "@/lib/graphql/resolvers";

const schema = createSchema({
  typeDefs,
  resolvers,
});

// graphql-yoga's fetch-API handler plugs directly into a Next.js (App
// Router) route handler. Visiting /api/graphql in a browser opens the
// GraphiQL playground for exploring the schema; POSTing a query runs it.
const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS };
