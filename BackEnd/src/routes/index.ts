import { Router } from "express";
import animalRoutes from "./animals/routes";
import userRoutes from "./users/routes";
import generateTokenKey from "../validations/token/generatorKey";
const mainRoutes = Router();

// rotas dos animais
mainRoutes.use(animalRoutes);

// rotas dos usuários
mainRoutes.use(userRoutes);

// Gerador de chaves para o .env
mainRoutes.route("/generatekey").get(generateTokenKey);

export default mainRoutes;
