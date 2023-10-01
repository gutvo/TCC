import { Request, Response } from "express";
import path from "path";
import { message } from "../../dictionary";
import { User } from "../../models/users/user";

const showImage = async (req: Request, res: Response) => {
  try {
    const result = await User.findOne({ where: { email: req.params.email } });
    

    if (!result) {
      return res
        .status(404)
        .json({ message: message.userNotFound });
    }
    if (!result.image) {
      return res.status(404).json({ message: message.ImageNotFound });
    }

    const imagePath = path.join(
      __dirname,
      `../../images/users/${result.image}`
    );
    res.sendFile(imagePath, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    res.status(500).json({message:message.serverError});
  }
};

export default showImage;
