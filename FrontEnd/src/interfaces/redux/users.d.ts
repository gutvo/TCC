import { NewUserFormData, ProfileFormData } from '@Interfaces/pages/users'
import { actions } from '@Redux/users/slice'
import { Dispatch, SetStateAction } from 'react'
import { NavigateFunction } from 'react-router-dom'

// Reducers

export interface phoneData {
  id: number
  phone: string
  userId: number
}

export interface userOngData {
  id: number
  road: string
  neighborhood: string
  city: string
  CEP: string
  houseNumber: string
  cpfCnpj: string
  userData: {
    id: number
    name: string
    email: string
    image: string
    previewImage?: string
    phoneData: phoneData[]
  }
}

export interface ongData {
  id: number
  road: string
  neighborhood: string
  city: string
  uf: string
  CEP: string
  houseNumber: string
  cpfCnpj: string
}

export interface UserData {
  id: number
  name: string
  email: string
  password: string
  image?: string
  previewImage?: string
  ongData: ongData | null
  createdAt: string
  updatedAt: string
  phoneData: phoneData[]
}

export interface loginData {
  data: UserData
  token: string
}

export interface loginProps {
  email: string
  password: string
}

export interface CityProps {
  label: string
}
export interface CityDTO {
  data: {
    data: { label: string }[]
  }
}

export interface InitialState {
  loading: boolean
  data: UserData | null
  isLogged: boolean
  city: string
  citys: CityProps[]
}

export interface CreatePhoneDTO {
  data: {
    data: phoneData
    message: string
  }
}

export interface DeletePhoneDTO {
  data: {
    message: string
  }
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
  data: { data: UserData }
}

export interface updateUserDTO {
  data: { data: UserData; message: string }
}

export interface deleteDTO {
  data: { message: string }
}

export interface OngDataDTO {
  data: { data: userOngData }
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

export interface CreatePhoneActions {
  type: typeof actions.createPhoneRequest.type
  payload: {
    userId: number
    phone: string
    handlePhoneData: Dispatch<SetStateAction<string>>
  }
}

export interface DeletePhoneActions {
  type: typeof actions.updatePhoneRequest.type
  payload: {
    id: number
    index: number
  }
}

export interface UpdatePhoneActions {
  type: typeof actions.updatePhoneRequest.type
  payload: {
    id: number
    phone: phoneData
    index: number
    setEditIndex: Dispatch<SetStateAction<number | null>>
  }
}
