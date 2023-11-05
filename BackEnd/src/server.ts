import express from "express";
import dotenv from "dotenv";
import path from "path";
import MainRoutes from "./routes/index";
import cors from "cors";
import http from 'http'
import {Server,Socket} from 'socket.io'
import { Message } from "./models/chats/messages";
import { Room } from "./models/chats/rooms";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(express.static(path.join(__dirname, "./uploads")));

server.use(MainRoutes);

server.use((req, res) => {
  res.status(404).send("Página não encontrada");
});

// ------------------------------------------------------------------
// Código do chat

interface SocketProps extends Socket {
  userId?: number;
}

const serverHTTP = http.createServer(server);

serverHTTP.listen(process.env.PORT);

export const io = new Server(serverHTTP, {
  cors: {
    origin: '*',
  },
});

io.use((socket: SocketProps,next)=>{
  const userId = socket.handshake.auth.userId
  if(!userId){
    return next(new Error("Email inválido"))
  }
  socket.userId = userId
  next()
})

io.on('connection', async(socket:SocketProps) => {
  console.log(`User connected ${socket.userId}`);

  // const room = await Room.findOne({where:{userId:socket.userId}})

  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      id: id,
      userId: (socket as any).userId,
    });
  }
  socket.emit("users", users);

  socket.onAny((data)=>{
    console.log(data)
  })
  socket.on('chat.message',(message)=>{
    console.log('chat.message => ',message)
    
    io.emit('message.response',message)
  })
  socket.on('disconnect',()=>{
    console.log('user disconnected')
  })

  socket.on('get.messages',async()=>{
    const room = await Room.findOne({where:{userId:socket.userId}})
    if(room){
      const message = await Message.findAll({where:{roomId:room.id}})
      io.emit('get.messages',message)
    }else{
      io.emit('get.messages','Sem mensagens')
    }

  })

});