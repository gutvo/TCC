import { User } from '../../database/models/User'
import translate from '@Dictionary'

export default async function showService (email: string) {
  const data = await User.findOne({
    where: { email },
    include: [{ association: 'ongData' }, { association: 'phoneData' }]
  })

  if (data === null) {
    return { message: translate({ id: 'users-user-not-found' }), status: 404 }
  }

  return { data, status: 200 }
}
