import { type Request, type Response, type NextFunction } from 'express'
import { encrypt } from '../../functions'
import translate from '@Dictionary'

export default function encryptPassword (req: Request, res: Response, next: NextFunction) {
  try {
    req.body.password = encrypt(req.body.password)
    next()
  } catch (error) {
    res.status(500).json({ message: translate({ id: 'server-error' }) })
  }
}
