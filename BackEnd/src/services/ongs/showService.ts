import { Ong } from '../../models/ongs/ongs'

export default async function showService (id: string) {
  const response = await Ong.findOne({
    where: { id },
    include: [
      {
        association: 'userData',
        attributes: ['id', 'name', 'email', 'image'],
        include: [
          { association: 'phoneData' }
        ]
      }
    ]
  })
  return { data: response }
}
