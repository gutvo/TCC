import { Op } from "sequelize";
// import { Adoption } from '../../database/models/adoptions/adoptions'

interface animalFilterProps {
  race?: string[];
  type?: "Todos" | "Cachorro" | "Peixe" | "Gato" | "Outros";
  sex?: "Todos" | "Macho" | "Fêmea";
  city?: string;
}
interface listAdoptedServiceProps {
  offset: number;
  limit: number;
  ongId: string;
  filter: animalFilterProps;
}

export default async function listAdoptedService({
  filter,
  limit,
  offset,
  ongId,
}: listAdoptedServiceProps) {
  const where: { [Op.and]: unknown[] } = {
    [Op.and]: [],
  };

  if (ongId === undefined || ongId === null) {
    return { status: 401, message: "O id não foi encontrado" };
  }

  where[Op.and].push({ ongId });

  if (filter !== undefined) {
    if (filter?.race?.length != null) {
      where[Op.and].push({ race: { [Op.in]: filter.race } });
    }
    if (filter?.sex?.length != null && filter.sex !== "Todos") {
      where[Op.and].push({ sex: filter.sex });
    }
    if (filter?.type?.length != null && filter.type !== "Todos") {
      where[Op.and].push({ type: filter.type });
    }
  }

  // const { rows, count } = await Adoption.findAndCountAll({
  //   include: [
  //     {
  //       association: 'animalData',
  //       where: { ...where, situation: 'adopted' },
  //       include: [{ association: 'ongData' }]
  //     },
  //     { association: 'animalData' }
  //   ],
  //   offset,
  //   limit
  // })
  // return {
  //   data: rows,
  //   pagination: {
  //     offset,
  //     count,
  //     limit
  //   },
  //   status: 200
  // }
}
