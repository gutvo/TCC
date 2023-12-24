import { message } from '../../dictionary'
import { Phone, type PhoneData } from '../../models/ongs/phones'
import { Op } from 'sequelize'

interface UpdateServiceProps {
  id: string
  phone: PhoneData
}

export default async function updateService ({ phone, id }: UpdateServiceProps) {
  const confirmPhone = await Phone.findOne({
    where: { phone, id: { [Op.not]: id } }
  })

  if (confirmPhone !== null) {
    return { message: message.ongPhoneExistDiferentCount, status: 400 }
  }

  const data = await Phone.findOne({ where: { id } })

  if (data === null) {
    return { message: message.ongPhoneNotFound, status: 404 }
  }

  await data.update({ phone })

  return { data, message: message.updateOngPhoneSuccess, status: 200 }
}
