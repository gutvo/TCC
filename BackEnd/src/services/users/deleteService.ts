import { User } from '../../models/users/user'
import { message } from '../../dictionary'
import { Op } from 'sequelize'
import { Adoption } from '../../models/adoptions/adoptions'

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

  await result.destroy()

  return { message: 'O usuário foi deletado com sucesso', status: 200 }
}
