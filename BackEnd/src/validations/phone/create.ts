import zod, { ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

const animalSchema = zod.object({
  phone: zod.string({ required_error: 'O número de telefone é obrigatório' }),
  userId: zod.string({ required_error: 'O ID da Organização é obrigatório' }),
})

const createPhoneValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await animalSchema.parseAsync(req.body)

    return next()
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message || 'Erro na validação'
      return res.status(400).json({ message: errorMessage })
    } else {
      return res.status(500).json({ message: 'Erro no servidor:' })
    }
  }
}

export default createPhoneValidation
