import { Request, Response } from "express";
import { User } from "../../models/users/user";
import { message } from "../../dictionary";
import { City } from "../../models/citys/city";
import { Op } from "sequelize";
import { Ong } from "../../models/ongs/ongs";

const Create = async (req: Request, res: Response) => {
  try {
    const { email, password, name, ongData } = req.body;
    const userExist = await User.findOne({where:{email}});

    if (userExist) {
      return res.status(409).json({ message: "Esse email já foi cadastrado" });
    }

    let data;
    if (ongData) {
      const { road, neighborhood, city, CEP, uf, cpfCnpj } = ongData
      const cpfCnpjExist = await Ong.findOne({where:{ cpfCnpj }})

      if(cpfCnpjExist){
        return res.status(409).json({ message: "Esse CPF/CNPJ já foi cadastrado" });
      }
      data = await User.create({
        email,
        name,
        password,
        ongData: {
          road,
          neighborhood,
          city,
          CEP,
          uf,
          cpfCnpj
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
