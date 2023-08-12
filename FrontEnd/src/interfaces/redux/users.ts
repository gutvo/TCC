import { NewUserFormData, ProfileFormData } from '@Interfaces/pages/users'
import { actions } from '@Redux/users/slice'
import { NavigateFunction } from 'react-router-dom'

// Reducers

interface userOngData {
  id: number
  name: string
  email: string
  password: string
  userData: { name: string; email: string }
}

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
  ongList: userOngData[]
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

export interface deleteDTO {
  data: { message: string }
}

export interface OngDataDTO {
  data: userOngData
}

export interface listOngDTO {
  data: {
    data: {
      rows: userOngData[]
      count: number
    }
  }
}

// -------------------------------------------
// actions

export interface createAction {
  type: typeof actions.createUserRequest.type
  payload: {
    data: NewUserFormData
    navigation: NavigateFunction
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

export interface deleteActions {
  type: typeof actions.deleteUserRequest.type
  payload: {
    id: number
    email: number
    navigation: NavigateFunction
  }
}

export interface listOngActions {
  type: typeof actions.listOngRequest.type
  payload: {
    offset: number
    limit: number
  }
}
