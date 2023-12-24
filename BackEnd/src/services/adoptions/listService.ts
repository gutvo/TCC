import { Adoption } from '../../models/adoptions/adoptions'

interface listServiceProps {
  offset: number
  limit: number
  ongId: string
}

const listService = async ({ limit, offset, ongId }: listServiceProps) => {
  const { count, rows } = await Adoption.findAndCountAll({
    where: { ongId, confirm: null },
    include: [
      {
        association: 'userData',
        attributes: ['id', 'name', 'email'],
        required: true
      },
      {
        association: 'animalData',
        required: true
      }
    ]
  })
  return {
    data: rows,
    pagination: {
      offset,
      count,
      limit
    },
    status: 200
  }
}

export default listService
