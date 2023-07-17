import { Request, Response } from "express";

const generateTokenKey = (req: Request, res: Response) => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  const tamanho = 70;
  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    token += caracteres.charAt(indiceAleatorio);
  }

  return res.send(token);
};

export default generateTokenKey;
