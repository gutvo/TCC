import { Request, Response } from "express";
import { User } from "../../models/user";

const Create = async (req: Request, res: Response) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      },
    });
    if (!created) {
      return res.status(409).json({ message: "Esse email já foi cadastrado" });
    }

    res
      .status(201)
      .json({ message: "O usuário foi cadastrado com sucesso", data: user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default Create;
