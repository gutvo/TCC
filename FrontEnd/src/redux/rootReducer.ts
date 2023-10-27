import { combineReducers } from '@reduxjs/toolkit'
import animalReducer from './animals/slice'
import userReducer from './users/slice'
import ongReducer from './ongs/slice'
import adoptionReducer from './adoptions/slice'

const rootReducer = combineReducers({
  animals: animalReducer,
  users: userReducer,
  ongs: ongReducer,
  adoptions: adoptionReducer,
})

export default rootReducer
