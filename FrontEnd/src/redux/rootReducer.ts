import { combineReducers } from '@reduxjs/toolkit'
import animalReducer from './animals/slice'
import userReducer from './users/slice'
import ongReducer from './ongs/slice'
import adoptionReducer from './adoptions/slice'
import reportReducer from './reports/slice'
import chatReducer from './chats/slice'

const rootReducer = combineReducers({
  animals: animalReducer,
  users: userReducer,
  ongs: ongReducer,
  adoptions: adoptionReducer,
  reports: reportReducer,
  chats: chatReducer,
})

export default rootReducer
