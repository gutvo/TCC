// import { Message } from '@Models/chats/messages'

interface MessageProps {
  id: string
  email: string
  message: string
  room: string
}

interface CreateServiceProps {
  message: MessageProps
  roomId: string
}

export default async function createService ({ message, roomId }: CreateServiceProps) {
  // const result = await Message.create({
  //   email: message.email,
  //   message: message.message,
  //   roomId
  // })

  // return { result }
}
