import { actions } from './slice'
import { AnimalData } from './reducers'

export interface FetchAction {
  type: typeof actions.listAnimalRequest.type
  payload: {
    offset: number
    limit: number
    ongId: number
  }
}

export interface createAction {
  type: typeof actions.createAnimalRequest.type
  payload: {
    data: AnimalData
  }
}

export interface showAction {
  type: typeof actions.showAnimalRequest.type
  payload: {
    id: number
  }
}
