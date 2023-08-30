import { Router } from "express";
import listOng from "../../controllers/ongs/list";
import showOng from "../../controllers/ongs/show";

const ongRoutes = Router();

ongRoutes.get('/ongs',listOng)

ongRoutes.get('/ong',showOng)

export default ongRoutes;
