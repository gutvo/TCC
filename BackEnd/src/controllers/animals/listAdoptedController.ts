import { type Request, type Response } from 'express'
// import animalsServices from '@Services/animals'
// import translate from '@Dictionary'

// interface animalFilterProps {
//   race?: string[]
//   type?: 'Todos' | 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
//   sex?: 'Todos' | 'Macho' | 'Fêmea'
//   city?: string
// }

export default async function listAdoptedController (req: Request, res: Response) {
  // try {
  //   const offset = parseInt(req.query.offset as string)
  //   const limit = parseInt(req.query.limit as string)
  //   const ongId = req.query.ongId as string

  //   const filter = req.query.filter as animalFilterProps

  //   const { data, pagination, status } = await animalsServices.listAdoptedService({ filter, limit, offset, ongId })

  //   return res.status(status).json({ data, pagination })
  // } catch (error) {
  //   res.status(500).json({ message: translate({ id: 'server-error' }) })
  // }
}
