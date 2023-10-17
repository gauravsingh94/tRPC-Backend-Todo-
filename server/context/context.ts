import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";

import { verify, VerifyErrors } from "jsonwebtoken";

export function createContext({
  req,
  res,
}: CreateExpressContextOptions): Promise<{
  userId: string;
  authorized: boolean;
}> {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("token", token);
    return new Promise((resolve) => {
      const secret = "Secret";
      jwt.verify(token, secret, (error: VerifyErrors | null, id: any) => {
        if (id) {
          console.log("Id:", id.id);
          resolve({ userId: id.id as string, authorized: true });
        } else {
          resolve({ userId: "-1", authorized: false });
        }
      });
    });
  }

  return Promise.resolve({
    userId: "-1",
    authorized: false,
  });
}
