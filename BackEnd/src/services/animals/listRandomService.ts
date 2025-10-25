// import { Animal } from '../../database/models/animals/animal'
// import sequelize  from '../../database'
// import { Op } from 'sequelize'

interface RandomServiceProps {
  city: string;
  ongId: string;
}

export default async function listRandomService({
  city,
  ongId,
}: RandomServiceProps) {
  // let where = {}
  // if (ongId !== null) {
  //   where = { id: ongId }
  // } else {
  //   where = { city }
  // }
  // const data = await Animal.findAll({
  //   where: {
  //     situation: 'available',
  //     image: { [Op.not]: null }
  //   },
  //   include: {
  //     association: 'ongData',
  //     where
  //   },
  //   order: sequelize.random(),
  //   limit: 4
  // })
  // return { data }
}
