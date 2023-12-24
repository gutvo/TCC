import { Router } from 'express'
import validateToken from '../../validations/token/token'
import createValidation from '../../validations/adoptions/create'
import deleteValidation from '../../validations/adoptions/delete'
import AdoptionsControllers from '@Controllers/adoptions'

const adoptionRoutes = Router()

adoptionRoutes
  .route('/adoption')
  .all(validateToken)
  .post(createValidation, AdoptionsControllers.createController)
  .get(AdoptionsControllers.listController)
  .put(AdoptionsControllers.adoptController)
  .delete(deleteValidation, AdoptionsControllers.deleteController)

export default adoptionRoutes
