import { NewUserFormData } from '@Pages/User/create/form'
import { actions } from '@Redux/users/slice'
import { ProfileFormData } from '@Types/pages/users'
import { NavigateFunction } from 'react-router-dom'

// Reducers
export interface ongData {
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

export interface loginData {
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

// -------------------------------------------
// Saga

export interface loginDTO {
  data: {
    data: UserData
    message: string
    token: string
  }
}

export interface createUserDTO {
  data: {
    message: string
  }
}

export interface showUserDTO {
  data: UserData
}

export interface updateUserDTO {
  data: { data: UserData; message: string }
}

// -------------------------------------------
// actions

export interface createAction {
  type: typeof actions.createUserRequest.type
  payload: {
    data: NewUserFormData
  }
}

export interface updateAction {
  type: typeof actions.createUserRequest.type
  payload: {
    data: ProfileFormData
    setEditable: (data: boolean) => void
  }
}

export interface showAction {
  type: typeof actions.loginRequest.type
  payload: {
    email: string
  }
}

export interface loginAction {
  type: typeof actions.loginRequest.type
  payload: {
    data: loginProps
    navigation: NavigateFunction
  }
}
