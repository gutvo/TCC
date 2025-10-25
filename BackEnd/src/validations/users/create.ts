import zod, { ZodError } from "zod";
import { type Request, type Response, type NextFunction } from "express";
import { cnpj, cpf } from "cpf-cnpj-validator";
import translate from "@Dictionary";

const userSchemas = zod.object({
  email: zod
    .string({
      required_error: translate({
        id: "validations-users-user-email-required",
      }),
    })
    .email(translate({ id: "validations-users-email-invalid" })),
  password: zod
    .string({
      required_error: translate({
        id: "validations-users-user-password-required",
      }),
    })
    .min(8, translate({ id: "validations-users-password-min-caracters" })),
  ongData: zod
    .object({
      road: zod
        .string()
        .min(4, translate({ id: "validations-users-road-min-caracters" })),
      neighborhood: zod
        .string()
        .min(
          4,
          translate({ id: "validations-users-neighborhood-min-caracters" }),
        ),
      city: zod
        .string()
        .min(4, translate({ id: "validations-users-city-min-caracters" })),
      uf: zod
        .string()
        .length(2, translate({ id: "validations-users-uf-two-caracters" })),
      houseNumber: zod
        .string({
          required_error: translate({
            id: "validations-users-house-num-required",
          }),
        })
        .max(4),
      CEP: zod
        .string({
          invalid_type_error: translate({
            id: "validations-users-cep-invalid",
          }),
        })
        .length(9, translate({ id: "validations-users-cep-invalid" })),
      cpfCnpj: zod.string().superRefine((val, ctx) => {
        if (val.length !== 14 && val.length < 18) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: translate({ id: "validations-users-cpf-cnpj-invalids" }),
          });
        }
      }),
    })
    .optional(),
});

const createUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    await userSchemas.parseAsync(data);

    if (data.ongData !== undefined && data.ongData !== null) {
      const { cpfCnpj } = data.ongData;

      let isValid;
      if (cpfCnpj.length === 14) {
        isValid = cpf.isValid(cpfCnpj);
      } else {
        isValid = cnpj.isValid(cpfCnpj);
      }
      if (!isValid) {
        return res.status(400).json({
          message: translate({ id: "validations-users-cpf-cnpj-invalids" }),
        });
      }
    }

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

export default createUserValidation;
