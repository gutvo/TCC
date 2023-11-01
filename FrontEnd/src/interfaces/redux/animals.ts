import {
  UpdateAnimalFormData,
  newAnimalFormData,
} from '@Interfaces/pages/animals'
import { actions } from '@Redux/animals/slice'
import { NavigateFunction } from 'react-router-dom'
import { UseFormReset } from 'react-hook-form'
// Reducers

export interface PaginationProps {
  offset: number
  limit: number
  count: number
}

export interface AnimalData {
  id: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: string
  image?: string
  previewImage?: string
  imageData: FileList
  ongId?: number
}

export interface animalFilterProps {
  race: string[]
  sex: string
  type: string
}

export interface InitialState {
  filter: animalFilterProps
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

export interface updateAnimalDTO {
  data: {
    data: AnimalData
    message: string
  }
}

export interface fetchRandomAnimalDTO {
  data: {
    data: AnimalData[]
  }
}

// -------------------------------------------
// actions

export interface FetchAction {
  type: typeof actions.listAnimalRequest.type
  payload: {
    offset: number
    limit: number
    ongId: number | null
    city: string
    filter: animalFilterProps
  }
}

export interface createAction {
  type: typeof actions.createAnimalRequest.type
  payload: {
    data: newAnimalFormData
    reset: UseFormReset<newAnimalFormData>
  }
}

export interface showAction {
  type: typeof actions.showAnimalRequest.type
  payload: {
    id: number
    ongId: number
  }
}

export interface deleteActions {
  type: typeof actions.deleteAnimalRequest.type
  payload: {
    id: number
    navigation: NavigateFunction
  }
}

export interface updateAction {
  type: typeof actions.updateAnimalRequest.type
  payload: {
    data: UpdateAnimalFormData
  }
}

export interface FetchRandomAnimalAction {
  type: typeof actions.listRandomAnimalRequest.type
  payload: {
    city: string
  }
}
