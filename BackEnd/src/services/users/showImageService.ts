import path from 'path'
import { message } from '../../dictionary'
import { User } from '../../models/users/user'

export default async function showImageService (email: string) {
  const result = await User.findOne({ where: { email } })

  if (result === null) {
    return { message: message.userNotFound, status: 404 }
  }
  if (result.image === null) {
    return { message: message.ImageNotFound, status: 404 }
  }

  const imagePath = path.join(__dirname, `../../images/users/${result.image}`)

  return { data: imagePath }
}
