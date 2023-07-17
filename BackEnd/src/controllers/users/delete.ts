import { Request, Response } from "express";
import { User } from "../../models/user";

const Delete = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const result = await User.findOne({ where: { id } });

    if (!result) {
      return res.status(404).json({ message: "O usuário não foi encotrado" });
    }
    result.destroy();
    res.json({ message: "O usuário foi deletado com sucesso" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default Delete;
