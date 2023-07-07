import { User } from "@prisma/client";
import { verifyAndCreateUsername } from "../utils/functions";
import { CreateUsernameResponse, GraphQLContext } from "../utils/types";
import { GraphQLError } from "graphql";

const userResolvers = {
  Query: {
    searchUsers: async function searchUsers(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> {
      const { username: searchedUsername } = args;
      const { session, prisma } = context;
      if (!session) {
        throw new GraphQLError("Not authenticated");
      }

      const {
        user: { username: myUsername },
      } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });

        return users;
      } catch (error: any) {
        throw new GraphQLError(error?.message);
      }
    },
  },

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

export default userResolvers;
