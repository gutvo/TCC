import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

const getFormatedDate = (currentDate: String) => {
  return currentDate.split("/").reverse().join("-");
};

const animalSchema = yup.object().shape({
  id: yup.number().required("O ID é obrigatório"),
  name: yup.string().required("O nome é obrigatório"),
  race: yup.string().required("A raça é obrigatória"),
  color: yup.string().required("A Cor é obrigatória"),
  type: yup
    .string()
    .oneOf(
      ["Cachorro", "Peixe", "Gato", "Outros"],
      "Os valores do tipo devem ser apenas Chachorro, Peixe, Gato, Outros"
    )
    .required("O tipo é obrigatório"),
  sex: yup
    .string()
    .oneOf(
      ["Macho", "Fêmea"],
      "Os valores do sexo devem ser apenas Macho ou Fêmea"
    )
    .required("O sexo é obrigatório"),
  birthday: yup
    .date()
    .min(getFormatedDate("01/01/1900"), "O ano deve ser maior que 1900")
    .max(
      getFormatedDate(new Date().toLocaleDateString()),
      "Não coloque uma data futura"
    )
    .required("A data de nascimento é obrigatória"),
});

const updateValidation = async (
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

export default updateValidation;
