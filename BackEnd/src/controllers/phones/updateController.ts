import { type Request, type Response } from 'express'
import { message } from '../../dictionary'
import phonesServices from '@Services/phones'
import { type PhoneData } from '@Models/ongs/phones'

interface RequestProps {
  id: string
  phone: PhoneData
}

export default async function updateController (req: Request, res: Response) {
  try {
    const { phone, id } = req.body as RequestProps

    const { message, status, data } = await phonesServices.updateService({ id, phone })

    return res.status(status).json({ data, message })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}
