import { type Request, type Response } from "express";
// import animalsServices from '@Services/animals'
// import translate from '@Dictionary'

export default async function showImageController(req: Request, res: Response) {
  // try {
  //   const id = req.params.id
  //   const { status, data, message } = await animalsServices.showImageService(id)
  //   if (data !== undefined) {
  //     res.sendFile(data, {
  //       headers: {
  //         'Content-Type': 'image/jpeg'
  //       }
  //     })
  //   } else {
  //     res.status(status).json({ message })
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: translate({ id: 'server-error' }) })
  // }
}
