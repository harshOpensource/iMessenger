import { Session } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import { verifyAndCreateUsername } from "./utils/functions";
import { CreateUsernameResponse, GraphQLContext } from "./utils/types";

const resolvers = {
  Mutation: {
    createUsername: async function createUsername(
      _: any,
      args: {
        username: string;
      },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> {
      const { session, prisma } = context;
      if (!session) {
        throw new Error("Not authenticated");
      }

      const { id } = session.user;
      const { username } = args;

      return await verifyAndCreateUsername({ userId: id, username }, prisma);
    },
  },
};

export default resolvers;
