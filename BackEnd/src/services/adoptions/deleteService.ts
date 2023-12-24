import { message } from '../../dictionary'
import { Adoption } from '../../models/adoptions/adoptions'

const deleteService = async (adoptionId: string) => {
  const result = await Adoption.findOne({ where: { id: adoptionId } })

  if (result === null) {
    return { message: message.adoptedNotExists, status: 404 }
  }

  await result.destroy()
  return { message: message.createAdoptionSuccess, status: 200 }
}

export default deleteService
