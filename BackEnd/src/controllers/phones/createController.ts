import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import { type PhoneData } from '@Models/ongs/phones'
import phonesServices from '@Services/phones'

interface RequestProps {
  phone: PhoneData
  userId: string
}

export default async function createController (req: Request, res: Response) {
  try {
    const { phone, userId } = req.body as RequestProps

    const { data, message, status } = await phonesServices.createService({ phone, userId })

    return res.status(status).json({ data, message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
