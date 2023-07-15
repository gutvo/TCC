import { Request, Response } from 'express'
import { findAllPets } from '../models/animals'
import { sequelize } from '../instances/mysql'
export const animais = async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate()

    // definir as configurações de paginação
    const pagina = parseInt(req.query.pagina as string) || 1
    const limite = parseInt(req.query.limite as string) || 8
    const filter = (req.query.filtro as string) || ''
    // buscar os animais com as configurações de paginação
    const { rows, count } = await findAllPets(pagina, limite, filter)

    // retornar os resultados da consulta com as informações de paginação
    res.json({
      animais: rows,
      pagina_atual: pagina,
      total_resultados: count,
      total_paginas: Math.ceil(count / limite),
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Ocorreu um erro ao buscar informações dos animais.')
  }
}
