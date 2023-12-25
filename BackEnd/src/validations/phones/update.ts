import zod, { ZodError } from 'zod'
import { type Request, type Response, type NextFunction } from 'express'
import translate from '@Dictionary'

const animalSchema = zod.object({
  phone: zod.string({ required_error: translate({ id: 'validations-phones-phone-number-required' }) }),
  id: zod.string({ required_error: translate({ id: 'validations-phones-phone-id-required' }) })
})

const updtatePhoneValidation = async (
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
      const errorMessage = error.errors[0]?.message ?? messageError

      return res.status(400).json({ message: errorMessage })
    } else {
      return res.status(500).json({ message: messageError })
    }
  }
}

export default updtatePhoneValidation
