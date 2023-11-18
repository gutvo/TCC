import { Request,Response } from "express";
import { Ong } from "../../models/ongs/ongs";
import { Op } from "sequelize";
import { User } from "../../models/users/user";


const listOng = async(req:Request,res:Response)=>{
    const limit = parseInt(req.query.limit as string)
    const offset = parseInt(req.query.offset as string)
    const city = req.query.city as string

    const data = await Ong.findAndCountAll({
        where:{userId: {[Op.not]: null },city},
        limit,
        offset,
        include: [{
            model: User,
            as: 'userData',
            attributes:['id','name','email','image']
          }],
      });
      
    return res.json({data})
}



export default listOng;