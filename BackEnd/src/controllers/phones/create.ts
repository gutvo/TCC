import { Request, Response } from "express";
import { message } from "../../dictionary";
import { Phone } from "../../models/ongs/phones";

const Create = async (req: Request, res: Response) => {
  try {
    const {phone,userId} = req.body;
    
    const [result,created] = await Phone.findOrCreate({where:{phone},defaults:{userId}})

    if(!created){
      return res.status(400).json({message: message.ongPhoneExist});
    }
    res.status(201).json({data:result, message: message.createOngPhoneSuccess});
  } catch (error) {
    res.status(500).json({message: message.serverError});
  }
};

export default Create;
