// import { Animal } from '../../database/models/animals/animal'
import { Op } from "sequelize";

interface animalFilterProps {
  race?: string[];
  type?: "Todos" | "Cachorro" | "Peixe" | "Gato" | "Outros";
  sex?: "Todos" | "Macho" | "Fêmea";
  city?: string;
}

interface listServiceProps {
  offset: number;
  limit: number;
  ongId?: string;
  city: string;
  filter: animalFilterProps | undefined;
}

export default async function listService({
  city,
  limit,
  offset,
  ongId,
  filter,
}: listServiceProps) {
  const where: { [Op.and]: unknown[] } = {
    [Op.and]: [],
  };
  let whereCity = {};

  if (ongId !== undefined) {
    where[Op.and].push({ ongId });
  } else {
    whereCity = { city };
  }

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

  // const { rows, count } = await Animal.findAndCountAll({
  //   where: { ...where, situation: 'available' },
  //   include: {
  //     association: 'ongData',
  //     where: whereCity
  //   },
  //   offset,
  //   limit
  // })

  // return {
  //   data: rows,
  //   pagination: {
  //     offset,
  //     count,
  //     limit
  //   }
  // }
}
