import zod, { ZodError } from 'zod'
import { Request, Response, NextFunction } from "express";
import {cnpj,cpf} from 'cpf-cnpj-validator'

const userSchemas = zod.object({
  name: zod.string({required_error:'Nome é obrigatório'}),
  email: zod.string({required_error:'E-mail é obrigatório'}).email("E-mail inválido"),
  ongData: zod
      .object({
        road: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
        neighborhood: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
        city: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
        uf: zod.string().length(2,'Só pode ter dois digitos'),
        CEP: zod
        .string({ invalid_type_error: 'CEP inválido' })
        .length(9, 'CEP inválido'),
        cpfCnpj: zod.string().superRefine((val, ctx) => {
          if (val.length !== 14 && val.length < 18) {
            ctx.addIssue({
              code: zod.ZodIssueCode.custom,
              message: 'Cpf ou CNPJ inválidos',
            })
          }
        }),
      })
      .optional(),
});

const updateUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    await userSchemas.parseAsync(data)

    if(data?.ongData){
      const { cpfCnpj } = data.ongData

      let isValid
      if(cpfCnpj.length===14){
        isValid = cpf.isValid(cpfCnpj)
      }else{
        isValid = cnpj.isValid(cpfCnpj)
      }
      if(!isValid){
        return res.status(400).json({ message: 'Cpf ou CNPJ inválidos' });
      }
    }
    
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message || "Erro na validação";
      return res.status(400).json({ message: errorMessage });
    } else {
      return res.status(500).json({ message: "Erro no servidor:"+error });
    }
  }
};

export default updateUserValidation;
