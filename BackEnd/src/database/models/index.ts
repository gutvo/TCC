import { User } from './User'
import { Phone } from './Phone'
import { UserPhone } from './UserPhone'
import { sequelize } from 'database'

const models = { User, Phone, UserPhone }

Object.values(models).forEach((model: any) => {
  if (typeof model.associate === 'function') {
    model.associate(models)
  }
})

export async function syncDatabase ({ force = false, alter = true } = {}) {
  await sequelize.sync({ force, alter })
}

export { User, Phone, UserPhone }
