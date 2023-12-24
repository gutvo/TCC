import { User } from '../../models/users/user'
import { message } from '../../teste'
import { Ong, type OngData } from '../../models/ongs/ongs'
import { Op } from 'sequelize'
import fs from 'fs'
import path from 'path'
import { City } from '../../models/cities'

interface DataProps {
  id: number
  name: string
  email: string
  password: string
  ongData: OngData
  image: string
}

interface UpdateServiceProps {
  data: DataProps
  newImage?: Express.Multer.File
}

export default async function updateService ({ data, newImage }: UpdateServiceProps) {
  const result = await User.findOne({
    where: { email: data.email },
    include: { association: 'ongData' }
  })

  if (result === null) {
    return { message: message.userNotFound, status: 404 }
  }

  await result.update({ ...data, updatedAt: new Date() })

  if (data.ongData !== undefined) {
    const ongResult = await Ong.findOne({ where: { userId: result.id } })

    if (ongResult === null) {
      return { message: message.userNotFound, status: 404 }
    }

    const { cpfCnpj } = data.ongData

    const cpfCnpjExist = await Ong.findOne({
      where: { cpfCnpj, userId: { [Op.not]: result.id } }
    })

    if (cpfCnpjExist !== null) {
      return { message: 'Esse CPF/CNPJ já foi cadastrado', status: 409 }
    }
    await ongResult.update(data.ongData)

    await City.findOrCreate({
      where: { label: data.ongData.city }
    })
  }

  if (newImage !== undefined) {
    const imageName = result.image ?? newImage.filename

    const destinationPath = path.join(
      __dirname,
        `../../images/users/${imageName}`
    )

    result.image = imageName
    await result.save()

    fs.copyFileSync(newImage.path, destinationPath)

    fs.unlink(newImage.path, error => {
      if (error !== null) {
        return { message: error.message, status: error.code }
      }
    })
  }

  return {
    message: 'As informações foram alteradas com sucesso!',
    data: result,
    status: 200
  }
}
