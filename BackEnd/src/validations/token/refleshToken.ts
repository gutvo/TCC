import { Request, Response, NextFunction } from "express";
import zod, { ZodError } from "zod";

const tokenSchemas = zod.object({
  email: zod
    .string({ required_error: "O Email é Obrigatório" })
    .email("Precisa ser um email válido"),
  password: zod
    .string({ required_error: "A senha é obrigatória" })
    .min(8, "tem que ter no minímo 8 caracteres"),
});

const refleshTokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    tokenSchemas.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message || "Erro na validação";
      console.log(errorMessage);

      return res.status(400).json({ message: errorMessage });
    } else {
      return res.status(500).json({ message: "Erro no servidor:" });
    }
  }
};
export default refleshTokenValidation;
