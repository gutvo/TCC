import { Request, Response } from "express";
import { message } from "../../dictionary";
import { Adoption } from "../../models/adoptions/adoptions";

const Delete = async (req: Request, res: Response) => {
  try {
    const {adoptionId} = req.query;

    const result = await Adoption.findOne({where:{id:adoptionId}})
    
    if(!result){
      return res.status(404).json({message: message.adoptedNotExists});
    }

    await result.destroy()

    res.status(201).json({data:result, message: message.createAdoptionSuccess});
  } catch (error) {
    res.status(500).json({message: message.serverError});
  }
};

export default Delete;
