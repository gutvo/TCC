import zod, { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const getFormatedDate = (currentDate: String) => {
  return currentDate.split("/").reverse().join("-");
};

const animalSchema = zod.object({
  id: zod.number({ required_error: "O ID é obrigatório" }),
  name: zod.string({ required_error: "O nome é obrigatório" }),
  race: zod.string({ required_error: "A raça é obrigatória" }),
  color: zod.string({ required_error: "A Cor é obrigatória" }),
  sex: zod.union([zod.literal("Macho"), zod.literal("Fêmea")]),
  description: zod
    .string()
    .min(2, "A raça é obrigatório")
    .max(255, "Não passe do Limite de 255 caracteres"),
  type: zod.union([
    zod.literal("Cachorro"),
    zod.literal("Peixe"),
    zod.literal("Gato"),
    zod.literal("Outros"),
  ]),
  birthday: zod.string().refine(
    (value) => {
      return !isNaN(new Date(value).getTime());
    },
    {
      message: "Data incorreta",
      path: ["birthday"],
    }
  ),
  // imagesData: zod.union([zod.instanceof(FileList), zod.string()]).nullable(),
  image: zod.boolean().refine((value) => typeof value === "boolean", {
    message: "O campo image deve ser um valor booleano",
    path: ["image"],
  }),
});

const updateValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await animalSchema.parseAsync(req.body.data);

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
