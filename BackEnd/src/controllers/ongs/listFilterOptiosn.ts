import { Request,Response } from "express";
import { Ong } from "../../models/ongs/ongs";


const listFilterOptiosn = async(req:Request,res:Response)=>{
    const city = req.query.city as string

    const data = await Ong.findAll({
        where:{city},
        attributes:['road','neighborhood'],
        include:[{association:'userData',attributes:['name']}]
      });
      const road = data.map(item => item.road);
      const neighborhood = data.map(item => item.neighborhood);
      const name = data.map((item=>item.userData?.name))

      road.push('')
      neighborhood.push('')
      name.push('')

    return res.json({road,neighborhood,name})
}



export default listFilterOptiosn;