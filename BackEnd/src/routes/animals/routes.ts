import { Router } from "express";
import showImageAnimal from "../../controllers/animals/showImage";
import listAnimal from "../../controllers/animals/list";
import Create from "../../controllers/animals/create";
import createValidation from "../../validations/animals/create";
import validateToken from "../../validations/token/token";
import Delete from "../../controllers/animals/delete";
import deleteValidator from "../../validations/animals/delete";
import Show from "../../controllers/animals/show";
import updateValidation from "../../validations/animals/update";
import Update from "../../controllers/animals/update";

const animalRoutes = Router();

animalRoutes
  .route("/animal")
  .get(listAnimal)
  .post(validateToken,function uploadFiles(req, res,next) {
    // console.log(req.body);
    // console.log(req.files);
    next()
}, createValidation,Create)
  .delete(validateToken, deleteValidator, Delete)
  .put(validateToken, updateValidation, Update);

animalRoutes.route("/animal/:id").get(Show);

animalRoutes.route("/animal/images/:id").get(showImageAnimal);

export default animalRoutes;
