import express from "express";
import dotenv from "dotenv";
import path from "path";
import MainRoutes from "./routes/index";
import cors from "cors";
dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(express.static(path.join(__dirname, "../public")));

server.use(MainRoutes);

server.use((req, res) => {
  res.status(404).send("Página não encontrada");
});

server.listen(process.env.PORT);
console.log("A porta é:", process.env.PORT);
