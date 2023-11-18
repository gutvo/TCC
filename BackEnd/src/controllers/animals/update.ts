import { Request, Response } from 'express'
import { Animal } from '../../models/animals/animal'
import { message } from '../../dictionary'
import fs from 'fs'
import path from 'path'

const Update = async (req: Request, res: Response) => {
  try {
    const id = req.body.id
    const result = await Animal.findOne({ where: { id } })

    if (!result) {
      return res.status(404).json({ message: message.animalNotFound })
    }

    await result.update({
      ...req.body,
      updatedAt: new Date(),
    })

    const newImage = req.file

    if (newImage) {
      const destinationPath = path.join(
        __dirname,
        `../../images/animals/${result.image || newImage.filename}`,
      )

      if (!result.image) {
        result.image = newImage.filename
        await result.save()
      }

      fs.copyFileSync(newImage.path, destinationPath)

      fs.unlink(newImage.path, error => {
        if (error) {
          return res.status(500).json(error)
        }
      })
    }

    res.json({
      message: message.updateAnimalSuccess,
      data: result,
    })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}

export default Update
