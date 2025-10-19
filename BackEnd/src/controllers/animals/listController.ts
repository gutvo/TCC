import { type Request, type Response } from 'express'
// import animalsServices from '@Services/animals'
// import translate from '@Dictionary'

// interface animalFilterProps {
//   race?: string[]
//   type?: 'Todos' | 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
//   sex?: 'Todos' | 'Macho' | 'Fêmea'
//   city?: string
// }

export default async function listController (req: Request, res: Response) {
  // try {
  //   let filter: animalFilterProps | undefined
  //   if (typeof req.query.filter === 'object') {
  //     filter = req.query.filter as animalFilterProps
  //   }

  //   const offset = parseInt(req.query.offset as string)
  //   const limit = parseInt(req.query.limit as string)
  //   const ongId = req.query.ongId as string
  //   const city = req.query.city as string

  //   const { data, pagination } = await animalsServices.listService({
  //     city,
  //     filter,
  //     limit,
  //     offset,
  //     ongId
  //   })

  //   return res.json({ data, pagination })
  // } catch (error) {
  //   res.status(500).json({ message: translate({ id: 'server-error' }) })
  // }
}
