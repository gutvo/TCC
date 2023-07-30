import { Request, Response } from "express";
import { Animal } from "../../models/animal";
import path from "path";
import fs from "fs";

export interface animalData {
  id: number;
  name: string;
  race: string;
  color: string;
  sex: "Macho" | "Fêmea";
  description: string;
  type: "Cachorro" | "Peixe" | "Gato" | "Outros";
  birthday: number;
  image: boolean;
  imageData: FileList;
}

const Create = async (req: Request, res: Response) => {
  try {
    const data: animalData = req.body.data;

    const animal = Animal.build({
      name: data.name,
      race: data.race,
      color: data.color,
      sex: data.sex,
      type: data.type,
      description: data.description,
      birthday: data.birthday,
      image: data.image,
    });

    await animal.save();

    if (data.image) {
      const imagePath = `pet${animal.id}.jpg`;

      const imageBuffer = Buffer.from("imagesData", "base64");

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
