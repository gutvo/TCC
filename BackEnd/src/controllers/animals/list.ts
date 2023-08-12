import { Request, Response } from "express";
import { Animal } from "../../models/animal";
import { message } from "../../dictionary";
const listAnimal = async (req: Request, res: Response) => {
  try {
    const offset = parseInt(req.query.offset as string);
    const limit = parseInt(req.query.limit as string);
    const ongId = parseInt(req.query.ongId as string);

    const where=ongId?{ongId}:{}

    const { rows, count } = await Animal.findAndCountAll({
      where,
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
    console.log(error)
    res.status(500).json({message:message.serverError});
  }
};

export default listAnimal;
