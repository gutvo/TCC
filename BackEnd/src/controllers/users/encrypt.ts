import { Request, Response, NextFunction } from "express";
import { encrypt } from "../../functions";
import { message } from "../../dictionary";

const encryptPassword = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.password = encrypt(req.body.password);
    return next();
  } catch (error) {
    res.status(500).json({message: message.serverError});
  }
};

export default encryptPassword;
