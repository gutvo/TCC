import { NewUserFormData, ProfileFormData } from '@Interfaces/pages/users'
import {
  InitialState,
  UserData,
  listOngDTO,
  loginData,
  loginProps,
} from '@Interfaces/redux/users'
import { PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

export const reducers = {
  // create
  createUserRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (data: NewUserFormData, navigation: NavigateFunction) => {
      return { payload: { data, navigation } }
    },
  },
  createUserSuccess: (state: InitialState) => {
    state.loading = false
  },
  createUserFailure: (state: InitialState) => {
    state.loading = false
  },

  // Login
  loginRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (data: loginProps, navigation: NavigateFunction) => {
      return { payload: { data, navigation } }
    },
  },
  loginSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ response: loginData }>,
    ) => {
      const { data } = action.payload.response
      state.data = data
      state.isLogged = true
      state.loading = false
    },
    prepare: (response: loginData) => {
      return { payload: { response } }
    },
  },
  loginFailure: (state: InitialState) => {
    state.loading = false
  },

  // logout
  logout: (state: InitialState) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    state.data = null
    state.isLogged = false
  },

  // show
  showUserRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (email: string) => {
      return { payload: { email } }
    },
  },
  showUserSuccess: {
    reducer: (state: InitialState, action: PayloadAction<UserData>) => {
      state.data = action.payload
      state.loading = false
    },
    prepare: (data: UserData) => {
      return { payload: data }
    },
  },
  showUserFailure: (state: InitialState) => {
    state.loading = false
  },
  // update
  updateUserRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (data: ProfileFormData, setEditable: (data: boolean) => void) => {
      return { payload: { data, setEditable } }
    },
  },
  updateUserSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: UserData }>,
    ) => {
      state.data = action.payload.data
      state.loading = false
    },
    prepare: (data: UserData) => {
      return { payload: { data } }
    },
  },
  updateUserFailure: (state: InitialState) => {
    state.loading = false
  },

  deleteUserRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (email: string, id: number, navigation: NavigateFunction) => {
      return { payload: { email, id, navigation } }
    },
  },
  deleteUserSuccess: (state: InitialState) => {
    state.loading = false
  },

  deleteUserFailure: (state: InitialState) => {
    state.loading = false
  },
  // List Ongs
  listOngRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (offset: number, limit: number) => {
      return { payload: { offset, limit } }
    },
  },
  listOngSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: listOngDTO }>,
    ) => {
      state.ongList = action.payload.data.data.data.rows
      state.loading = false
    },
    prepare: (data: listOngDTO) => {
      return { payload: { data } }
    },
  },

  listOngFailure: (state: InitialState) => {
    state.loading = false
  },
}
