import zod, { ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

const animalSchema = zod.object({
  adoptionId: zod.string({
    required_error: 'A id do pedido de adoção é necessário.',
  }),
})

const deleteValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await animalSchema.parseAsync(req.query)

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

export default deleteValidation
