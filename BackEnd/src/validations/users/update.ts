import zod, { ZodError } from 'zod'
import { Request, Response, NextFunction } from "express";

const validator = zod.object({
  id: zod.number({required_error:'ID é obrigatório'}),
  name: zod.string({required_error:'Nome é obrigatório'}),
  email: zod.string({required_error:'E-mail é obrigatório'}).email("E-mail inválido"),
  password: zod.string({required_error:'Senha é obrigatória'}).min(8, "a senha precisa ter no mínimo 8 caracteres"),
});

const updateUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validator.parseAsync(req.body);
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

export default updateUserValidation;
