import jwt from "jsonwebtoken";

const userSecret = "Secret";
export const generateJWT = (id: string) => {
  const payload = { id };
  return jwt.sign(payload, userSecret, { expiresIn: "1hr" });
};

