import { Request, Response } from "express";
import { User } from "../../models/users/user";
import { message } from "../../dictionary";

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

    } else {
      result = await User.create({
        email,
        name,
        password
      });
    }
      res
        .status(201)
        .json({ message: ongData?message.createOngSuccess:message.createUserSuccess, data: result });
  } catch (error) {
    return res.status(500).json({message: message.serverError});
  }
};

export default Create;
