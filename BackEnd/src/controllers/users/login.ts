import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../../models/users/user'
import jwt from 'jsonwebtoken'
import { encrypt } from '../../functions'
import { message } from '../../dictionary'

const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const result = await User.findOne({
      where: { email },
      include: { association: 'ongData' },
    })

    if (!result) {
      return res.status(404).json({ message: message.emailOrPasswordUser })
    }

    const comparation = await bcrypt.compare(password, result.password)

    if (!comparation) {
      return res.status(400).json({ message: message.emailOrPasswordUser })
    }

    const encryptPassword = encrypt(password)

    const token = generateAccessToken(email, encryptPassword)

    const name = result.name.split(' ')[0]
    res.json({
      message: `Bem vindo ${name}!`,
      data: result,
      token: token,
    })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}

function generateAccessToken(username: string, userpassword: string) {
  return jwt.sign(
    { name: username, password: userpassword },
    process.env.TOKEN_SECRET as string,
    { expiresIn: '10h' },
  )
}

export default login
