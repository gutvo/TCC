import { Request, Response } from "express";
import { Animal } from "../../models/animals/animal";
import { message } from "../../dictionary";

const Update = async (req: Request, res: Response) => {
  try {
    const id = req.body.data.id;
    const result = await Animal.findOne({ where: { id } });

    if (!result) {
      return res
        .status(404)
        .json({ message: message.animalNotFound });
    }

    await result.update(req.body.data);

    res.json({
      message: message.updateAnimalSuccess,
      data: result
    });
  } catch (error) {
    res.status(500).json({message:message.serverError});
  }
};

export default Update;
