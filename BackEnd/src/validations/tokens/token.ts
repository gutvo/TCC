import jwt from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'
import translate from '@Dictionary'

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization !== undefined
      ? req.headers.authorization.split(' ')[1]
      : null

    if (token === null) {
      return res.status(401).json({ message: translate({ id: 'validations-tokens-token-not-found' }) })
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string)
    next()
  } catch (error) {
    res.status(401).json({ message: translate({ id: 'server-token-error' }) })
  }
}
export default validateToken
