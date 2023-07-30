import { actions } from './slice'
import { Animal } from './reducers'

export interface FetchAction {
  type: typeof actions.listAnimalRequest.type
  payload: {
    offset: number
    limit: number
  }
}

export interface createAction {
  type: typeof actions.createAnimalRequest.type
  payload: {
    data: Animal
  }
}

export interface showAction {
  type: typeof actions.showAnimalRequest.type
  payload: {
    id: number
  }
}
