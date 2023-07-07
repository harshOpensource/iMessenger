import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import resolvers from "../../graphql-server/resolvers";
import typeDefs from "../../graphql-server/typeDefs";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
export default startServerAndCreateNextHandler(apolloServer);
