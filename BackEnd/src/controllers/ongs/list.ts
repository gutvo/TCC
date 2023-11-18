import { Request,Response } from "express";
import { Ong } from "../../models/ongs/ongs";
import { Op } from "sequelize";
import { User } from "../../models/users/user";


const listOng = async(req:Request,res:Response)=>{
    const limit = parseInt(req.query.limit as string)
    const offset = parseInt(req.query.offset as string)
    const city = req.query.city as string
    const filter = req.query.filter as {name?:string, road?:string, neighborhood?:string}

    const where: { [Op.and]: unknown[]} = {
      [Op.and]: [],
  };

    if(filter?.name){
      where[Op.and].push({ name:filter?.name });
    }
    
    if(filter?.neighborhood){
      where[Op.and].push({ neighborhood:filter?.neighborhood });
    }
    
    if(filter?.road){
      where[Op.and].push({ road:filter?.road });
    }
    if(city){
      where[Op.and].push({ city });
    }

    const {rows,count} = await Ong.findAndCountAll({
        where,
        limit,
        offset,
        include: [{
            model: User,
            as: 'userData',
            attributes:['id','name','email','image'],
          }],
      });

      const pagination={
        count,
        limit,
        offset
      }
      
    return res.json({data:rows,pagination})
}



export default listOng;