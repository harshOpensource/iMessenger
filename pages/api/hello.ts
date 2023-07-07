import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
