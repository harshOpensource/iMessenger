import { PrismaClient } from "@prisma/client";
import { CreateUsernameResponse } from "./types";

export async function verifyAndCreateUsername(
  args: { userId: string; username: string },
  prisma: PrismaClient
): Promise<CreateUsernameResponse> {
  const { userId, username } = args;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return {
        error: "Username already exists, Try Another!",
      };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    });

    return { success: true };
  } catch (error) {
    return {
      error: "Something went wrong, Try Again!",
    };
  }
}
