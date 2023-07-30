import zod, { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const userSchemas = zod.object({
  name: zod.string({ required_error: "O nome é Obrigatório" }),
  email: zod
    .string({ required_error: "O Email é Obrigatório" })
    .email("Precisa ser um email válido"),
  password: zod
    .string({ required_error: "A senha é obrigatória" })
    .min(8, "tem que ter no minímo 8 caracteres"),
});




const createUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userSchemas.parseAsync(req.body);
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
