import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialState } from '@Interfaces/redux/animals'

const initialState: InitialState = {
  loading: false,
  list: [],
  animalData: null,
  pagination: {
    offset: 0,
    limit: 12,
    count: 9,
  },
}

export const sliceAnimal = createSlice({
  name: 'animals',
  initialState,
  reducers,
})

export const { actions } = sliceAnimal

export default sliceAnimal.reducer
