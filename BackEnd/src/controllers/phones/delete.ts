import { Request, Response } from "express";
import { message } from "../../dictionary";
import { Phone } from "../../models/ongs/phones";

const Delete = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;

    const result = await Phone.findOne({
      where: { id },
    });

    if (!result) {
      return res.status(404).json({ message: message.ongPhoneNotFound});
    }

    result.destroy();
    return res.json({message: message.deleteOngPhoneSuccess });
  } catch (error) {
    res.status(500).json({message: message.serverError});
  }
};

export default Delete;
