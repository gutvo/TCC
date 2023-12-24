import { message } from '../../teste'
import { Adoption } from '../../models/adoptions/adoptions'

export default async function ShowAdoptedService (id: string) {
  const result = await Adoption.findOne({
    where: { id },
    include: [
      {
        association: 'animalData',
        include: [
          { association: 'ongData' }
        ]
      },
      { association: 'animalData' }
    ]
  })

  if (result === null) {
    return { message: message.animalNotFound, status: 404 }
  }

  return { data: result, status: 200 }
}
