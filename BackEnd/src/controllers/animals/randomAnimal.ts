import { Request, Response } from 'express'
import { Animal } from '../../models/animals/animal'
import { message } from '../../dictionary'
import { sequelize } from '../../migrations/mysql'
import { Op } from 'sequelize'

const randomAnimal = async (req: Request, res: Response) => {
  try {
    const city = req.query.city as string

    const result = await Animal.findAll({
      where: {
        situation: 'available',
        image: { [Op.not]: null },
      },
      include: {
        association: 'ongData',
        where: { city },
      },
      order: sequelize.random(),
      limit: 4,
    })
    res.json({ data: result })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}

export default randomAnimal
