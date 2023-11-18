import { Request,Response } from "express";
import { Animal } from "../../../models/animals/animal";
import { Ong } from "../../../models/ongs/ongs";


const DashboardHome = async(req:Request,res:Response)=>{

    const countAdoptedAnimals = await Animal.count({
        where:{situation:'adopted'}
    })

    const countTotalAnimals = await Animal.count()

    const countTotalOngs = await Ong.count()


    return res.json({
        countAdoptedAnimals,
        countAvailableAnimals:countTotalAnimals-countAdoptedAnimals,
        countTotalAnimals,
        countTotalOngs
    })
}



export default DashboardHome;