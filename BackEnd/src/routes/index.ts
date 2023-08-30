import { Router } from "express";
import animalRoutes from "./animals/routes";
import userRoutes from "./users/routes";
import generateTokenKey from "../validations/token/generatorKey";
import upload from '../multer/config'
import ongRoutes from "./ongs/routes";
// import validateSequelize from "../validations/sequelize/sequelize";
const mainRoutes = Router();

// mainRoutes.use(validateSequelize);
mainRoutes.use(upload.array('imageData'))

// rotas dos animais
mainRoutes.use(animalRoutes);

// rotas dos usuários
mainRoutes.use(userRoutes);

// rotas das Organização

mainRoutes.use(ongRoutes)

// Gerador de chaves para o .env
mainRoutes.route("/generatekey").get(generateTokenKey);

export default mainRoutes;
