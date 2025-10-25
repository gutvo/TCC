import zod, { ZodError } from "zod";
import { type Request, type Response, type NextFunction } from "express";
import translate from "@Dictionary";

const animalSchema = zod.object({
  adoptionId: zod.string({
    required_error: translate({
      id: "validations-adoptions-adoption-id-requeire",
    }),
  }),
});

const deleteValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await animalSchema.parseAsync(req.query);

    next();
  } catch (error) {
    const messageError = translate({ id: "server-error" });

    if (error instanceof ZodError) {
      const validationError =
        error.errors[0]?.message !== undefined ?? messageError;

      return res.status(400).json({ message: validationError });
    } else {
      return res.status(500).json({ message: messageError });
    }
  }
};

export default deleteValidation;
