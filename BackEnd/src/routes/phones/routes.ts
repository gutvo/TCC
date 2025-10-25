import { Router } from "express";
import createPhoneValidation from "../../validations/phones/create";
import updtatePhoneValidation from "../../validations/phones/update";
import DeletePhoneValidations from "../../validations/phones/delete";
import validateToken from "@Validations/tokens/token";
import phonesControllers from "@Controllers/phones";

const phonesRoutes = Router();

phonesRoutes
  .route("/phone")
  .all(validateToken)
  .post(createPhoneValidation, phonesControllers.createController)
  .delete(DeletePhoneValidations, phonesControllers.deleteController)
  .put(updtatePhoneValidation, phonesControllers.updateController);

export default phonesRoutes;
