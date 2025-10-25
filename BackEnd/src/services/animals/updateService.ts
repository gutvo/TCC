// import { Animal } from '../../database/models/animals/animal'
// import fs from 'fs'
// import path from 'node:path'
// import translate from '@Dictionary'

interface fileProps {
  filename: string
  path: string
}

interface UpdateAnimalProps {
  name?: string
  race?: string
  color?: string
  sex?: 'Macho' | 'Fêmea'
  description?: string
  type?: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday?: string
  image?: string
  ongId?: number
  file?: fileProps | null
}

interface UpdateServiceProps {
  id: string
  newImage?: Express.Multer.File
  body: UpdateAnimalProps
}

export default async function updateService ({ id, newImage, body }: UpdateServiceProps) {
  // const result = await Animal.findOne({ where: { id } })

  // if (result === null) {
  //   return { message: translate({ id: 'animals-animal-not-found' }), status: 404 }
  // }

  // await result.update({
  //   ...body,
  //   updatedAt: new Date()
  // })

  // if (newImage !== undefined) {
  //   const destinationPath = path.join(
  //     __dirname,
  //       `../../images/animals/${result.image ?? newImage.filename}`
  //   )

  //   if (result.image === null) {
  //     result.image = newImage.filename
  //     await result.save()
  //   }

  //   fs.copyFileSync(newImage.path, destinationPath)

  //   fs.unlink(newImage.path, error => {
  //     if (error !== null) {
  //       return { message: error.message, status: 500 }
  //     }
  //   })
  // }

  // return {
  //   message: translate({ id: 'animals-update-success' }),
  //   data: result,
  //   status: 200
  // }
}
