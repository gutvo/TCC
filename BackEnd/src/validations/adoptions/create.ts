import zod, { ZodError } from 'zod'
import { type Request, type Response, type NextFunction } from 'express'
import translate from '@Dictionary'

const animalSchema = zod.object({
  userId: zod.string({ required_error: 'O usuário é necessário' }),
  ongId: zod.string({ required_error: 'A organização é necessária' }),
  animalId: zod.string({ required_error: 'O animal é necessário' })
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
    const message = translate({ id: 'server-error' })
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message !== undefined ? error.errors[0]?.message : message
      return res.status(500).json({ message: errorMessage })
    } else {
      return res.status(500).json({ message })
    }
  }
}

export default createValidation
