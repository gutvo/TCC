import { actions } from '@Redux/ongs/slice'
import { phoneData } from './users'

export interface userOngData {
  id: number
  road: string
  neighborhood: string
  city: string
  CEP: string
  cpfCnpj: string
  houseNumber: string
  userData: {
    id: number
    name: string
    email: string
    image: string
    previewImage?: string
    phoneData: phoneData[]
  }
}

export interface OngFilter {
  name: string
  road: string
  neighborhood: string
}
interface OngPagination {
  offset: number
  limit: number
  count: number
}

export interface InitialState {
  loading: boolean
  data: userOngData[] | null
  ongData: userOngData | null
  pagination: OngPagination
  roads: string[]
  neighborhoods: string[]
  names: string[]
  filter: OngFilter
}

export interface listOngDTO {
  data: {
    data: userOngData[]
    pagination: OngPagination
  }
}

export interface listRoadNeighborhoodDTO {
  data: {
    road: string[]
    neighborhood: string[]
    name: string[]
  }
}

// -------------------------------------------
// actions

export interface listActions {
  type: typeof actions.listOngRequest.type
  payload: {
    offset: number
    limit: number
    filter: OngFilter
    city: String
  }
}

export interface showActions {
  type: typeof actions.listOngRequest.type
  payload: {
    id: number
  }
}

export interface listRoadNeighborhoodActions {
  type: typeof actions.listRoadNeighborhoodRequest.type
  payload: {
    city: string
  }
}
