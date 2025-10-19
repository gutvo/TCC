import { Phone, type PhoneData } from '../../database/models/ongs/phones'
import { Op } from 'sequelize'
import translate from '@Dictionary'

interface UpdateServiceProps {
  id: string
  phone: PhoneData
}

export default async function updateService ({ phone, id }: UpdateServiceProps) {
  const confirmPhone = await Phone.findOne({
    where: { phone, id: { [Op.not]: id } }
  })

  if (confirmPhone !== null) {
    return { message: translate({ id: 'phones-phone-exist-other-account' }), status: 400 }
  }

  const data = await Phone.findOne({ where: { id } })

  if (data === null) {
    return { message: translate({ id: 'phones-phone-not-found' }), status: 404 }
  }

  await data.update({ phone })

  return { data, message: translate({ id: 'phones-update-success' }), status: 200 }
}
