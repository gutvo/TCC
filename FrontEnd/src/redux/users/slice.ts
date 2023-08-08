import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialState } from '@Types/redux/users'

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
