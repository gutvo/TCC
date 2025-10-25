import User from '../../database/models/User'
import { generateAccessToken } from '../../functions'
import translate from '@Dictionary'

interface RefreshTokenServiceProps {
  email: string
  password: string
}

export default async function refreshTokenService ({ email, password }: RefreshTokenServiceProps) {
  const result = await User.findOne({ where: { email, password } })

  if (result === null) {
    return { message: translate({ id: 'users-user-not-found' }), status: 404 }
  }

  const token = generateAccessToken(email, password)

  return {
    message: translate({ id: 'users-refrese-token-success' }),
    data: result,
    token,
    status: 200
  }
}
