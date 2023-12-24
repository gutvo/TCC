import { Adoption } from '../../models/adoptions/adoptions'
import { message } from '../../dictionary'
import { Animal } from '../../models/animals/animal'
import { Op } from 'sequelize'
import { User } from '../../models/users/user'

async function adoptService (adoptionId: string) {
  const adopted = await Adoption.findOne({ where: { id: adoptionId } })

  if (adopted === null) {
    return { message: message.adoptedNotExists, status: 404 }
  }

  const animal = await Animal.findOne({ where: { id: adopted.animalId } })

  if (animal === null) {
    return { message: message.animalNotFound, status: 404 }
  }

  const user = await User.findOne({ where: { id: adopted.userId } })

  if (user === null) {
    return { message: message.userNotFound, status: 404 }
  }

  await adopted.update({
    userName: user.name,
    userEmail: user.email,
    confirm: true
  })

  await animal.update({
    situation: 'adopted',
    updatedAt: new Date()
  })

  await Adoption.destroy({
    where: {
      animalId: adopted.animalId,
      userId: { [Op.not]: adopted.userId }
    }
  })

  return { message: message.adoptedSuccess, status: 200 }
}

export default adoptService
