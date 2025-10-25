import User from './User'
import Phone from './Phone'
import { UserPhone } from './UserPhone'

export const models = { User, Phone, UserPhone }

Object.values(models).forEach((model: any) => {
  if (typeof model.associate === 'function') {
    model.associate(models)
  }
})
