import { Request, Response } from "express";
import { Animal } from "../../models/animals/animal";
import { message } from "../../dictionary";

const List = async (req: Request, res: Response) => {
  try {
    const offset = parseInt(req.query.offset as string);
    const limit = parseInt(req.query.limit as string);
    const ongId = parseInt(req.query.ongId as string);
    const city = req.query.city as string;

    let where = {}
    let whereCity = {}
    if (ongId) {
      where = { ongId };
    }else if(city){
      whereCity={city}
    }
    
    const { rows, count } = await Animal.findAndCountAll({
      where,
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
