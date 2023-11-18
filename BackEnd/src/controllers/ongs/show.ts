import { Request,Response } from "express";
import { Ong } from "../../models/ongs/ongs";
// import { Op } from "sequelize";
import { User } from "../../models/users/user";


const showOng = async(req:Request,res:Response)=>{
    const id = parseInt(req.query.id as string)

    const response = await Ong.findOne({
        where: {
          id
        },
        include: [{
            model: User,
            as: 'userData',
            attributes:['id','name','email','image'],
            include:[{
              association:'phoneData'
            }]
          }],
      });
    return res.json({data:response})
}



export default showOng;