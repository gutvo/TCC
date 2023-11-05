import { Request, Response } from "express";
import { message } from "../../dictionary";
import { User } from "../../models/users/user";


const ListChat = async (req: Request, res: Response) => {
    try {      
        const userId = req.query.userId

        console.log(userId)

        const data= await User.findOne({where:{id: userId},attributes:['name']})
      
        if(data?.name){
            res.json({data:data.name});
        }else{
            res.json({data:'Sem Nome'});
        }
        } catch (error) {
          res.status(500).json({message:message.serverError});
        
      };
  };

export default ListChat