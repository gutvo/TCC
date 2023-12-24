import { message } from '../../teste'
import { Phone } from '../../models/ongs/phones'

export default async function deleteService (id: string) {
  const result = await Phone.findOne({ where: { id } })

  if (result === null) {
    return { message: message.ongPhoneNotFound, status: 404 }
  }

  await result.destroy()

  return { message: message.deleteOngPhoneSuccess, status: 200 }
}
