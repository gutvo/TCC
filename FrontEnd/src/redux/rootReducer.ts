import { combineReducers } from '@reduxjs/toolkit'
import animalReducer from './animals/slice'

const rootReducer = combineReducers({
  animals: animalReducer,
})

export default rootReducer
