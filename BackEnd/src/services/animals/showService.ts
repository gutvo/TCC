import { Animal } from '../../models/animals/animal'
import translate from '@Dictionary'

export default async function showService (id: string) {
  const result = await Animal.findOne({
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        association: 'ongData',
        attributes: { exclude: ['cpfCnpj'] },
        include: [
          { association: 'userData', attributes: { exclude: ['password'] } }
        ]
      }
    ]
  })

  if (result === null) {
    return { message: translate({ id: 'animals-animal-not-found' }), status: 404 }
  }
  return { data: result, status: 200 }
}
