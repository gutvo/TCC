import { actions } from '@Redux/adoptions/slice'

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

export interface AdoptionData {
  id: number
  ongId: number
  animalId: number
  userId: number
  userData: { id: number; name: string; email: string }
  animalData: AnimalData
}

export interface animalFilterProps {
  race: string[]
  sex: string
  type: string
}

export interface InitialState {
  loading: boolean
  list: AnimalData[]
  pagination: PaginationProps
  adoptionData: AdoptionData[]
  filter: animalFilterProps
}

// -------------------------------------------
// Saga

export interface createAdoptionDTO {
  data: {
    message: string
  }
}

export interface deleteAdoptionDTO {
  data: {
    message: string
  }
}

export interface listAdoptionAnimalDTO {
  data: {
    data: AdoptionData[]
    pagination: {
      offset: number
      limit: number
      count: number
    }
  }
}

export interface listAdoptedAnimalsDTO {
  data: {
    data: AnimalData[]
    pagination: {
      offset: number
      limit: number
      count: number
    }
  }
}

// -------------------------------------------
// actions

export interface createAdoptionActions {
  type: typeof actions.createAdoptionRequests.type
  payload: {
    userId: number
    ongId: number
    animalId: number
  }
}

export interface listAdoptionActions {
  type: typeof actions.listAdoptionRequest.type
  payload: {
    ongId: number
    offset: number
    limit: number
  }
}

export interface adoptionActions {
  type: typeof actions.adoptAnimalRequest.type
  payload: {
    adoptionId: number
    fetchAdoptedRequests: () => void
  }
}

export interface deleteAdoptionActions {
  type: typeof actions.deleteAdoptionRequest.type
  payload: {
    adoptionId: number
    fetchAdoptedRequests: () => void
  }
}

export interface listAdoptedAnimalsActions {
  type: typeof actions.listAdoptedAnimalsRequest.type
  payload: {
    ongId: number
    offset: number
    limit: number
    filter: animalFilterProps
  }
}
