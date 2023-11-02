import { NewUserFormData, ProfileFormData } from '@Interfaces/pages/users'
import {
  CityProps,
  InitialState,
  UserData,
  loginData,
  loginProps,
  phoneData,
} from '@Interfaces/redux/users'
import { PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'

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
      state.data = action.payload.response.data
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
    localStorage.removeItem('remenberData')
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

  // Delete
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

  // City list
  listCityRequest: (state: InitialState) => {
    state.loading = true
  },
  listCitySuccess: (
    state: InitialState,
    action: PayloadAction<{ data: CityProps[] }>,
  ) => {
    state.citys = action.payload.data
    if (!state.city) {
      state.city = state.citys[0].label
    }
    state.loading = false
  },
  listCityFailure: (state: InitialState) => {
    state.loading = false
  },

  // Create Phone
  createPhoneRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (
      phone: string,
      ongId: number,
      handlePhoneData: Dispatch<SetStateAction<string>>,
    ) => {
      return { payload: { phone, handlePhoneData, ongId } }
    },
  },
  createPhoneSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: phoneData }>,
    ) => {
      state.data?.ongData?.phoneData.push(action.payload.data)
      state.loading = false
    },
    prepare: (data: phoneData) => {
      return { payload: { data } }
    },
  },
  createPhoneFailure: (state: InitialState) => {
    state.loading = false
  },

  // Delete Phone
  deletePhoneRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (id: number, index: number) => {
      return { payload: { id, index } }
    },
  },
  deletePhoneSuccess: {
    reducer: (state: InitialState, action: PayloadAction<number>) => {
      if (state.data?.ongData) {
        const { phoneData } = state.data.ongData
        phoneData.splice(action.payload, 1)
      }
      state.loading = false
    },
    prepare: (index: number) => {
      return { payload: index }
    },
  },
  deletePhoneFailure: (state: InitialState) => {
    state.loading = false
  },

  // Update Phone
  updatePhoneRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (
      phone: string,
      id: number,
      index: number,
      setEditIndex: Dispatch<SetStateAction<number | null>>,
    ) => {
      return { payload: { phone, id, index, setEditIndex } }
    },
  },
  updatePhoneSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ index: number; phone: phoneData }>,
    ) => {
      if (state.data?.ongData) {
        const { phoneData } = state.data.ongData
        phoneData[action.payload.index] = action.payload.phone
      }
      state.loading = false
    },
    prepare: (index: number, phone: phoneData) => {
      return { payload: { index, phone } }
    },
  },
  updatePhoneFailure: (state: InitialState) => {
    state.loading = false
  },
}
