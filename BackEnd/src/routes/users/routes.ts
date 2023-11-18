import { Router } from 'express'
import Create from '../../controllers/users/create'
import login from '../../controllers/users/login'
import createUserValidation from '../../validations/users/create'
import userLoginValidation from '../../validations/users/login'
import updateUserValidation from '../../validations/users/update'
import encryptPassword from '../../controllers/users/encrypt'
import validateToken from '../../validations/token/token'
import Update from '../../controllers/users/update'
import Delete from '../../controllers/users/delete'
import deleteUserValidation from '../../validations/users/detele'
import Show from '../../controllers/users/show'
import refleshToken from '../../controllers/users/refleshToken'
import showUserValidation from '../../validations/users/show'
import refleshTokenValidation from '../../validations/token/refleshToken'
import CreatePhone from '../../controllers/phones/create'
import DeletePhone from '../../controllers/phones/delete'
import UpdatePhone from '../../controllers/phones/update'
import createPhoneValidation from '../../validations/phone/create'
import updtatePhoneValidation from '../../validations/phone/update'
import DeletePhoneValidations from '../../validations/phone/delete'
import showUserImage from '../../controllers/users/showImage'

const userRoutes = Router()

userRoutes
  .route('/user')
  .post(createUserValidation, encryptPassword, Create)
  .put(validateToken, updateUserValidation, Update)
  .delete(validateToken, deleteUserValidation, Delete)
  .get(validateToken, showUserValidation, Show)

userRoutes.route('/user/images/:email').get(showUserImage)

userRoutes.post('/refleshtoken', refleshTokenValidation, refleshToken)

userRoutes.route('/user/login').post(userLoginValidation, login)

userRoutes
  .route('/phone')
  .all(validateToken)
  .post(createPhoneValidation, CreatePhone)
  .delete(DeletePhoneValidations, DeletePhone)
  .put(updtatePhoneValidation, UpdatePhone)

export default userRoutes
