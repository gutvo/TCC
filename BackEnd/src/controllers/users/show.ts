import { Request, Response } from "express";
import { User } from "../../models/users/user";
import { message } from "../../dictionary";

const Show = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    
    const result = await User.findOne({ where: { email } ,include:{association:'ongData',include:[{association:'phoneData'}]} });

    if (!result) {
      return res.status(404).json({ message: message.userNotFound });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({message: message.serverError});
  }
};

export default Show;
