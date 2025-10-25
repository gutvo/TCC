import User from '../../database/models/User'
import translate from '@Dictionary'

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
    return { message: translate({ id: 'users-user-not-found' }), status: 404 }
  }

  return { data, status: 200 }
}
