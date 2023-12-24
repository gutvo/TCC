import fs from 'fs'
import path from 'path'
import { Animal } from '../../models/animals/animal'
import { message } from '../../dictionary'

export default async function deleteService (id: string) {
  const result = await Animal.findOne({ where: { id } })

  if (result === null) {
    return { message: message.animalNotFound, status: 404 }
  }

  if (result.image !== null) {
    const destinationPath = path.join(
      __dirname,
        `../../images/animals/${result.image}`
    )
    fs.unlink(destinationPath, error => {
      if (error !== null) {
        return { message: error.message, status: 500 }
      }
    })
  }

  await result.destroy()

  return { message: message.deleteAnimalSuccess, status: 200 }
}
