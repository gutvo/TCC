import { Request, Response } from "express";
import { User } from "../../models/user";

const Create = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        name,
        password,
      },
    });
    if (!created) {
      return res.status(409).json({ message: "Esse email já foi cadastrado" });
    }

    res
      .status(201)
      .json({ message: "O usuário foi cadastrado com sucesso", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default Create;
