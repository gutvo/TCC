import { Request, Response } from "express";
import { Animal } from "../../models/animals/animal";
import path from "path";
import fs from "fs";
import { message } from "../../dictionary";

interface animalData {
  name: string;
  race: string;
  color: string;
  sex: "Macho" | "Fêmea";
  description: string;
  type: "Cachorro" | "Peixe" | "Gato" | "Outros";
  birthday: number;
  image: boolean|string;
  imageData: File;
  ongId:number
}

const Create = async (req: Request, res: Response) => {
  try {
    const {name,race,birthday,color,description,image,ongId,sex,type}: animalData = req.body.data;
    
    const result = await Animal.create({
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

    const imageData = req.body.image

    if (imageData) {

      const imagePath = `pet${result.id}.jpg`;

      const imageBuffer = Buffer.from(imageData, "base64");

      const destinationPath = path.join(
        __dirname,
        `../../images/animals/${imagePath}`
      );
      fs.writeFileSync(destinationPath,imageBuffer);
    }

    res.status(201).json({ message: message.createAnimalSuccess});
  } catch (error) {
    console.log(error)

    res.status(500).json({message: message.serverError});
  }
};

export default Create;
