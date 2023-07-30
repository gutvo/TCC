import { createSlice } from '@reduxjs/toolkit'
import { InitialState, reducers } from './reducers'

const initialState: InitialState = {
  loading: false,
  data: { email: '', name: '', password: '' },
}

const sliceUser = createSlice({
  name: 'users',
  initialState,
  reducers,
})

export const { actions } = sliceUser

export default sliceUser.reducer
