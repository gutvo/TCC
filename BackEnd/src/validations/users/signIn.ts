import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

const signInUserSchema = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "a senha precisa ter no mínimo 8 caracteres"),
});

const userSignInValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await signInUserSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default userSignInValidation;
