import { type Request, type Response, type NextFunction } from "express";
import translate from "@Dictionary";
import encrypt from "@Utils/encrypt";

export default function encryptPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    req.body.password = encrypt(req.body.password);
    next();
  } catch (error) {
    res.status(500).json({ message: translate({ id: "server-error" }) });
  }
}
