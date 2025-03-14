import jwt from "jsonwebtoken";

const generateToken = (user: { id: string; username: string }) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};

export { generateToken };
