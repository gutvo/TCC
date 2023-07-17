import { Request, Response } from "express";
import path from "path";
import { Animal } from "../../models/animal";

const showImageAnimal = async (req: Request, res: Response) => {
  try {
    const result = await Animal.findOne({ where: { id: req.params.id } });
    

    if (!result) {
      return res
        .status(404)
        .json({ message: "Não foi possível encontrado o animal" });
    }
    if (!result.image) {
      return res.status(404).json({ message: "O animal não tem imagem" });
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
    res.status(500).json(error);
  }
};

export default showImageAnimal;
