// src/authMiddleware.ts
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export const authenticate = (req: any) => {
  const token = req.headers.authorization || "";
  const query = req.body?.query || "";

  if (query.includes("login") || query.includes("createUser")) {
    return null;
  }

  if (!token) {
    throw new AuthenticationError("Authentication token is required");
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY) as {
      id: string;
      role: string;
    };
    return decoded;
  } catch (err) {
    throw new AuthenticationError("Invalid or expired token");
  }
};
