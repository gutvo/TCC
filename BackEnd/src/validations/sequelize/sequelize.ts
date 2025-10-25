import { type Request, type Response, type NextFunction } from "express";
import { sequelize } from "../../database";
import translate from "@Dictionary";

const validateSequelize = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await sequelize.authenticate();

    next();
  } catch (error) {
    return res.status(500).json({ message: translate({ id: "server-error" }) });
  }
};

export default validateSequelize;
