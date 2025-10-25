import translate from "@Dictionary";
import { type Request, type Response, type NextFunction } from "express";
import zod, { ZodError } from "zod";

const tokenSchemas = zod.object({
  email: zod
    .string({
      required_error: translate({
        id: "validations-tokens-user-email-required",
      }),
    })
    .email(translate({ id: "validations-tokens-email-invalid" })),
  password: zod
    .string({
      required_error: translate({
        id: "validations-tokens-user-password-required",
      }),
    })
    .min(8, translate({ id: "validations-tokens-password-min-caracters" })),
});

const refreshTokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await tokenSchemas.parseAsync(req.body);

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
export default refreshTokenValidation;
