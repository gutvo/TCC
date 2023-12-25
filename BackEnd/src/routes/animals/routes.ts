import { Router } from 'express'
import createValidation from '../../validations/animals/create'
import validateToken from '../../validations/tokens/token'
import deleteValidator from '../../validations/animals/delete'
import updateValidation from '../../validations/animals/update'
import animalsControllers from '@Controllers/animals'

const animalRoutes = Router()

animalRoutes
  .route('/animal')
  .get(animalsControllers.listController)
  .post(validateToken, createValidation, animalsControllers.createController)
  .delete(validateToken, deleteValidator, animalsControllers.deleteController)
  .put(validateToken, updateValidation, animalsControllers.updateController)

animalRoutes.route('/animal/:id').get(animalsControllers.showController)

animalRoutes.route('/animal/images/:id').get(animalsControllers.showImageController)

animalRoutes.route('/random/animal').get(animalsControllers.listRandomController)

animalRoutes.route('/adopted/animal').get(validateToken, animalsControllers.listAdoptedController)

animalRoutes.route('/adopted/animal/:id').get(validateToken, animalsControllers.showAdoptedController)

export default animalRoutes
