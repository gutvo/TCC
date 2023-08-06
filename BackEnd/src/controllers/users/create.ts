import { Request, Response } from "express";
import { User } from "../../models/users/user";
import { Ong } from "../../models/users/ongs";

const Create = async (req: Request, res: Response) => {
  try {
    const { email, password, name, ongData } = req.body;
    const userExist = await User.findOne({where:{email}});


    if (userExist) {
      return res.status(409).json({ message: "Esse email já foi cadastrado" });
    }

    let result;
    if (ongData) {
      result = await User.create({
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
      const ong = await Ong.findOne({where:{userId:result.id}})
      result.ongId = ong?.id||null
      result.save();
    } else {
      result = await User.create({
        email,
        name,
        password
      });
    }
      res
        .status(201)
        .json({ message: `${ongData?'A organização':'O usuário'} foi cadastrado com sucesso`, data: result });
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

export default Create;
