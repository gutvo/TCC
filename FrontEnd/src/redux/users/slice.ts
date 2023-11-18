import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialState } from '@Interfaces/redux/users'
const isLogged = !!localStorage.getItem('user')

const localStorageCity = localStorage.getItem('city')

const initialState: InitialState = {
  loading: false,
  data: null,
  isLogged,
  city: localStorageCity || '',
  citys: [],
}

const sliceUser = createSlice({
  name: 'users',
  initialState,
  reducers,
})

export const { actions } = sliceUser

export default sliceUser.reducer
