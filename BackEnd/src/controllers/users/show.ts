import { Request, Response } from "express";
import { User } from "../../models/user";

const Show = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const result = await User.findOne({ where: { id } });

    if (!result) {
      return res.status(404).json({ message: "O usuário não foi encotrado" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default Show;
