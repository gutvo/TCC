import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialState } from '@Interfaces/redux/reports'

const initialState: InitialState = {
  loading: false,
  animalData: [],
  dashboadHomeData: null,
}

const sliceUser = createSlice({
  name: 'relatorios',
  initialState,
  reducers,
})

export const { actions } = sliceUser

export default sliceUser.reducer
