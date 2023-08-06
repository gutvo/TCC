import { Request, Response } from "express";
import { User } from "../../models/users/user";

const Update = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;

    const result = await User.findOne({ where: { email },include:{association:'ongData'} });
    if (!result) {
      return res
        .status(404)
        .json({ message: "ID de usuário não foi encontrado." });
    }

    await result.update(req.body);
    res.json({ message: "As informações foram alteradas com sucesso!", data:result });
  } catch (error) {
    res.status(500).json(error);
  }
};
export default Update;
