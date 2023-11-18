import { Router } from 'express'
import listOng from '../../controllers/ongs/list'
import showOng from '../../controllers/ongs/show'
import listFilterOptiosn from '../../controllers/ongs/listFilterOptiosn'

const ongRoutes = Router()

ongRoutes.get('/ongs', listOng)

ongRoutes.get('/ong', showOng)

ongRoutes.get('/ong/road-neighborhood', listFilterOptiosn)

export default ongRoutes
