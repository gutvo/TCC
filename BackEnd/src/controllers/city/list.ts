import { Request, Response } from "express";
import { City } from "../../models/citys/city";
import { message } from "../../dictionary";


const ListCity = async (req: Request, res: Response) => {
    try {      

        const { rows } = await City.findAndCountAll()
      
          res.json({data: rows});

        } catch (error) {
          console.log(error)
          res.status(500).json({message:message.serverError});
        
      };
  };

export default ListCity