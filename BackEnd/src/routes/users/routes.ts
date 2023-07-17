import { Router } from "express";
import Create from "../../controllers/users/create";
import signInUser from "../../controllers/users/signIn";
import createUserValidation from "../../validations/users/create";
import userSignInValidation from "../../validations/users/signIn";
import updateUserValidation from "../../validations/users/update";
import encryptPassword from "../../controllers/users/encrypt";
import validateToken from "../../validations/token/token";
import Update from "../../controllers/users/update";
import Delete from "../../controllers/users/delete";
import deleteShowUserValidation from "../../validations/users/deteleShow";
import Show from "../../controllers/users/show";
const userRoutes = Router();

userRoutes
  .route("/user")
  .post(createUserValidation, encryptPassword, Create)
  .put(validateToken, updateUserValidation, encryptPassword, Update)
  .delete(validateToken, deleteShowUserValidation, Delete)
  .get(deleteShowUserValidation, validateToken, Show);

userRoutes.route("/user/signin").post(userSignInValidation, signInUser);

export default userRoutes;
