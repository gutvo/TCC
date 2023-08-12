import { Request, Response } from "express";
import { User } from "../../models/users/user";
import { message } from "../../dictionary";

const Delete = async (req: Request, res: Response) => {
  try {
    const {id,email} = req.query;
    

    const result = await User.findOne({ where: { id, email } });

    if (!result) {
      return res.status(404).json({ message: message.userNotFound });
    }

    result.destroy();
    res.json({ message: "O usuário foi deletado com sucesso" });
  } catch (error) {
    res.status(500).json({message: message.serverError});
  }
};

export default Delete;
