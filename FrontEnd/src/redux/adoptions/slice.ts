import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialState } from '@Interfaces/redux/adoptions'

const initialState: InitialState = {
  loading: false,
  list: [],
  adoptedAnimalList: [],
  pagination: {
    offset: 0,
    limit: 10,
    count: 20,
  },
  animalData: null,
  adoptionData: [],
  filter: {
    race: [],
    sex: 'Todos',
    type: 'Todos',
  },
}

export const sliceAdoption = createSlice({
  name: 'animals',
  initialState,
  reducers,
})

export const { actions } = sliceAdoption

export default sliceAdoption.reducer
