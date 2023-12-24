import { Router } from 'express'
import createUserValidation from '../../validations/users/create'
import userLoginValidation from '../../validations/users/login'
import updateUserValidation from '../../validations/users/update'
import validateToken from '../../validations/token/token'
import deleteUserValidation from '../../validations/users/detele'
import showUserValidation from '../../validations/users/show'
import refleshTokenValidation from '../../validations/token/refleshToken'

import usersControllers from '@Controllers/users'

const userRoutes = Router()

userRoutes
  .route('/user')
  .post(createUserValidation, usersControllers.encryptPassword, usersControllers.createController)
  .put(validateToken, updateUserValidation, usersControllers.updateController)
  .delete(validateToken, deleteUserValidation, usersControllers.deleteController)
  .get(validateToken, showUserValidation, usersControllers.showController)

userRoutes.route('/user/images/:email').get(usersControllers.showImageController)

userRoutes.post('/refleshtoken', refleshTokenValidation, usersControllers.refreshTokenController)

userRoutes.route('/user/login').post(userLoginValidation, usersControllers.loginController)

export default userRoutes
