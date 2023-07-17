import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";

const signInUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await User.findOne({ where: { email } });

    if (!result) {
      return res.json("Email não encontrado");
    }

    const comparation = await bcrypt.compare(password, result.password);

    if (!comparation) {
      return res.status(400).json("Senha incorreta");
    }
    const token = generateAccessToken(email, password);

    res.json({ message: "Usuario logado com sucesso", token: token });
  } catch (error) {
    res.status(500).json(error);
  }
};

function generateAccessToken(username: string, userpassword: String) {
  return jwt.sign(
    { name: username, password: userpassword },
    process.env.TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );
}

export default signInUser;
