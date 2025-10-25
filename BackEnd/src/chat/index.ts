import { serverHTTP } from '../server'
import { Server, type Socket } from 'socket.io'
// import { Message } from '../database/models/chats/messages'
// import roomsServices from '@Services/rooms'
// import MessagesServices from '@Services/messages'

type SocketProps = {
  userId?: string
  userName?: string
  type?: 'user' | 'ong'
} & Socket

interface roomsProps {
  id: string
  name: string
  ongData?: { email: string, name: string }
  userData?: { email: string, name: string }
  receiver: number
  sender: number
}

interface MessageProps {
  id: string
  email: string
  message: string
  room: string
}

export function chat () {
  const io = new Server(serverHTTP, {
    cors: {
      origin: '*'
    }
  })

  io.use((socket: SocketProps, next) => {
    const { userId, userName, type } = socket.handshake.auth

    if (userId === undefined && type === undefined && userName === undefined) {
      next(new Error('Erro ao conectar no chat')); return
    }
    socket.userId = userId
    socket.userName = userName
    socket.type = type
    next()
  })

  io.on('connection', async (socket: SocketProps) => {
    // const { userId, type } = socket
    // await socket.join(`notifications${userId}`)

    // socket.onAny((data, ...args) => {
    //   console.log(data, args)
    // })

    socket.on('rooms', async () => {
      const rooms: Array<{
        id: number
        name: string
        ongData?: { email: string, name: string }
        receiver: number
        sender: number
      }> = []

      // const { result } = await roomsServices.listService({ id: userId, type })

      // result.map(item => rooms.push(item.dataValues))

      socket.emit('rooms', rooms)
    })

    socket.on('join.room', async (room: roomsProps) => {
      await socket.join(room.name)

      if (room !== null) {
        // const message = await Message.findAll({ where: { roomId: room.id } })
        // socket.emit('get.messages', message)
      }
    })

    socket.on('leave.room', async (room: roomsProps) => {
      await socket.leave(room.name)
    })

    socket.on('send.message', async (message: MessageProps, room: roomsProps) => {
      // const { result } = await MessagesServices.createService({ message, roomId: room.id })

      // io.to(room.name).emit('message.response', result)
    })

    socket.on('create.room', async data => {
      // const { userId, ongId } = data

      // const name = `${userId} - ${ongId}`
      // const { room } = await roomsServices.findOrCreateService({ name, receiver: ongId, sender: userId })

      // socket.emit('create.room', room)
    })

    socket.on('get.messages', async (room: roomsProps) => {
      if (room !== null) {
        // const { data } = await MessagesServices.listService({ id: room.id })
        // socket.emit('get.messages', data)
      }
    })

    // socket.on('notifications', id => {
    // socket.to(`notifications${id}`).emit('get.notifications', userId)
    // })

  // socket.on('disconnect',()=>{
  //   console.log('user disconnected')
  // })
  })
}
