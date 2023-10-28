import { Request,Response } from "express";
import { Animal } from "../../../models/animals/animal";
import { Op } from "sequelize";


const AdoptedAnimal = async(req:Request,res:Response)=>{
    const ongId = parseInt(req.query.ongId as string)
    const year = parseInt(req.query.year as string)

    const startYear = new Date(year, 0, 1)

    const endYear = new Date(year + 1, 0, 1)

    const result = await Animal.findAll({
        where:{ongId,
            createdAt:{[Op.gte]:startYear},
            updatedAt:{[Op.lt]:endYear},
        },
    })

    return res.json({data: result})
}



export default AdoptedAnimal;