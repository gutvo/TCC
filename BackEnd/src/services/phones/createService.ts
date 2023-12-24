import { message } from '../../teste'
import { Phone, type PhoneData } from '../../models/ongs/phones'

interface CreateServiceProps {
  phone: PhoneData
  userId: string
}

export default async function createService ({ phone, userId }: CreateServiceProps) {
  const [result, created] = await Phone.findOrCreate({
    where: { phone },
    defaults: { userId }
  })

  if (!created) {
    return { message: message.ongPhoneExist, status: 400 }
  }
  return { data: result, message: message.createOngPhoneSuccess, status: 201 }
}
