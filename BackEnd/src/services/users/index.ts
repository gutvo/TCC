import createService from "./createService";
import deleteService from "./deleteService";
import loginService from "./loginService";
import refreshTokenService from "./refreshTokenService";
import showService from "./showService";
import showAdoptationService from "./showAdoptationService";
import showImageService from "./showImageService";
import updateService from "./updateService";

const usersServices = {
  createService,
  deleteService,
  loginService,
  refreshTokenService,
  showService,
  showAdoptationService,
  showImageService,
  updateService,
};

export default usersServices;
