import { Request, Response } from 'express'
import { User } from '../../models/users/user'
import { message } from '../../dictionary'

const Show = async (req: Request, res: Response) => {
  try {
    const id = req.query.id

    const result = await User.findOne({
      where: { id },
      include: {
        association: 'ongData',
        required: true,
        include: [{ association: 'phoneData' }],
      },
    })

    if (!result) {
      return res.status(404).json({ message: message.userNotFound })
    }

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}

export default Show
