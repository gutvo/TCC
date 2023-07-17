import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const encryptPassword = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.password = encrypt(req.body.password);
    return next();
  } catch (error) {
    res.status(500).json(error);
  }
};

function encrypt(password: string) {
  const saltRounds = 14;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

export default encryptPassword;
