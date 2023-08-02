import { Request, Response, NextFunction } from "express";
import { encrypt } from "../../functions";

const encryptPassword = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.password = encrypt(req.body.password);
    return next();
  } catch (error) {
    res.status(500).json(error);
  }
};

export default encryptPassword;
