import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialState } from '@Interfaces/redux/ongs'

const initialState: InitialState = {
  loading: false,
  data: null,
  ongData: null,
}

const sliceUser = createSlice({
  name: 'ongs',
  initialState,
  reducers,
})

export const { actions } = sliceUser

export default sliceUser.reducer
