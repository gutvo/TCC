import zod, { ZodError } from "zod";
import { type Request, type Response, type NextFunction } from "express";
import translate from "@Dictionary";

const loginUserSchema = zod.object({
  email: zod
    .string({
      required_error: translate({
        id: "validations-users-user-email-required",
      }),
    })
    .email(translate({ id: "validations-users-email-invalid" })),
  password: zod
    .string({
      required_error: translate({ id: "validations-users-user-id-required" }),
    })
    .min(8, "a senha precisa ter no mínimo 8 caracteres"),
});

const userLoginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await loginUserSchema.parseAsync(req.body);
    next();
  } catch (error) {
    const messageError = translate({ id: "server-error" });

    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message ?? messageError;

      return res.status(400).json({ message: errorMessage });
    } else {
      return res.status(500).json({ message: messageError });
    }
  }
};

export default userLoginValidation;
