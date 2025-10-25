// import { Animal } from '../../database/models/animals/animal'
// import { Op } from 'sequelize'

interface RescuedAdoptedAnimalServiceProps {
  year: number;
  ongId: string;
}

export default async function rescuedAdoptedAnimalService({
  year,
  ongId,
}: RescuedAdoptedAnimalServiceProps) {
  // const startYear = new Date(year, 0, 1)
  // const endYear = new Date(year + 1, 0, 1)
  // const result = await Animal.findAll({
  //   where: {
  //     ongId,
  //     createdAt: { [Op.gte]: startYear },
  //     updatedAt: { [Op.lt]: endYear }
  //   }
  // })
  // return { data: result }
}
