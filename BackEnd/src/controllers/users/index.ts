import createController from "./createController";
import deleteController from "./deleteController";
import encryptPassword from "./encryptPassword";
import loginController from "./loginController";
import refreshTokenController from "./refreshTokenController";
import showAdoptationController from "./showAdoptationController";
import showController from "./showController";
import showImageController from "./showImageController";
import updateController from "./updateController";

const usersControllers = {
  createController,
  deleteController,
  encryptPassword,
  loginController,
  refreshTokenController,
  showAdoptationController,
  showController,
  showImageController,
  updateController,
};

export default usersControllers;
