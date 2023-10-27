import { Request,Response } from "express";
import { Adoption } from "../../models/adoptions/adoptions";
import { User } from "../../models/users/user";
import { Animal } from "../../models/animals/animal";


const List = async(req:Request,res:Response)=>{
    const offset = parseInt(req.query.offset as string);
    const limit = parseInt(req.query.limit as string);
    const ongId = parseInt(req.query.ongId as string)

    const {count,rows} = await Adoption.findAndCountAll({
        where:{ongId},
        include:[
            {
                model:User,
                as:'userData',
                attributes:['id','name','email']
            },
            {
                model:Animal,
                as:'animalData'
            }
        ]
    })

    return res.json({data:rows, 
        pagination: {
            offset,
            count,
            limit,
        },
    })
}



export default List;