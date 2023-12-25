import path from 'path'
import { User } from '../../models/users/user'
import translate from '@Dictionary'

export default async function showImageService (email: string) {
  const result = await User.findOne({ where: { email } })

  if (result === null) {
    return { message: translate({ id: 'users-user-not-found' }), status: 404 }
  }
  if (result.image === null) {
    return { message: translate({ id: 'users-image-not-found' }), status: 404 }
  }

  const imagePath = path.join(__dirname, `../../images/users/${result.image}`)

  return { data: imagePath }
}
