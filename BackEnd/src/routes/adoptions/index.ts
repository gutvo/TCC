import { Router } from "express";
import Create from "../../controllers/adoptions/create";
import validateToken from "../../validations/token/token";
import createValidation from "../../validations/adoptions/create";
import List from "../../controllers/adoptions/list";
import Adopt from "../../controllers/adoptions/adopt";
import Delete from "../../controllers/adoptions/delete";
import deleteValidation from "../../validations/adoptions/delete";

const adoptionRoutes = Router();

adoptionRoutes
  .route("/adoption")
  .all(validateToken)
  .post(createValidation,Create)
  .get(List)
  .put(Adopt)
  .delete(deleteValidation,Delete)


export default adoptionRoutes;
