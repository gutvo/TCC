import { Request, Response } from "express";
import { Adoption } from "../../models/adoptions/adoptions";
import { message } from "../../dictionary";
import { Animal } from "../../models/animals/animal";

const Adopt = async(req:Request,res:Response)=>{
    try{
        const adoptionId = parseInt(req.body.adoptionId as string)

        const adopted = await Adoption.findOne({where:{id:adoptionId}})

        if(!adopted){
            return res.status(404).json({message: message.adoptedNotExists})
        }
        
        const animal = await Animal.findOne({where:{id:adopted.animalId}})

        if(!animal){
            return res.status(404).json({message:message.animalNotFound})
        }

        await animal.update({
            situation: 'adopted',
            updatedAt: new Date()
        })

        await Adoption.destroy({where:{animalId: adopted.animalId}})

        return res.json({message:message.adoptedSuccess})
    }catch(error){
        res.status(500).json({message: message.serverError});
    }
}



export default Adopt;