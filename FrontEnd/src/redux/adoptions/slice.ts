import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialState } from '@Interfaces/redux/adoptions'

const initialState: InitialState = {
  loading: false,
  list: [],
  pagination: {
    offset: 0,
    limit: 10,
    count: 20,
  },
  adoptionData: [],
}

export const sliceAdoption = createSlice({
  name: 'animals',
  initialState,
  reducers,
})

export const { actions } = sliceAdoption

export default sliceAdoption.reducer
