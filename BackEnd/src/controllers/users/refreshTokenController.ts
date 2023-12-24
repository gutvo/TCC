import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import usersServices from '@Services/users'

interface RequestProps {
  email: string
  password: string
}

export default async function refreshTokenController (req: Request, res: Response) {
  try {
    const { email, password } = req.body as RequestProps

    const { message, status, data, token } = await usersServices.refreshTokenService({ email, password })

    return res.status(status).json({ data, token, message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
