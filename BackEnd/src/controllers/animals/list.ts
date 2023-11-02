import { Request, Response } from "express";
import { Animal } from "../../models/animals/animal";
import { message } from "../../dictionary";
import { Op } from 'sequelize';


interface animalFilterProps{
  race?:string[]
  type?:'Todos'|'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  sex?:'Todos'|'Macho' | 'Fêmea'
  city?:string
}

const List = async (req: Request, res: Response) => {
  try {
    const offset = parseInt(req.query.offset as string);
    const limit = parseInt(req.query.limit as string);
    const ongId = parseInt(req.query.ongId as string);
    const city = req.query.city as string;

    let filter: animalFilterProps | undefined;

    if (typeof req.query.filter === 'object') {
      filter = req.query.filter as animalFilterProps;
    }

    let where: { [Op.and]: any[]} = {
      [Op.and]: [],
  };
   let whereCity = {}
   
    if (ongId) {
      where[Op.and].push({ ongId });
    }


    if (filter) {
      if (filter?.race?.length) {
        where[Op.and].push({ race: { [Op.in]: filter.race } });
      }
      if (filter?.sex?.length && filter.sex !== 'Todos') {
          where[Op.and].push({ sex: filter.sex });
      }
      if (filter?.type?.length && filter.type !== 'Todos') {
        where[Op.and].push({ type: filter.type });
      }
      if(filter?.city && !ongId){
        whereCity = {city: filter.city}
      }
    } 

    const { rows, count } = await Animal.findAndCountAll({
      where:{...where,situation:'available'},
      include: {
        association:'ongData',
        where:whereCity
      },
      offset,
      limit,
    });

    res.json({
      data: rows,
      pagination: {
        offset,
        count,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({message:message.serverError});
  }
};

export default List;
