import { Adoption } from '../../models/adoptions/adoptions'
import translate from '@Dictionary'

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
    return { message: translate({ id: 'adoptions-create-adoption-exist' }), status: 400 }
  }

  return { data: result, message: translate({ id: 'adoptions-create-success' }), status: 201 }
}

export default createService
