import { Router } from 'express'
import createPhoneValidation from '../../validations/phone/create'
import updtatePhoneValidation from '../../validations/phone/update'
import DeletePhoneValidations from '../../validations/phone/delete'
import validateToken from '@Validations/token/token'
import phonesControllers from '@Controllers/phones'

const phonesRoutes = Router()

phonesRoutes
  .route('/phone')
  .all(validateToken)
  .post(createPhoneValidation, phonesControllers.createController)
  .delete(DeletePhoneValidations, phonesControllers.deleteController)
  .put(updtatePhoneValidation, phonesControllers.updateController)

export default phonesRoutes
