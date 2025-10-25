// import { Adoption } from '../../database/models/adoptions/adoptions'
// import { Animal } from '../../database/models/animals/animal'
// import { Op } from 'sequelize'
// import { User } from '../../database/models/User'
// import translate from '@Dictionary'

async function adoptService(adoptionId: string) {
  // const adopted = await Adoption.findOne({ where: { id: adoptionId } })
  // if (adopted === null) {
  //   return { message: translate({ id: 'adoptions-adopted-not-found' }), status: 404 }
  // }
  // const animal = await Animal.findOne({ where: { id: adopted.animalId } })
  // if (animal === null) {
  //   return { message: translate({ id: 'adoptions-animal-not-found' }), status: 404 }
  // }
  // const user = await User.findOne({ where: { id: adopted.userId } })
  // if (user === null) {
  //   return { message: translate({ id: 'adoptions-user-not-found' }), status: 404 }
  // }
  // await adopted.update({
  //   userName: user.name,
  //   userEmail: user.email,
  //   confirm: true
  // })
  // await animal.update({
  //   situation: 'adopted',
  //   updatedAt: new Date()
  // })
  // await Adoption.destroy({
  //   where: {
  //     animalId: adopted.animalId,
  //     userId: { [Op.not]: adopted.userId }
  //   }
  // })
  // return { message: translate({ id: 'adoptions-adopted-success' }), status: 200 }
}

export default adoptService;
