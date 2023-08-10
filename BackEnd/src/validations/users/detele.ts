import zod, { ZodError } from 'zod'
import { Request, Response, NextFunction } from "express";

const validator = zod.object({
  id: zod.string({required_error:'ID é obrigatório'}),
  email: zod.string({required_error:'O email é obrigatório'})
});

const deleteUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validator.parseAsync(req.query);
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

export default deleteUserValidation;
