import { Animal } from '../../models/animals/animal'
import { Ong } from '../../models/ongs/ongs'

export default async function dashboardHomeService () {
  const countAdoptedAnimals = await Animal.count({
    where: { situation: 'adopted' }
  })

  const countTotalAnimals = await Animal.count()

  const countTotalOngs = await Ong.count()

  return {
    countAdoptedAnimals,
    countAvailableAnimals: countTotalAnimals - countAdoptedAnimals,
    countTotalAnimals,
    countTotalOngs
  }
}
