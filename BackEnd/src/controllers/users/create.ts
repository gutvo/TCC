import { Request, Response } from "express";
import { User } from "../../models/users/user";
import { message } from "../../dictionary";
import { City } from "../../models/citys/city";

const Create = async (req: Request, res: Response) => {
  try {
    const { email, password, name, ongData } = req.body;
    const userExist = await User.findOne({where:{email}});


    if (userExist) {
      return res.status(409).json({ message: "Esse email já foi cadastrado" });
    }

    let data;
    if (ongData) {
      data = await User.create({
        email,
        name,
        password,
        ongData: {
          road: ongData.road,
          neighborhood: ongData.neighborhood,
          city: ongData.city,
          CEP: ongData.CEP
        }
      }, {
        include: [{ association: User.associations.ongData }]
      });
      await City.findOrCreate({
        where: { label: ongData.city },
      });

    } else {
      data = await User.create({
        email,
        name,
        password
      });
    }

    
      res
        .status(201)
        .json({ message: ongData?message.createOngSuccess:message.createUserSuccess, data });
  } catch (error) {
    return res.status(500).json({message: message.serverError});
  }
};

export default Create;
