import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

const animalSchema = yup.object().shape({
  id: yup.number().required("ID é obrigatório"),
});

const deleteValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await animalSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default deleteValidator;
