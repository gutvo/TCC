import { NewUserFormData } from '@Pages/User/create/form'
import { ProfileFormData } from '@Pages/User/show/formProfile'
import { PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

interface ongData {
  id: number
  road: string
  neighborhood: string
  city: string
  CEP: string
}

export interface UserData {
  id: number
  name: string
  email: string
  password: string
  ongData: ongData | null
}

export interface loginDTO {
  data: UserData
  token: string
}

export interface loginProps {
  email: string
  password: string
}

export interface InitialState {
  loading: boolean
  data: UserData | null
  isLogged: boolean
}

export const reducers = {
  // create
  createUserRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (data: NewUserFormData) => {
      return { payload: { data } }
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
      action: PayloadAction<{ response: loginDTO }>,
    ) => {
      const { data } = action.payload.response
      state.data = data
      state.isLogged = true
      state.loading = false
    },
    prepare: (response: loginDTO) => {
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
}
