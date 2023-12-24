import { Router } from 'express'
import ongsControllers from '@Controllers/ongs'

const ongRoutes = Router()

ongRoutes.get('/ongs', ongsControllers.listController)

ongRoutes.get('/ong', ongsControllers.showController)

ongRoutes.get('/ong/road-neighborhood', ongsControllers.listAdressesFiltersController)

export default ongRoutes
