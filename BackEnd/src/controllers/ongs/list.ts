import { Request,Response } from "express";
import { Ong } from "../../models/users/ongs";
import { Op } from "sequelize";
import { User } from "../../models/users/user";


const listOng = async(req:Request,res:Response)=>{
    const limit = parseInt(req.query.limit as string)
    const offset = parseInt(req.query.offset as string)


    const response = await Ong.findAndCountAll({
        where: {
          userId: {
            [Op.not]: null,
          },
        },
        limit,
        offset,
        include: [{
            model: User,
            as: 'userData',
            attributes:['name','email']
          }],
      });
      
    return res.json({data:response})
}



export default listOng;