import { User } from '../../models/users/user'
import { message } from '../../dictionary'

export default async function showService (email: string) {
  const data = await User.findOne({
    where: { email },
    include: [{ association: 'ongData' }, { association: 'phoneData' }]
  })

  if (data === null) {
    return { message: message.userNotFound, status: 404 }
  }

  return { data, status: 200 }
}
