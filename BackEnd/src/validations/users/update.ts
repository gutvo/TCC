import zod, { ZodError } from 'zod'
import { Request, Response, NextFunction } from "express";

const validator = zod.object({
  name: zod.string({required_error:'Nome é obrigatório'}),
  email: zod.string({required_error:'E-mail é obrigatório'}).email("E-mail inválido"),
  ongData: zod
      .object({
        road: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
        neighborhood: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
        city: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
        CEP: zod
          .string({ invalid_type_error: 'CEP inválido' })
          .min(8, 'CEP inválido')
          .max(9, 'CEP inválido'),
      })
      .nullable(),
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
