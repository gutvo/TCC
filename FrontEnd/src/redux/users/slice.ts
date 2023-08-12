import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialState } from '@Interfaces/redux/users'

const isLogged = !!localStorage.getItem('user')

const initialState: InitialState = {
  loading: false,
  data: null,
  ongList: [],
  isLogged,
}

const sliceUser = createSlice({
  name: 'users',
  initialState,
  reducers,
})

export const { actions } = sliceUser

export default sliceUser.reducer
