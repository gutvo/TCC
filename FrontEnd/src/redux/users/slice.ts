import { createSlice } from '@reduxjs/toolkit'
import { InitialState, reducers } from './reducers'

const isLogged = !!localStorage.getItem('user')

const initialState: InitialState = {
  loading: false,
  data: null,
  isLogged,
}

const sliceUser = createSlice({
  name: 'users',
  initialState,
  reducers,
})

export const { actions } = sliceUser

export default sliceUser.reducer
