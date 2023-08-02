import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import { encrypt } from "../../functions";

const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await User.findOne({ where: { email } });

    if (!result) {
      return res.status(404).json({ message: "Email não encontrado" });
    }

    const comparation = await bcrypt.compare(password, result.password);

    if (!comparation) {
      return res.status(400).json({ message: "Senha incorreta" });
    }
    const encryptPassword = encrypt(password);
    const token = generateAccessToken(email, encryptPassword);

    res.json({
      message: "Usuario logado com sucesso",
      data: result,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

function generateAccessToken(username: string, userpassword: String) {
  return jwt.sign(
    { name: username, password: userpassword },
    process.env.TOKEN_SECRET as string,
    { expiresIn: "10h" }
  );
}

export default login;
