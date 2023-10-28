import { Router } from "express";
import RescuedAdoptedAnimal from "../../controllers/reports/rescuedAdoptedAnimal";

const reportRoutes = Router();

reportRoutes.get('/rescuedAdoptedAnimal', RescuedAdoptedAnimal)


export default reportRoutes;
