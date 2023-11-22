import { Request, Response } from 'express'
import { message } from '../../dictionary'
import { Op } from 'sequelize'
import { Adoption } from '../../models/adoptions/adoptions'

type animalFilterProps = {
  race?: string[]
  type?: 'Todos' | 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  sex?: 'Todos' | 'Macho' | 'Fêmea'
  city?: string
}

const ListAdoptedAnimals = async (req: Request, res: Response) => {
  try {
    const offset = parseInt(req.query.offset as string)
    const limit = parseInt(req.query.limit as string)
    const ongId = parseInt(req.query.ongId as string)

    let filter: animalFilterProps | undefined

    if (typeof req.query.filter === 'object') {
      filter = req.query.filter as animalFilterProps
    }

    const where: { [Op.and]: unknown[] } = {
      [Op.and]: [],
    }

    if (ongId) {
      where[Op.and].push({ ongId })
    }

    if (filter) {
      if (filter?.race?.length) {
        where[Op.and].push({ race: { [Op.in]: filter.race } })
      }
      if (filter?.sex?.length && filter.sex !== 'Todos') {
        where[Op.and].push({ sex: filter.sex })
      }
      if (filter?.type?.length && filter.type !== 'Todos') {
        where[Op.and].push({ type: filter.type })
      }
    }

    const { rows, count } = await Adoption.findAndCountAll({
      include: [
        {
          association: 'animalData',
          where: { ...where, situation: 'adopted' },
          include: [
            {
              association: 'ongData',
            },
          ],
        },
        {
          association: 'animalData',
        },
      ],
      offset,
      limit,
    })

    res.json({
      data: rows,
      pagination: {
        offset,
        count,
        limit,
      },
    })
  } catch (error) {
    res.status(500).json({ message: message.serverError })
  }
}

export default ListAdoptedAnimals
