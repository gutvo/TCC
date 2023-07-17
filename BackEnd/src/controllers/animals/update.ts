import { Request, Response } from "express";
import { Animal } from "../../models/animal";

const Update = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const result = await Animal.findOne({ where: { id } });

    if (!result) {
      return res
        .status(404)
        .json({ message: "ID do animal não foi encontrado" });
    }

    await result.update(req.body);

    res.json({
      message: "As informações do animal foram alteradas com sucesso",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export default Update;
