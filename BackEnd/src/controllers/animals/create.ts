import { Request, Response } from "express";
import { Animal } from "../../models/animal";
import path from "path";
import fs from "fs";

const Create = async (req: Request, res: Response) => {
  try {
    const imagemBase64 = req.body.imagem as string;

    const animal = Animal.build({
      name: req.body.name,
      race: req.body.race,
      color: req.body.color,
      sex: req.body.sex,
      type: req.body.type,
      description: req.body.description,
      birthday: req.body.birthday,
      image: imagemBase64 ? true : false,
    });

    await animal.save();

    if (imagemBase64) {
      const imagePath = `pet${animal.id}.jpg`;

      const imageBuffer = Buffer.from(imagemBase64, "base64");

      const destinationPath = path.join(
        __dirname,
        `../../images/animals/${imagePath}`
      );

      fs.writeFileSync(destinationPath, imageBuffer);
    }

    res.status(201).json({ message: "Animal Cadastrado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default Create;
