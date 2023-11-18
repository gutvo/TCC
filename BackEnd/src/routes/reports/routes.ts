import { Router } from 'express'
import RescuedAdoptedAnimal from '../../controllers/reports/rescuedAdoptedAnimal'
import DashboardHome from '../../controllers/reports/dashboardHome'

const reportRoutes = Router()

reportRoutes.get('/rescuedAdoptedAnimal', RescuedAdoptedAnimal)

reportRoutes.get('/dashboardhome', DashboardHome)

export default reportRoutes
