import { User } from '../../models/users/user'
import { message } from '../../dictionary'

export default async function showAdoptationService (id: string) {
  const data = await User.findOne({
    where: { id },
    include: {
      association: 'ongData',
      required: true,
      include: [{ association: 'phoneData' }]
    }
  })

  if (data === null) {
    return { message: message.userNotFound, status: 404 }
  }

  return { data, status: 200 }
}
