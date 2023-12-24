import { User } from '../../models/users/user'
import { message } from '../../teste'
import { Op } from 'sequelize'
import { Adoption } from '../../models/adoptions/adoptions'
import { unlink } from 'fs'
import path from 'path'

interface DeleteServiceProps {
  id: string
  email: string
}

export default async function deleteService ({ id, email }: DeleteServiceProps) {
  const result = await User.findOne({ where: { id, email } })

  if (result === null) {
    return { message: message.userNotFound, status: 404 }
  }

  await Adoption.destroy({
    where: { userId: id, confirm: { [Op.not]: true } }
  })

  const destinationPath = path.join(
    __dirname,
        `../../images/users/${result.image}`
  )

  unlink(destinationPath, error => {
    if (error !== null) {
      return { message: error.message, status: error.code }
    }
  })

  await result.destroy()

  return { message: 'O usuário foi deletado com sucesso', status: 200 }
}
