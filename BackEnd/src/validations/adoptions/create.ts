import zod, { ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

const animalSchema = zod.object({
  userId: zod.string({ required_error: 'O usuário é necessário' }),
  ongId: zod.string({ required_error: 'A organização é necessária' }),
  animalId: zod.string({ required_error: 'O animal é necessário' }),
})

const createValidation = async (
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

export default createValidation
