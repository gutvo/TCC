import zod, { ZodError } from 'zod'
import { Request, Response, NextFunction } from "express";

const loginUserSchema = zod.object({
  email: zod.string({required_error:'E-mail é obrigatóri'}).email("E-mail inválido"),
  password: zod
    .string({required_error:'Senha é obrigatória'})
    .min(8, "a senha precisa ter no mínimo 8 caracteres"),
});

const userLoginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await loginUserSchema.parseAsync(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message || "Erro na validação";
      return res.status(400).json({ message: errorMessage });
    } else {
      return res.status(500).json({ message: "Erro no servidor:"+error });
    }
  }
};

export default userLoginValidation;
