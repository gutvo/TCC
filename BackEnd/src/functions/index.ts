import bcrypt from 'bcrypt'
import { type Request, type Response } from 'express'
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

export function generateTokenKey (req: Request, res: Response) {
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  const tamanho = 70
  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
    token += caracteres.charAt(indiceAleatorio)
  }

  return res.send(token)
}
