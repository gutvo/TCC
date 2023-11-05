import { Router } from "express";
import ListChat from "../../controllers/chat/listUsers";

const chatRoutes = Router();

chatRoutes
  .route("/chat")
  .get(ListChat)

export default chatRoutes;
