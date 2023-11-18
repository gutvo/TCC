import { Request, Response } from 'express'
import { Animal } from '../../models/animals/animal'
import { message } from '../../dictionary'
import path from 'path'
import fs from 'fs'

interface animalData {
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: string
  image: string
  ongId: number
}

const Create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      race,
      birthday,
      color,
      description,
      ongId,
      sex,
      type,
    }: animalData = req.body
    const file = req.file
    await Animal.create({
      name,
      race,
      color,
      sex,
      type,
      description,
      birthday: new Date(birthday).toISOString().slice(0, 10),
      image: file ? file?.filename : null,
      ongId,
      situation: 'available',
    })

    const imageData = req.file

    if (imageData) {
      const destinationPath = path.join(
        __dirname,
        `../../images/animals/${imageData.filename}`,
      )
      fs.copyFileSync(imageData.path, destinationPath)

      fs.unlink(imageData.path, error => {
        if (error) {
          return res.status(500).json(error)
        }
      })
    }

    res.status(201).json({ message: message.createAnimalSuccess })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}

export default Create
