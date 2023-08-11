import { actions } from '@Redux/animals/slice'

// Reducers

export interface PaginationProps {
  offset: number
  limit: number
  count: number
}

export interface AnimalData {
  id?: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: Date
  image: boolean | string
}

export interface InitialStateProps {
  loading: boolean
  list: AnimalData[]
  animalData: AnimalData | null
  pagination: PaginationProps
}

// -------------------------------------------
// Saga

export interface fetchAnimalDTO {
  data: {
    data: AnimalData[]
    pagination: {
      offset: number
      limit: number
      count: number
    }
  }
}

export interface showAnimalDTO {
  data: AnimalData
}

export interface createAnimalDTO {
  data: {
    message: string
  }
}

// -------------------------------------------
// actions

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
    ongId: number
  }
}
