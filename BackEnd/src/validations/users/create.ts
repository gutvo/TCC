import zod, { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const userSchemas = zod.object({
  email: zod
    .string({ required_error: "O Email é Obrigatório" })
    .email("Precisa ser um email válido"),
  password: zod
    .string({ required_error: "A senha é obrigatória" })
    .min(8, "tem que ter no minímo 8 caracteres"),
    ongData:zod.object({
      road: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
      neighborhood: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
      city: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
      CEP: zod
        .string({ invalid_type_error: 'CEP inválido' })
        .min(8, 'CEP inválido')
        .max(9, 'CEP inválido'),
    }).nullable()
});

const createUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message || "Erro na validação";
      return res.status(400).json({ message: errorMessage });
    } else {
      return res.status(500).json({ message: "Erro no servidor:" + error });
    }
  }
};

export default createUserValidation;
