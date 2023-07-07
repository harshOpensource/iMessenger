import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  /* pubsub: PubSub; */
}
