import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import resolvers from "../../graphql-server/resolvers";
import typeDefs from "../../graphql-server/typeDefs";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { Session, getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { GraphQLContext } from "@/graphql-server/utils/types";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer as any, {
  context: async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<GraphQLContext> => {
    const session = await getServerSession(req, res, authOptions);
    const prisma = new PrismaClient();

    return { session: session as Session, prisma };
  },
});
