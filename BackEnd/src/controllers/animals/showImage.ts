import { Request, Response } from "express";
import path from "path";
import { Animal } from "../../models/animal";
import { message } from "../../dictionary";

const showImageAnimal = async (req: Request, res: Response) => {
  try {
    const result = await Animal.findOne({ where: { id: req.params.id } });
    

    if (!result) {
      return res
        .status(404)
        .json({ message: message.animalNotFound });
    }
    if (!result.image) {
      return res.status(404).json({ message: message.showAnimalImageNotFound });
    }

    const imagePath = path.join(
      __dirname,
      `../../images/animals/pet${req.params.id}.jpg`
    );
    res.sendFile(imagePath, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    res.status(500).json({message:message.serverError});
  }
};

export default showImageAnimal;
