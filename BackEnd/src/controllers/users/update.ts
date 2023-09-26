import { Request, Response } from "express";
import { User } from "../../models/users/user";
import { message } from "../../dictionary";
import { Ong } from "../../models/ongs/ongs";
import { Op } from "sequelize";

const Update = async (req: Request, res: Response) => {
  try {
    const data = req.body
    
    const result = await User.findOne({ where: { email:data.email },include:{association:'ongData'} });

    if (!result) {
      return res
        .status(404)
        .json({ message: message.userNotFound });
    }

    await result.update(data);

    if(data.ongData){
      const ongResult = await Ong.findOne({where: {userId:result.id}})

      if (!ongResult) {
        return res
          .status(404)
          .json({ message: message.userNotFound });
      }
  
      const {cpfCnpj} = data.ongData

      const cpfCnpjExist = await Ong.findOne({where:{ cpfCnpj, userId: { [Op.not]: result.id}  }})

      if(cpfCnpjExist){
        return res.status(409).json({ message: "Esse CPF/CNPJ já foi cadastrado" });
      }
      await ongResult.update(data.ongData);
    }


    
    res.json({ message: "As informações foram alteradas com sucesso!", data:result });
  } catch (error) {
    res.status(500).json({message: message.serverError});
  }
};
export default Update;
