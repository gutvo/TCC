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

export interface dashboardData {
  countAdoptedAnimals: number
  countAvailableAnimals: number
  countTotalAnimals: number
  countTotalOngs: number
}

export interface InitialState {
  loading: boolean
  animalData: AnimalData[]
  dashboadHomeData: dashboardData | null
}

// -------------------------------------------
// Saga

export interface fetchAnimalReportDTO {
  data: {
    data: AnimalData[]
  }
}

export interface fetchDashboardDTO {
  data: dashboardData
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

// export interface FetchDashboardDataAction {
//   type: typeof actions.listAnimalRequest.type
//   payload: {}
// }
