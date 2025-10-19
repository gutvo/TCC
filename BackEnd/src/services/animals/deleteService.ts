// import fs from 'fs'
// import path from 'path'
// import { Animal } from '../../database/models/animals/animal'
import translate from '@Dictionary'

export default async function deleteService (id: string) {
  // const result = await Animal.findOne({ where: { id } })

  // if (result === null) {
  //   return { message: translate({ id: 'animals-animal-not-found' }), status: 404 }
  // }

  // if (result.image !== null) {
  //   const destinationPath = path.join(
  //     __dirname,
  //       `../../images/animals/${result.image}`
  //   )
  //   fs.unlink(destinationPath, error => {
  //     if (error !== null) {
  //       return { message: error.message, status: 500 }
  //     }
  //   })
  // }

  // await result.destroy()

  return { message: translate({ id: 'animals-delete-success' }), status: 200 }
}
