import { Request, Response } from "express";
import { User } from "../../models/user";

const Update = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const result = await User.findOne({ where: { id } });

    if (!result) {
      return res
        .status(404)
        .json({ message: "ID de usuário não foi encontrado" });
    }

    await result.update(req.body);
    res.json({ message: "Usuário alterado com sucesso" });
  } catch (error) {
    res.status(500).json(error);
  }
};
export default Update;
