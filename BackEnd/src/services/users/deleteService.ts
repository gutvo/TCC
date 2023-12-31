import { User } from '../../models/users/user'
import { Op } from 'sequelize'
import { Adoption } from '../../models/adoptions/adoptions'
import { unlink } from 'fs'
import path from 'path'
import translate from '@Dictionary'

interface DeleteServiceProps {
  id: string
  email: string
}

export default async function deleteService ({ id, email }: DeleteServiceProps) {
  const result = await User.findOne({ where: { id, email } })

  if (result === null) {
    return { message: translate({ id: 'users-user-not-found' }), status: 404 }
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

  return { message: translate({ id: 'users-delete-success' }), status: 200 }
}
