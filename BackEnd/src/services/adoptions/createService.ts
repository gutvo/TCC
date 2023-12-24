import { message } from '../../teste'
import { Adoption } from '../../models/adoptions/adoptions'

interface createProps {
  userId: string
  ongId: string
  animalId: string
}

const createService = async ({ userId, ongId, animalId }: createProps) => {
  const [result, created] = await Adoption.findOrCreate({
    where: { userId, ongId, animalId }
  })

  if (!created) {
    return { message: message.createAdoptionNotExists, status: 400 }
  }

  return { data: result, message: message.createAdoptionSuccess, status: 201 }
}

export default createService
