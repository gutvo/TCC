import { Request, Response } from "express";
import { message } from "../../dictionary";
import { Phone } from "../../models/ongs/phones";
import { Op } from "sequelize";

const Update = async (req: Request, res: Response) => {
  try {
    const {phone,id} = req.body;
    
    const confirmPhone = await Phone.findOne({where:{phone, id: {[Op.not]: id }}})
    
    if(confirmPhone){
      return res.status(400).json({message:message.ongPhoneExistDiferentCount})
    }

    const result = await Phone.findOne({where:{id}});

    if(!result){
      return res.status(404).json({message: message.ongPhoneNotFound});
    }

    await result.update({phone})
    
    res.json({data:result, message: message.updateOngPhoneSuccess});
  } catch (error) {

    res.status(500).json({message: message.serverError});
  }
};

export default Update;
