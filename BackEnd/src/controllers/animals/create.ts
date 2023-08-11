import { Request, Response } from "express";
import { Animal } from "../../models/animal";
import path from "path";
import fs from "fs";

interface animalData {
  name: string;
  race: string;
  color: string;
  sex: "Macho" | "Fêmea";
  description: string;
  type: "Cachorro" | "Peixe" | "Gato" | "Outros";
  birthday: number;
  image: boolean;
  imageData: FileList;
  ongId:number
}

const Create = async (req: Request, res: Response) => {
  try {
    const {name,race,birthday,color,description,image,ongId,sex,type}: animalData = req.body.data;
    const animal = await Animal.create({
      name,
      race,
      color,
      sex,
      type,
      description,
      birthday,
      image,
      ongId
    });
    console.log(animal)
    if (image) {
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

    res.status(500).json({message: 'Erro no servidor'});
  }
};

export default Create;
