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
      return res.status(404).json({ message: 'O Telefone não foi encontrado.'});
    }

    result.destroy();
    return res.json({message: 'O número de telefone foi deletado com sucesso!'});
  } catch (error) {
    res.status(500).json({message: message.serverError});
  }
};

export default Delete;
