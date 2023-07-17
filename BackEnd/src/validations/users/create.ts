import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

const userSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "a senha precisa ter no mínimo 8 caracteres"),
});

const createUserValidation = async (
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

export default createUserValidation;
