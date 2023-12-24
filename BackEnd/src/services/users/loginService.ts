import bcrypt from 'bcrypt'
import { User } from '../../models/users/user'
import { encrypt, generateAccessToken } from '../../functions'
import { message } from '../../teste'

interface LoginServiceProps {
  email: string
  password: string
}

export default async function loginService ({ email, password }: LoginServiceProps) {
  const result = await User.findOne({
    where: { email },
    include: { association: 'ongData' }
  })

  if (result === null) {
    return { message: message.emailOrPasswordUser, status: 404 }
  }

  const comparation = await bcrypt.compare(password, result.password)

  if (!comparation) {
    return { message: message.emailOrPasswordUser, status: 404 }
  }

  const encryptPassword = encrypt(password)

  const token = generateAccessToken(email, encryptPassword)

  const name = result.name.split(' ')[0]

  return {
    message: `Bem vindo ${name}!`,
    data: result,
    token,
    status: 200
  }
}
