import { Request, Response } from "express";
import { message } from "../../dictionary";
import { Adoption } from "../../models/adoptions/adoptions";

const ShowAdoptedAnimal = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await Adoption.findOne({  
        where: { id },
        include: [
        {
          association:'animalData',
          include:[{
            association:'ongData',
          }],
        },
        {
          association:'animalData',
        },
    ], });

    if (!result) {
      return res.status(404).json({ message: message.animalNotFound});
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({message:message.serverError});
  }
};

export default ShowAdoptedAnimal;
