import { Request, Response } from 'express'
import { message } from '../../dictionary'
import { Adoption } from '../../models/adoptions/adoptions'

const Create = async (req: Request, res: Response) => {
  try {
    const { userId, ongId, animalId } = req.body

    const [result, created] = await Adoption.findOrCreate({
      where: { userId, ongId, animalId },
    })

    if (!created) {
      return res.status(400).json({ message: message.createAdoptionNotExists })
    }
    res
      .status(201)
      .json({ data: result, message: message.createAdoptionSuccess })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}

export default Create
