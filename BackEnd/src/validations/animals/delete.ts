import zod, { ZodError } from 'zod'
import { type Request, type Response, type NextFunction } from 'express'

const animalSchema = zod.object({
  id: zod.string({ required_error: 'ID é obrigatório' })
})

const deleteValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await animalSchema.parseAsync(req.query)

    next()
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors[0]?.message !== undefined ? error.errors[0]?.message : 'Erro na validação'
      return res.status(400).json({ message: errorMessage })
    } else {
      // return res.status(500).json({ message: 'Erro no servidor:' + error })
    }
  }
}

export default deleteValidator
