import { Request, Response } from "express";
import { User } from "../../models/users/user";

const Show = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    
    const result = await User.findOne({ where: { email },include:{association:'ongData'} });

    if (!result) {
      return res.status(404).json({ message: "O usuário não foi encotrado" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default Show;
