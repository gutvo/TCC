import { type Request, type Response } from "express";
// import { type OngData } from '@Models/ongs/ongs'
// import usersServices from '@Services/users'
// import translate from '@Dictionary'

// interface RequestProps {
//   email: string
//   name: string
//   password: string
//   ongData: OngData
// }

export default async function createController(req: Request, res: Response) {
  // try {
  //   const { email, password, name, ongData } = req.body as RequestProps
  //   const { message, status, data } = await usersServices.createService({ email, name, ongData, password })
  //   return res.status(status).json({ data, message })
  // } catch (error) {
  //   res.status(500).json({ message: translate({ id: 'server-error' }) })
  // }
}
