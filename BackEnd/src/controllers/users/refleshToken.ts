import { Request, Response } from "express";
import { User } from "../../models/users/user";
import { generateAccessToken } from "../../functions";
import { message } from "../../dictionary";

const refleshToken = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await User.findOne({ where: { email,password } });

    if (!result) {
      return res.status(404).json({ message: "Email não encontrado" });
    }

    const token = generateAccessToken(email, password);

    res.json({
      message: "Usuario logado com sucesso",
      data: result,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: message.serverError });
  }
};

export default refleshToken;
