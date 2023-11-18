import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null
    token
    if (!token) {
      return res.status(401).json({ message: 'Sem token de autorização' })
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string)
    return next()
  } catch (error) {
    res.status(401).json({ message: 'Erro na autenticação' })
  }
}
export default validateToken
