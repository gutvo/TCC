import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { Animal } from '../../models/animals/animal'
import { message } from '../../dictionary'

const Delete = async (req: Request, res: Response) => {
  try {
    const id = req.query.id

    const result = await Animal.findOne({
      where: { id },
    })

    if (!result) {
      return res.status(404).json({ message: message.animalNotFound })
    }

    if (result.image) {
      const destinationPath = path.join(
        __dirname,
        `../../images/animals/${result.image}`,
      )
      fs.unlink(destinationPath, error => {
        if (error) {
          return res.status(500).json(error)
        }
      })
    }
    result.destroy()
    return res.json({ message: message.deleteAnimalSuccess })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}

export default Delete
