import { Request, Response } from "express";
import { sequelize } from "../../migrations/mysql";
import { Animal } from "../../models/animal";
const listAnimal = async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();

    const offset = parseInt(req.query.offset as string);
    const limit = parseInt(req.query.limit as string);

    const { rows, count } = await Animal.findAndCountAll({
      offset,
      limit,
    });

    res.json({
      data: rows,
      pagination:{
        offset,
        count,
        limit
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default listAnimal;
