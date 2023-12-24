import { Animal } from '../../models/animals/animal'
import { message } from '../../dictionary'
import path from 'path'
import fs from 'fs'

interface createProps {
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: string
  image: string
  ongId: number
  file?: Express.Multer.File
}

export default async function createService ({
  name,
  race,
  birthday,
  color,
  description,
  ongId,
  sex,
  type,
  file
}: createProps) {
  await Animal.create({
    name,
    race,
    color,
    sex,
    type,
    description,
    birthday: new Date(birthday).toISOString().slice(0, 10),
    image: file !== null ? file?.filename : null,
    ongId,
    situation: 'available'
  })

  if (file !== undefined) {
    const destinationPath = path.join(
      __dirname,
        `../../images/animals/${file.filename}`
    )
    fs.copyFileSync(file.path, destinationPath)

    fs.unlink(file.path, error => {
      if (error !== null) {
        return { message: error.message, status: 500 }
      }
    })
  }
  return { message: message.createAnimalSuccess, status: 201 }
}
