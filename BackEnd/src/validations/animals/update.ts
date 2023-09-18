import zod, { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const getFormatedDate = (currentDate: String) => {
  return currentDate.split("/").reverse().join("-");
};

const animalSchema = zod.object({
  id: zod.string({ required_error: "O ID é obrigatório" }),
  name: zod.string({ required_error: "O nome é obrigatório" }),
  race: zod.string({ required_error: "A raça é obrigatória" }),
  color: zod.string({ required_error: "A Cor é obrigatória" }),
  sex: zod.union([zod.literal("Macho"), zod.literal("Fêmea")]),
  description: zod
    .string()
    .max(255, "Não passe do Limite de 255 caracteres"),
  type: zod.union([
    zod.literal("Cachorro"),
    zod.literal("Peixe"),
    zod.literal("Gato"),
    zod.literal("Outros"),
  ]),
  birthday: zod.string().superRefine((val, ctx) => {
    if (new Date(val) < new Date('1990-01-01') || new Date(val) > new Date()) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: 'Data Inválida',
      })
    }
  }),
});

const updateValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    await animalSchema.parseAsync(req.body);

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

export default updateValidation;
