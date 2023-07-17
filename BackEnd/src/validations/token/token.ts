import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    token;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET as string);
      return next();
    }
    res.status(401).json({ message: "sem token de autorização" });
  } catch (error) {
    res.status(500).json(error);
  }
};
export default validateToken;
