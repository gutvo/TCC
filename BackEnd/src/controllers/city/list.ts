import { Request, Response } from "express";
import { City } from "../../models/citys";
import { message } from "../../dictionary";


const ListCity = async (req: Request, res: Response) => {
    try {      

        const data = await City.findAll()
      
          res.json({data});

        } catch (error) {
          res.status(500).json({message:message.serverError});
        
      }
  };

export default ListCity