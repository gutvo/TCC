import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function encrypt (password: string) {
  const saltRounds = 14
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(password, salt)
}

export function generateAccessToken (username: string, userpassword: string) {
  const tokenSecret = process.env.TOKEN_SECRET

  if (tokenSecret !== undefined) {
    return jwt.sign(
      { name: username, password: userpassword },
      tokenSecret,
      { expiresIn: '10h' }
    )
  }
}
