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
import deleteUserValidation from "../../validations/users/detele";
import Show from "../../controllers/users/show";
import refleshToken from "../../controllers/users/refleshToken";
import refleshTokenValidation from "../../validations/users/create";
import showUserValidation from "../../validations/users/show";
import listOng from "../../controllers/ongs/list";

const userRoutes = Router();

userRoutes
  .route("/user")
  .post(createUserValidation, encryptPassword, Create)
  .put(validateToken, updateUserValidation, Update)
  .delete(validateToken, deleteUserValidation, Delete)
  .get(validateToken, showUserValidation, Show);

  userRoutes.get('/ong',listOng)

userRoutes.post("/refleshtoken", refleshTokenValidation, refleshToken);

userRoutes.route("/user/login").post(userLoginValidation, login);

export default userRoutes;
