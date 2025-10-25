import zod, { ZodError } from "zod";
import { type Request, type Response, type NextFunction } from "express";
import translate from "@Dictionary";

const animalSchema = zod.object({
  name: zod.string({
    required_error: translate({
      id: "validations-animals-animal-name-required",
    }),
  }),
  race: zod.string({
    required_error: translate({
      id: "validations-animals-animal-race-required",
    }),
  }),
  color: zod.string({
    required_error: translate({
      id: "validations-animals-animal-color-required",
    }),
  }),
  sex: zod.union([zod.literal("Macho"), zod.literal("Fêmea")]),
  description: zod.string().optional(),
  type: zod.union([
    zod.literal("Cachorro"),
    zod.literal("Peixe"),
    zod.literal("Gato"),
    zod.literal("Outros"),
  ]),
  birthday: zod.string().superRefine((val, ctx) => {
    if (new Date(val) < new Date("1990-01-01") || new Date(val) > new Date()) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: translate({ id: "validations-animals-invalid-date" }),
      });
    }
  }),
});

const createValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await animalSchema.parseAsync(req.body);

    next();
  } catch (error) {
    const messageError = translate({ id: "server-error" });

    if (error instanceof ZodError) {
      const validationError = error.errors[0]?.message ?? messageError;

      return res.status(400).json({ message: validationError });
    } else {
      return res.status(500).json({ message: messageError });
    }
  }
};

export default createValidation;
