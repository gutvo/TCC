// import { Ong } from '../../database/models/ongs/ongs'
// import { Op } from 'sequelize'

export interface OngsFilterProps {
  name?: string;
  road?: string;
  neighborhood?: string;
}

interface listProps {
  filter?: OngsFilterProps;
  city: string;
  limit: number;
  offset: number;
}

export default async function listService({
  filter,
  city,
  limit,
  offset,
}: listProps) {
  // const where: { [Op.and]: unknown[] } = {
  //   [Op.and]: []
  // }
  // const whereUser: { [Op.and]: unknown[] } = {
  //   [Op.and]: []
  // }
  // if (filter !== undefined) {
  //   if (filter?.name?.length !== 0) {
  //     whereUser[Op.and].push({ name: filter.name })
  //   }
  //   if (filter?.neighborhood?.length !== 0) {
  //     where[Op.and].push({ neighborhood: filter.neighborhood })
  //   }
  //   if (filter?.road?.length !== 0) {
  //     where[Op.and].push({ road: filter.road })
  //   }
  // }
  // if (city.length !== 0) {
  //   where[Op.and].push({ city })
  // }
  // const { rows, count } = await Ong.findAndCountAll({
  //   where,
  //   limit,
  //   offset,
  //   include: [
  //     {
  //       association: 'userData',
  //       attributes: ['id', 'name', 'email', 'image'],
  //       where: whereUser
  //     }
  //   ]
  // })
  // const pagination = {
  //   count,
  //   limit,
  //   offset
  // }
  // return { data: rows, pagination }
}
