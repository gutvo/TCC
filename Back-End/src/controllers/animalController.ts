import { Request, Response } from 'express'
import { Pets, findAllPets } from '../models/animals'
import { sequelize } from '../instances/mysql'
import path from 'path'
import fs from 'fs'

interface PetData {
  id?: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description:  string,
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'outros'
  birthday: number
  image: boolean
}

export const getAnimais = async (req: Request, res: Response) => {
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

export const getImgAnimal = (req: Request, res: Response) => {
  const id = req.params.id
  const imagePath = path.join(__dirname, `../images/animals/pet${id}.jpg`)
  res.sendFile(imagePath, {
    headers: {
      'Content-Type': 'image/jpeg', // Defina o tipo MIME correto para a imagem
    },
  })
}

export const insertAnimal = async (req: Request, res: Response) => {
  try {
    let animalData:PetData={
      name: req.body.name,
      race: req.body.race,
      color: req.body.color,
      sex: req.body.sex,
      type: req.body.type,
      description: req.body.description,
      birthday: parseInt(req.body.birthday),
      image:false
    }
    
    if (req.body.imagem) {
      animalData = {
        ...animalData,
        image: true,
      };

    const imagemBase64 = req.body.imagem as string // Recebe a imagem em formato base64

    const animal = Pets.build({
      name:animalData.name,
      race:animalData.race,
      color:animalData.color,
      sex:animalData.sex,
      type:animalData.type,
      description:animalData.description,
      birthday:animalData.birthday,
      image:animalData.image
    })
    await animal.save()
    const animalInserido = await Pets.findOne({ where: { id: animal.id } })
    if (animalInserido) {
      const animalId = animalInserido.id
      const imagePath = `pet${animalId}.jpg`
      const imageBuffer = Buffer.from(imagemBase64, 'base64')
      const destinationPath = path.join(__dirname,'../images/animals/',imagePath)
      fs.writeFileSync(destinationPath, imageBuffer)
    }
    }else{
        const animal = Pets.build({
          name:animalData.name,
          race:animalData.race,
          color:animalData.color,
          sex:animalData.sex,
          type:animalData.type,
          description:animalData.description,
          birthday:animalData.birthday,
          image:animalData.image
        })
        await animal.save();
    }
    res.status(201).json({message:'Animal Cadastrado com sucesso'})
  } catch (error) {
    res.status(500).json({message:'Erro no servidor'})
  }
}
