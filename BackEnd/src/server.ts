import express from "express";
import dotenv from "dotenv";
import path from "path";
import MainRoutes from "./routes/index";
import cors from "cors";
import http from 'http'
import {Server} from 'socket.io'

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(express.static(path.join(__dirname, "./uploads")));

server.use(MainRoutes);

server.use((req, res) => {
  res.status(404).send("Página não encontrada");
});



const serverHTTP = http.createServer(server);

serverHTTP.listen(process.env.PORT);
console.log("A porta é:", process.env.PORT);

export const io = new Server(serverHTTP, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  console.log('teste');

});