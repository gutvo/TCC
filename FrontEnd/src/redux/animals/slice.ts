import { createSlice } from '@reduxjs/toolkit'
import { InitialStateProps, reducers } from './reducers'

const initialState: InitialStateProps = {
  loading: false,
  list: [],
  animalData: null,
  pagination: {
    offset: 0,
    limit: 2,
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
