import zod, { ZodError } from 'zod'
import { type Request, type Response, type NextFunction } from 'express'
import translate from '@Dictionary'

const animalSchema = zod.object({
  userId: zod.string({ required_error: translate({ id: 'validations-adoptions-user-id-required' }) }),
  ongId: zod.string({ required_error: translate({ id: 'validations-adoptions-ong-id-required' }) }),
  animalId: zod.string({ required_error: translate({ id: 'validations-adoptions-animal-id-required' }) })
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
    const messageError = translate({ id: 'server-error' })

    if (error instanceof ZodError) {
      const validationError = error.errors[0]?.message ?? messageError

      return res.status(500).json({ message: validationError })
    } else {
      return res.status(500).json({ message: messageError })
    }
  }
}

export default createValidation
