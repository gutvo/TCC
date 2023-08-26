import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialStateProps } from '@Interfaces/redux/animals'

const initialState: InitialStateProps = {
  loading: false,
  list: [],
  animalData: null,
  pagination: {
    offset: 0,
    limit: 9,
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
