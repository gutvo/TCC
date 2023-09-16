import { Router } from "express";
import animalRoutes from "./animals/routes";
import userRoutes from "./users/routes";
import generateTokenKey from "../validations/token/generatorKey";
import ongRoutes from "./ongs/routes";
import ListCity from "../controllers/city/list";
import { upload } from "../multer/config";
// import validateSequelize from "../validations/sequelize/sequelize";
const mainRoutes = Router();

// Pega todas as cidades registradas
mainRoutes.get('/city',ListCity)


// mainRoutes.use(validateSequelize);
mainRoutes.use(upload.single('imageData'))

// rotas dos animais
mainRoutes.use(animalRoutes);

// rotas dos usuários
mainRoutes.use(userRoutes);

// rotas das Organização

mainRoutes.use(ongRoutes)

// Gerador de chaves para o .env
mainRoutes.route("/generatekey").get(generateTokenKey);

export default mainRoutes;
