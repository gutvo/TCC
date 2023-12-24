import zod, { ZodError } from 'zod'
import { type Request, type Response, type NextFunction } from 'express'

const animalSchema = zod.object({
  name: zod.string({ required_error: 'O nome é obrigatório' }),
  race: zod.string({ required_error: 'A raça é obrigatória' }),
  color: zod.string({ required_error: 'A Cor é obrigatória' }),
  sex: zod.union([zod.literal('Macho'), zod.literal('Fêmea')]),
  description: zod.string().max(255, 'Não passe do Limite de 255 caracteres'),
  type: zod.union([
    zod.literal('Cachorro'),
    zod.literal('Peixe'),
    zod.literal('Gato'),
    zod.literal('Outros')
  ]),
  birthday: zod.string().superRefine((val, ctx) => {
    if (new Date(val) < new Date('1990-01-01') || new Date(val) > new Date()) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: 'Data Inválida'
      })
    }
  })
})

const createValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await animalSchema.parseAsync(req.body)

    next()
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message !== undefined ? error.errors[0]?.message : 'Erro na validação'
      return res.status(400).json({ message: errorMessage })
    } else {
      return res.status(500).json({ message: 'Erro no servidor:' })
    }
  }
}

export default createValidation
