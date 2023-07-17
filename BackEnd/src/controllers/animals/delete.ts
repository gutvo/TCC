import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Animal } from "../../models/animal";

const Delete = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const result = await Animal.findOne({
      where: { id },
    });

    if (!result) {
      return res.status(404).json({ message: "Animal não encontrado" });
    }

    if (result.image) {
      const imagePath = `pet${req.body.id}.jpg`;
      const destinationPath = path.join(
        __dirname,
        `../../images/animals/${imagePath}`
      );
      fs.unlink(destinationPath, (error) => {
        if (error) {
          return res.status(500).json(error);
        }
      });
    }
    result.destroy();
    return res.json("O animal foi deletado com sucesso!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export default Delete;
