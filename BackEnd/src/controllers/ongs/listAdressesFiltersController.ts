import { type Request, type Response } from 'express'
import ongsServices from '@Services/ongs'
import translate from '@Dictionary'

export default async function listAdressesFiltersController (req: Request, res: Response) {
  try {
    const city = req.query.city as string

    const { name, neighborhood, road } = await ongsServices.listAdressesFiltersService(city)

    return res.json({ name, neighborhood, road })
  } catch (error) {
    res.status(500).json({ message: translate({ id: 'server-error' }) })
  }
}
