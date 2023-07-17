import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

const userSchema = yup.object().shape({
  id: yup.number().required("ID é obrigatório"),
});

const deleteShowUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default deleteShowUserValidation;
