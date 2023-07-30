import { Request, Response, NextFunction } from "express";
import { sequelize } from "../../migrations/mysql";

const validateSequelize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await sequelize.authenticate();

    return next();
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor:" + error });
  }
};

export default validateSequelize;
