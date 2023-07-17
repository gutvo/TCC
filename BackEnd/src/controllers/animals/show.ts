import { Request, Response } from "express";
import { Animal } from "../../models/animal";

const Show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await Animal.findOne({ where: { id } });

    if (!result) {
      return res.status(404).json({ message: "O animal não foi encontrado" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default Show;
