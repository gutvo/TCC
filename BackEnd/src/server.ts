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
  userName?:string;
  type?:string
}
interface roomsProps {
  id: number
  name: string
  ongData?: { email: string; name: string }
  userData?: { email: string; name: string }
  receiver: number
  sender: number
}

export interface MessageProps {
  id: number;
  email:string
  message:string
  room:string
}

const serverHTTP = http.createServer(server);

serverHTTP.listen(process.env.PORT);

export const io = new Server(serverHTTP, {
  cors: {
    origin: '*',
  },
});

io.use((socket: SocketProps,next)=>{
  const {userId,userName,type} = socket.handshake.auth
  if(!userId && !type && !userName){
    return next(new Error("Erro ao conectar no chat"))
  }
  socket.userId = userId
  socket.userName = userName
  socket.type = type
  next()
})

io.on('connection', async(socket:SocketProps) => {
  const { userId, type } = socket
  socket.join(`notifications${userId}`)

  /*
    socket.onAny((data,...args)=>{
    console.log(data, args)
  })  socket.onAny((data,...args)=>{
    console.log(data, args)
  })
  */

  socket.on('rooms',async()=>{
    const rooms: {
      id: number
      name: string
      ongData?: { email: string; name: string }
      receiver: number
      sender: number
    }[] = [];

    if(type==='user'){
      const result = await Room.findAll({where:{sender:userId},include:[{association:'ongData', attributes:['id','email','name','image'],as:'userData'}]})
      result.map((item)=>{
        rooms.push(item.dataValues)
      })
    }else{
      const result = await Room.findAll({where:{receiver:userId},include:[{association:'userData', attributes:['id','email','name','image']}]})
      result.map((item)=>{
        rooms.push(item.dataValues)
      })
    }
    socket.emit('rooms.response', rooms);
  })

  socket.on('join.room',async(room:roomsProps)=>{
      socket.join(room.name)

      if(room){
        const message = await Message.findAll({where:{roomId:room.id}})
        socket.emit('get.messages',message)
      }
  })

  socket.on('leave.room',(room:roomsProps)=>{
    socket.leave(room.name)
})


  socket.on('send.message',async(message:MessageProps,room:roomsProps)=>{ 
    await Message.create({
      email:message.email,
      message:message.message,
      roomId:room.id
    })
    io.to(room.name).emit('message.response',message)
  })

  socket.on('create.room',async(data)=>{
    const {userId,ongId} = data

    const name = `${userId} - ${ongId}`
    const [room] = await Room.findOrCreate({where:{name,sender:userId,receiver:ongId}})
    socket.emit('create.room', room)
  })



  socket.on('get.messages',async(room:roomsProps)=>{
    if(room){
      const message = await Message.findAll({where:{roomId:room.id}})
      socket.emit('get.messages',message)
    }
  })

  socket.on('notifications',(id)=>{
    socket.to(`notifications${id}`).emit('get.notifications',userId)
  })


  // socket.on('disconnect',()=>{
  //   console.log('user disconnected')
  // })
});