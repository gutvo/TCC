import { Router } from 'express'
import animalRoutes from './animals/routes'
import userRoutes from './users/routes'
import ongRoutes from './ongs/routes'
import citiesControllers from '@Controllers/cities'
import { upload } from '../multer/config'
import adoptionRoutes from './adoptions/routes'
import reportRoutes from './reports/routes'
import phonesRoutes from './phones/routes'
import { generateTokenKey } from 'functions'

// import validateSequelize from "../validations/sequelize/sequelize";
const mainRoutes = Router()

// Pega todas as cidades registradas
mainRoutes.get('/city', citiesControllers.listController)

// mainRoutes.use(validateSequelize);

// Usando o multer
mainRoutes.use(upload.single('imageData'))

mainRoutes.use(phonesRoutes)

// rotas dos animais
mainRoutes.use(animalRoutes)

// rotas dos usuários
mainRoutes.use(userRoutes)

// rotas das Organização

mainRoutes.use(ongRoutes)

mainRoutes.use(adoptionRoutes)

mainRoutes.use(reportRoutes)

// Gerador de chaves para o .env
mainRoutes.route('/generatekey').get(generateTokenKey)

export default mainRoutes
