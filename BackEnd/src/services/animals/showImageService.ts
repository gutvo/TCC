import path from 'path'
import { Animal } from '../../models/animals/animal'
import { message } from '../../teste'

export default async function showImageService (id: string) {
  const result = await Animal.findOne({ where: { id } })

  if (result === null) {
    return { message: message.animalNotFound, status: 404 }
  }
  if (result.image === null) {
    return { message: message.animalNotFound, status: 404 }
  }

  const imagePath = path.join(
    __dirname,
      `../../images/animals/${result.image}`
  )

  return { data: imagePath, status: 200 }
}
