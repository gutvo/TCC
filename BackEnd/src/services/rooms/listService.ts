// import { Room } from '@Models/chats/rooms'
import { Op } from "sequelize";

interface ListServiceProps {
  id?: string;
  type?: "user" | "ong";
}

export default async function listService({ id, type }: ListServiceProps) {
  // const name = type === 'user' ? 'userData' : 'ongData'
  const where: { [Op.and]: unknown[] } = {
    [Op.and]: [],
  };

  if (type === "user") {
    where[Op.and].push({ sender: id });
  } else {
    where[Op.and].push({ receiver: id });
  }

  // const result = await Room.findAll({
  //   where,
  //   include: [
  //     {
  //       association: 'ongData',
  //       as: name,
  //       attributes: ['id', 'email', 'name', 'image']
  //     }
  //   ]
  // })

  // return { result }
}
