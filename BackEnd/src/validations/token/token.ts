import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    token;
    if (!token) {
      res.status(401).json({ message: "Sem token de autorização" });
    } else {
      jwt.verify(token, process.env.TOKEN_SECRET as string);
      return next();
    }
  } catch (error) {
    res.status(401).json("Erro na autenticação");
  }
};
export default validateToken;
