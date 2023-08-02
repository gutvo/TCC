import { Router } from "express";
import Create from "../../controllers/users/create";
import login from "../../controllers/users/login";
import createUserValidation from "../../validations/users/create";
import userLoginValidation from "../../validations/users/login";
import updateUserValidation from "../../validations/users/update";
import encryptPassword from "../../controllers/users/encrypt";
import validateToken from "../../validations/token/token";
import Update from "../../controllers/users/update";
import Delete from "../../controllers/users/delete";
import deleteShowUserValidation from "../../validations/users/deteleShow";
import Show from "../../controllers/users/show";
import refleshToken from "../../controllers/users/refleshToken";
const userRoutes = Router();

userRoutes
  .route("/user")
  .post(createUserValidation, encryptPassword, Create)
  .put(validateToken, updateUserValidation, encryptPassword, Update)
  .delete(validateToken, deleteShowUserValidation, Delete)
  .get(deleteShowUserValidation, validateToken, Show);

userRoutes.post("/refleshtoken", refleshToken);

userRoutes.route("/user/login").post(userLoginValidation, login);

export default userRoutes;
