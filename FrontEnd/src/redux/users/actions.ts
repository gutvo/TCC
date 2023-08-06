import { NewUserFormData } from '@Pages/User/create/form'
import { loginProps } from './reducers'
import { actions } from './slice'
import { ProfileFormData } from '@Pages/User/show/formProfile'
import { NavigateFunction } from 'react-router-dom'

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
