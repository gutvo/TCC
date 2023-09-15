import { Request, Response } from "express";
import { User } from "../../models/users/user";
import { message } from "../../dictionary";

const Update = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    
    const result = await User.findOne({ where: { email },include:{association:'ongData'} });

    if (!result) {
      return res
        .status(404)
        .json({ message: message.userNotFound });
    }

    await result.update(req.body);
    res.json({ message: "As informações foram alteradas com sucesso!", data:result });
  } catch (error) {
    res.status(500).json({message: message.serverError});
  }
};
export default Update;
