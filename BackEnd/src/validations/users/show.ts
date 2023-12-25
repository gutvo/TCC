import zod, { ZodError } from 'zod'
import { type Request, type Response, type NextFunction } from 'express'
import translate from '@Dictionary'

const validator = zod.object({
  email: zod.string({ required_error: translate({ id: 'validations-users-user-email-required' }) })
})

const showUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validator.parseAsync(req.query)
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

export default showUserValidation
