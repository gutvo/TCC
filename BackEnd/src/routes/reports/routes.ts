import { Router } from 'express'
import reportsControllers from '@Controllers/reports'

const reportRoutes = Router()

reportRoutes.get('/rescuedAdoptedAnimal', reportsControllers.rescuedAdoptedAnimalController)

reportRoutes.get('/dashboardhome', reportsControllers.dashboardHomeController)

export default reportRoutes
