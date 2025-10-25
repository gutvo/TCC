// import { Room } from '@Models/chats/rooms'

interface FindOrCreateServiceProps {
  name: string;
  sender: string;
  receiver: string;
}

export default async function findOrCreateService({
  name,
  sender,
  receiver,
}: FindOrCreateServiceProps) {
  // const [room] = await Room.findOrCreate({
  //   where: { name, sender, receiver }
  // })
  // return { room }
}
