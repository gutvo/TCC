import { Request, Response } from "express";
import { message } from "../../dictionary";
import { Phone } from "../../models/ongs/phones";

const Create = async (req: Request, res: Response) => {
  try {
    const {phone,ongId} = req.body;
    
    const [result,created] = await Phone.findOrCreate({where:{phone},defaults:{ongId}});
    if(!created){
      return res.status(400).json({message: 'Esse telefone ja foi cadastrado'});
    }
    res.status(201).json({data:result, message: 'Telefone adicionado com sucesso'});
  } catch (error) {

    res.status(500).json({message: message.serverError});
  }
};

export default Create;
