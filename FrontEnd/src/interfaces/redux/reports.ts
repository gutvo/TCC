import { actions } from '@Redux/animals/slice'

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
  createdAt: string
  updatedAt: string
  situation: 'adopted' | 'available'
}

export interface InitialState {
  loading: boolean
  animalData: AnimalData[]
}

// -------------------------------------------
// Saga

export interface fetchAnimalReportDTO {
  data: {
    data: AnimalData[]
  }
}

export interface createAnimalDTO {
  data: {
    message: string
  }
}

// -------------------------------------------
// actions

export interface FetchAnimalReportAction {
  type: typeof actions.listAnimalRequest.type
  payload: {
    year: number
    ongId: number
  }
}
