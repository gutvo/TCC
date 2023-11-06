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
import randomAnimal from "../../controllers/animals/randomAnimal";
import ListAdoptedAnimals from "../../controllers/animals/listAdoptedAnimals";
import ShowAdoptedAnimal from "../../controllers/animals/showAdoptedAnimal";

const animalRoutes = Router();

animalRoutes
  .route("/animal")
  .get(listAnimal)
  .post(validateToken,createValidation,Create)
  .delete(validateToken, deleteValidator, Delete)
  .put(validateToken, updateValidation, Update);

animalRoutes.route("/animal/:id").get(Show);

animalRoutes.route("/animal/images/:id").get(showImageAnimal);

animalRoutes.route("/random/animal").get(randomAnimal);

animalRoutes.route("/adopted/animal").get(validateToken, ListAdoptedAnimals);

animalRoutes.route("/adopted/animal/:id").get(validateToken, ShowAdoptedAnimal);


export default animalRoutes;
