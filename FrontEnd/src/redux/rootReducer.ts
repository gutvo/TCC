import { combineReducers } from '@reduxjs/toolkit'
import animalReducer from './animals/slice'
import userReducer from './users/slice'

const rootReducer = combineReducers({
  animals: animalReducer,
  users: userReducer,
})

export default rootReducer
