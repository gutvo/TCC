import { User } from '../../models/users/user'
import { generateAccessToken } from '../../functions'

interface RefreshTokenServiceProps {
  email: string
  password: string
}

export default async function refreshTokenService ({ email, password }: RefreshTokenServiceProps) {
  const result = await User.findOne({ where: { email, password } })

  if (result === null) {
    return { message: 'Email não encontrado', status: 404 }
  }

  const token = generateAccessToken(email, password)

  return {
    message: 'Usuario logado com sucesso',
    data: result,
    token,
    status: 200
  }
}
