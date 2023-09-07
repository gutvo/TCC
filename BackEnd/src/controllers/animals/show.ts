import { Request, Response } from "express";
import { Animal } from "../../models/animals/animal";
import { message } from "../../dictionary";

const Show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await Animal.findOne({ where: { id } });

    if (!result) {
      return res.status(404).json({ message: message.animalNotFound});
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({message:message.serverError});
  }
};

export default Show;
