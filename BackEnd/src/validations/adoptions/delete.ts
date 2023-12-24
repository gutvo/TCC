import zod, { ZodError } from 'zod'
import { type Request, type Response, type NextFunction } from 'express'
import translate from '@Dictionary'

const animalSchema = zod.object({
  adoptionId: zod.string({
    required_error: 'A id do pedido de adoção é necessário.'
  })
})

const deleteValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await animalSchema.parseAsync(req.query)

    next()
  } catch (error) {
    const message = translate({ id: 'server-error' })
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message !== undefined ? error.errors[0]?.message : message
      return res.status(400).json({ message: errorMessage })
    } else {
      return res.status(500).json({ message })
    }
  }
}

export default deleteValidation
